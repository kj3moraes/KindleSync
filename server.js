const http = require('http');
const url = require('url');
const fs = require('fs');

// Placeholders for the path names

// Replace the placeholders with the data
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}

// Read in the data from the JSON file
var data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
var productData = JSON.parse(data); // Convert the data to a JSON object

// Read in the template files
const tempCard= fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProductPage = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// Create a server asynchronously
const server = http.createServer((req, res) => {

    // Extract the URL
    pathName = req.url;
    console.log(pathName);

    const { query, pathname} = url.parse(req.url, true);

    // Homepage
    if (pathname == "/" || pathname == "/overview") {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });

        /*
        * Loop through the card and replace the placeholders with the data
        * Join the array of strings into a single string
        */
        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const overviewHTML = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(overviewHTML);

        
    // Product page
    } else if (pathname == "/product") {
        res.end("This is the CURRENT OVERVIEW page!")

    // API
    } else if (pathname == "/api") {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);

    // 404 page
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

