/*
Copyright 2023 Keane Moraes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

const http = require('http');
const url = require('url');
const fs = require('fs');

// Replace the placeholders with the data
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%BY%}/g, product.by);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {
        output = output.replace(/{%NOT_READ%}/g, 'not-read');
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

    // Parse the URL
    const { query, pathname } = url.parse(req.url, true);

    // Homepage
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            'content-type': 'text/html',
        });

        /*
        * Loop through the card and replace the placeholders with the data
        * Join the array of strings into a single string
        */
        const cardsHtml = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const overviewHTML = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(overviewHTML);


    // Product page
    } else if (pathname === "/product") {
        
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const product = productData[query.id];
        const output = replaceTemplate(tempProductPage, product);
        res.end(output);


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
});

server.listen(8000, 'localhost', () => {
    console.log("Listening to requests for localhost on port 8000",);
});

