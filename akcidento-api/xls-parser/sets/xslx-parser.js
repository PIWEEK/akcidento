// ATR-I.1.6.  ÍNDICES DE INCIDENCIA DE ACCIDENTES DE TRABAJO CON BAJA EN JORNADA POR SITUACIÓN PROFESIONAL Y ASALARIADOS POR TIPO DE CONTRATO]

// ATR-I.1.4. ÍNDICES DE INCIDENCIA DE ACCIDENTES DE TRABAJO CON BAJA EN JORNADA, POR SEXO Y SECCIÓN DE ACTIVIDAD

const XLSX = require('xlsx');
const fs = require("fs");
const buf = fs.readFileSync("./data/ATR_2018_I.xls");
const workbook = XLSX.read(buf, {type:'buffer'});


const db = require('../../config/db.config.js');
const contractTypeController = require("../../controller/contract-type.controller");
const modalityController = require("../../controller/modality.controller.js");
const accidentsByContractController = require("../../controller/accidents-by-contract.controller.js");

const sectorController = require("../../controller/sector.controller.js");
const sexController = require("../../controller/sex.controller.js");
const accidentsBySexSectController = require("../../controller/accidents-by-sexsect.controller");

// Get the XLSX tab
const typeOfContract = workbook.Sheets['ATR-I.1.6'];
const bySectorAndSex = workbook.Sheets['ATR-I.1.4'];

// Convert to JSON a range, using some set of data (xls), a range of cells and headers for each cell
const convertToJSON = (set, range, header) => {
    return XLSX.utils.sheet_to_json(set, {
        range,
        header
    });
}

// Default headers
const headers = [2012, 2013, 2014, 2015, 2016, 2017, 2018];

// Calls to fn to convert xls data to JSON
const indefiniteContractJSON = convertToJSON(typeOfContract, "B16:H18", headers);

// Calls to fn to convert xls data to JSON
const partTimeContractJSON = convertToJSON(typeOfContract, "B21:H22", headers);

// Calls to fn to convert xls data to JSON
const maleBySector = convertToJSON(bySectorAndSex, "H37:N57", headers);
const femaleBySector = convertToJSON(bySectorAndSex, "H62:N82", headers);

// Parse columns to get the sectors name
const rangeBySector = XLSX.utils.decode_range(bySectorAndSex['!ref']);
const parseSectorColumns = (range) => {
    let startRange, endRange;
    let sectorArray = []
    for (let rowNum = 11; rowNum <= 31; rowNum++) {
        const sectorName = bySectorAndSex[XLSX.utils.encode_cell({r: rowNum, c: 1})];
        sectorArray.push(sectorName.v.replace(/\s*$/,""));
    }
    return sectorArray;
}
const sectorArray = parseSectorColumns(rangeBySector);

// Main function, fills the database with data
db.sequelize.sync({force: true}).then(async () => {

    // Adds contract modalities to db
    sx1 = await sexController.createSex('varones');
    sx2 = await sexController.createSex('mujeres');

    // Fill sector database
    const sectorDataArray = sectorArray.map(async (sector, index) => {
        let sd = await sectorController.createSector(sector);
        return sd;
    });

    // Fills the API with male and sector accidents
    maleBySector.forEach(async (maleSectorList, index) => {
        let sectorId = await sectorDataArray[index];
        for (var key in maleSectorList) {
            accidentsBySexSectController.createAccidentsBySexSect(
                key,
                sx1.dataValues.id,
                sectorId.dataValues.id,
                maleSectorList[key]
            )
        }
    })

    // Fills the API with female and sector accidents
    femaleBySector.forEach(async (femaleSectorList, index) => {
        let sectorId = await sectorDataArray[index];
        for (var key in femaleSectorList) {
            accidentsBySexSectController.createAccidentsBySexSect(
                key,
                sx2.dataValues.id,
                sectorId.dataValues.id,
                femaleSectorList[key]
            )
        }
    })

    const indefiniteContractParents = [
        'A tiempo completo',
        'A tiempo parcial',
        'Fijo discontinuo',
    ];

    // Adds contract types to db
    ct1 = await contractTypeController.createContractType(indefiniteContractParents[0]);
    ct2 = await contractTypeController.createContractType(indefiniteContractParents[1]);
    ct3 = await contractTypeController.createContractType(indefiniteContractParents[2]);
    
    // Adds contract modalities to db
    m1 = await modalityController.createModality('Contrato indefinido');
    m2 = await modalityController.createModality('Contrato temporal');

    // Gets the right ID for the contract type
    let contractTypeId;
    const getContractType = (index) => {
        if (index === 0) {
            contractTypeId = ct1.dataValues.id;
        } else if (index === 1) {
            contractTypeId = ct2.dataValues.id;
        } else if (index === 2) {
            contractTypeId = ct3.dataValues.id;
        }
        return contractTypeId;
    }

    // Fills the API with indefinite contract type data
    indefiniteContractJSON.forEach((contractList, index) => {
        contractTypeId = getContractType(index);
        for (var key in contractList) {
            accidentsByContractController.createAccidentsByContract(
                key,
                contractTypeId,
                m1.dataValues.id,
                contractList[key]
            )
        }
    })

    // Fills the API with part time contract type data
    partTimeContractJSON.forEach((partTimeList, index) => {
        contractTypeId = getContractType(index);
        for (var key in partTimeList) {
            accidentsByContractController.createAccidentsByContract(
                key,
                contractTypeId,
                m2.dataValues.id,
                partTimeList[key]
            )
        }
    })
});
