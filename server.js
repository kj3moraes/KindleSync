const http = require('http');
const url = require('url');

// Create a server
const server = http.createServer((req, res) => {
    res.end("Sending something back from the Deep Space!")
})

server.listen(8000, 'localhost', () => {
    console.log("Listening to requests on port 8000");
});

