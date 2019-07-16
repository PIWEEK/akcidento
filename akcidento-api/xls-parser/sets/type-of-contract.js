// ATR-I.1.6.  ÍNDICES DE INCIDENCIA DE ACCIDENTES DE TRABAJO CON BAJA EN JORNADA POR SITUACIÓN PROFESIONAL Y ASALARIADOS POR TIPO DE CONTRATO]

const XLSX = require('xlsx');
const fs = require("fs");
const buf = fs.readFileSync("./data/ATR_2018_I.xls");
const workbook = XLSX.read(buf, {type:'buffer'});

const typeOfContract = workbook.Sheets['ATR-I.1.6'];

const db = require('../../config/db.config.js');
const contractTypeController = require("../../controller/contract-type.controller");
const modalityController = require("../../controller/modality.controller.js");
const accidentsController = require("../../controller/accident.controller");

const convertToJSON = (range, header) => {
    return XLSX.utils.sheet_to_json(typeOfContract, {
        range,
        header
    });
}

const headers = [2012, 2013, 2014, 2015, 2016, 2017, 2018];

// Indefinite contract data
const indefiniteContractJSON = convertToJSON("B16:H18", headers);
const indefiniteContractParents = [
    'A tiempo completo',
    'A tiempo parcial',
    'Fijo discontinuo',
];

db.sequelize.sync({force: true}).then(() => {
    ct1 = contractTypeController.createContractType(indefiniteContractParents[0]);
    ct2 = contractTypeController.createContractType(indefiniteContractParents[1]);
    ct3 = contractTypeController.createContractType(indefiniteContractParents[2]);
    
    m1 = modalityController.createModality('Contrato indefinido');
    m2 = modalityController.createModality('Contrato temporal');

    indefiniteContractJSON.forEach((contractList, index) => {
        for (var key in contractList) {
            console.log(key, contractList[key]);
            accidentsController.createAccident(
                key,
                1,
                1,
                contractList[key]
            )
        }
    })
});


// // Part time contract data
// const partTimeContractJSON = convertToJSON("B21:H22", headers);
// const partTimeContractParents = [
//     'A tiempo completo',
//     'A tiempo parcial',
// ];
