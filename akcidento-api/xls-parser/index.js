const XLSX = require('xlsx');
const fs = require("fs");
const buf = fs.readFileSync("./data/ATR_2018_D.xls");
const workbook = XLSX.read(buf, {type:'buffer'});

const typeOfContract = workbook.Sheets['ATR-D.2.2'];
// const range = "B15:H22";
const header = ['A tiempo completo', 'A tiempo parcial', 'Fijo discontinuo'];

const convertToJSON = (range, header) => {
    return XLSX.utils.sheet_to_json(typeOfContract, {
        range,
        header
    });
}

const undefinedContractJSON = convertToJSON("E19:G21", header);

const undefinedContractParents = [
    'A tiempo completo',
    'A tiempo parcial',
    'Fijo discontinuo',
];
undefinedContractParents.forEach((parent) => {
    const undefinedContractType = {};
    undefinedContractJSON.forEach((type) => {
        undefinedContractType[parent] = type;
    })
    console.log(undefinedContractType);
})




// XLSX.writeFile(typeOfContractCSV, 'typeofcontract.json');
