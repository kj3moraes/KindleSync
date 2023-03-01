const fsR = require('fs');

var inputText = fsR.readFileSync('./txt/input.txt', 'utf-8');
console.log("Sucessfully read the file!");

// Blocking, synchronous way
// const textOut = `This is what we know about the avocado: ${inputText}.\nCreated on ${Date.now()}`;

// fsR.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
fsR.readFile('./txt/start.txt', 'utf-8', (err , data1) => {

    if (err) {
        return console.error(err.message);
    }

    console.log("Filename to be read is " + data1);
    fsR.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fsR.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fsR.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log("Your file has been written!");
            });
        });
    });
});
console.log("Reading file...");