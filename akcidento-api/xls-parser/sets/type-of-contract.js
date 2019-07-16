// ATR-I.1.6.  ÍNDICES DE INCIDENCIA DE ACCIDENTES DE TRABAJO CON BAJA EN JORNADA POR SITUACIÓN PROFESIONAL Y ASALARIADOS POR TIPO DE CONTRATO]

const XLSX = require('xlsx');
const fs = require("fs");
const buf = fs.readFileSync("./data/ATR_2018_I.xls");
const workbook = XLSX.read(buf, {type:'buffer'});

const typeOfContract = workbook.Sheets['ATR-I.1.6'];

const convertToJSON = (range, header) => {
    return XLSX.utils.sheet_to_json(typeOfContract, {
        range,
        header
    });
}

const addJSONParents = (data, parents) => {
    return parents.map((parent) => {
        const dataType = {};
        data.forEach((type) => {
            dataType[parent] = type;
        })
        return dataType;
    })
}

const saveToFile = (data, filename) => {
    const dataJSONString = JSON.stringify(data);
    fs.writeFile(`./dist/${filename}.json`, dataJSONString, 'utf8', (err) => {
        if (err) {
            console.error(err);  return;
        };
        console.log("File has been created");
    });
}

const headers = [2012, 2013, 2014, 2015, 2016, 2017, 2018];

//Indefinite contract data
const indefiniteContractJSON = convertToJSON("B16:H18", headers);
const indefiniteContractParents = [
    'A tiempo completo',
    'A tiempo parcial',
    'Fijo discontinuo',
];

const indefiniteContract = addJSONParents(indefiniteContractJSON, indefiniteContractParents);

// Part time contract data
const partTimeContractJSON = convertToJSON("B21:H22", headers);
const partTimeContractParents = [
    'A tiempo completo',
    'A tiempo parcial',
];

const partTimeContract = addJSONParents(partTimeContractJSON, partTimeContractParents);

saveToFile(partTimeContract, 'partTimeContract');
saveToFile(indefiniteContract, 'indefiniteContract');

// console.log('indefiniteContract', indefiniteContract);
// console.log('partTimeContract', partTimeContract);
