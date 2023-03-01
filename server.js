const http = require('http');
const url = require('url');

// Create a server
const server = http.createServer((req, res) => {
    pathName = req.url;
    console.log(pathName);

    if (pathName == "/" || pathName == "/submit") {
        res.end("This is the HOME page!");
    } else if (pathName == "/overview") {
        res.end("This is the CURRENT OVERVIEW page!")
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

