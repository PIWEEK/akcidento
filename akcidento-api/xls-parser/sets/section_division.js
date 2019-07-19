// ATR-I.1.6.  ÍNDICES DE INCIDENCIA DE ACCIDENTES DE TRABAJO CON BAJA EN JORNADA POR SITUACIÓN PROFESIONAL Y ASALARIADOS POR TIPO DE CONTRATO]

// ATR-I.1.4. ÍNDICES DE INCIDENCIA DE ACCIDENTES DE TRABAJO CON BAJA EN JORNADA, POR SEXO Y SECCIÓN DE ACTIVIDAD

const XLSX = require('xlsx');
const fs = require("fs");
const buf = fs.readFileSync("./data/ATR_2018_D.xls");

//workBook
const workbook = XLSX.read(buf, {type:'buffer'});

//Database
const db = require('../../config/db.config.js');

//Controller
const provinceController = require("../../controller/province.controller");

// Get the XLSX tab
const accidentsWb = workbook.Sheets['ATR-D.2.2'];

const parseColumns = (start, end) => {
    let resultsArray = []
    for (let rowNum = start; rowNum <= end; rowNum++) {
        const cellName = accidentsWb[XLSX.utils.encode_cell({r: rowNum, c: 1})];
        resultsArray.push(cellName.v.trim());
    }
    return resultsArray;
}

// const provinces = {
//     andalucia: parseProvincesColumns(11, 18),
//     aragon: parseProvincesColumns(11, 18),
//     asturias: ['asturias'],
//     balears: ['balears'],
//     canarias: parseProvincesColumns(30, 31),
//     cantabria: ['cantabria'],
//     castillaLaMancha: parseProvincesColumns(36, 40),
//     castillaYLeon: parseProvincesColumns(43, 51),
//     catalunya: parseProvincesColumns(54, 57),
//     paisValencia: parseProvincesColumns(60, 62),
//     extremadura: parseProvincesColumns(65, 66),
//     galicia: parseProvincesColumns(69, 72),
//     madrid: ['madrid'],
//     murcia: ['murcia'],
//     navarra: ['navarra'],
//     euskalHerria: parseProvincesColumns(81, 83),
//     rioja: ['la rioja'],
//     ceuta: ['ceuta'],
//     melilla: ['melilla']
// }

// console.log(provinces);

const generateDivision = (region, provinces) => {
    provinces.forEach((province) => {
        provinceController.createProvince(
            province,
            region
        )
    })
}

db.sequelize.sync().then(async () => {
    for (var key in provinces) {
        generateProvince(key, provinces[key]);
    }
});
