const fsR = require('fs');

var inputText = fsR.readFileSync('./txt/input.txt', 'utf-8');
console.log("Sucessfully read the file!");

const textOut = `This is what we know about the avocado: ${inputText}.\nCreated on ${Date.now()}`;

fsR.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');