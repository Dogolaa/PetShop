const express = require('express')
const app = express();
const cors = require('cors');
const dbServices. = require('./dbServices.js')

app.get('/', (request, response) => {
   response.send("Hello, World!") 
});

app.get('/teste', (request, response) => {
    response.send("EndPoint de teste!")
 });

app.listen(8080, () => {
    console.log("Server is running on port 8080")
});