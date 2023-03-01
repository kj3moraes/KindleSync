const http = require('http');
const url = require('url');
const fs = require('fs');

// Create a server
const server = http.createServer((req, res) => {
    pathName = req.url;
    console.log(pathName);

    if (pathName == "/" || pathName == "/submit") {
        res.end("This is the HOME page!");
    } else if (pathName == "/overview") {
        res.end("This is the CURRENT OVERVIEW page!")
    } else if (pathName == "/api") {
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {

            if (err != null) {
                console.log(err);
                res.writeHead(404, {
                    'Content-type': 'text/html',
                });
            } 
            const productData = JSON.parse(data); // Convert the data to a JSON object
            console.log(productData);
            res.writeHead(200, {
                'Content-type': 'application/json',
            });
            res.end(data);
        });
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end("<h1>Page not found!</h1>");
    }
})

server.listen(8000, 'localhost', () => {
    console.log("Listening to requests on port 8000");
});

