const express = require('express')
const app = express();
const cors = require('cors');
const dbServices = require('./dbServices.js')

app.use(cors())
app.use(express.json())


const db = dbServices.getdbServicesInstance();


app.get('/', (request, response) => {
   response.send("Hello, World!") 
});


app.get('/BuscarClientes', (request, response) => {
    const result = db.BuscarClientes();
    result
        .then(data=> response.json(data))
        .catch(err => console.log(err))
 });

 app.post('/NovoCliente', (request, response) => {
    const result = db.NovoCliente(request.body);
    result
        .then(data=> response.json(data))
        .catch(err => console.log(err))
 });

 app.delete('/DeletarCliente/:id', (request, response) => {
    const id = request.params.id;
    const result = db.DeletarCliente(id);
    result
        .then(data=> response.json(data))
        .catch(err => console.log(err))
 });





app.get('/teste', (request, response) => {
    response.send("EndPoint de teste!")
 });

app.listen(8080, () => {
    console.log("Server is running on port 8080")
});