const express = require('express');

const server = express();
server.use(express.json());

let storage = ['Diego', 'Cintia', 'Gabriel', 'Sergio', 'Nathalia'];

//MIDDLEWARE GLOBAL
server.use((req, res, next) => {
    console.time('Timer');
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    next();
    console.timeEnd('Timer');
})

//MIDDLEWARE
function userExists(req, res, next){
    if(!req.body.name) {
        return res.status(400).json({error: 'User name is required'})
    }
    return next();
}

function checkUserInArray(req, res, next) {
    const { index } = req.params;
    if(!storage[index]){
        return res.status(400).json({error: 'User does not exists'})
    }
    return next();
}

//FLUXOS DE REQUISIÇÃO
server.get('/', (req, res) => {
    
    //RESPOSTA
    return res.json({ status: "On-line" });
})

//FLUXOS DE REQUISIÇÃO
server.get('/users', (req, res) => {
    
    //RESPOSTA
    return res.json(storage);
})

//FLUXOS DE REQUISIÇÃO
server.get('/users/:index', checkUserInArray, (req, res) => {
    
    const { index } = req.params;

    //RESPOSTA
    return res.json(storage[index]);
})

//FLUXOS DE REQUISIÇÃO
server.post('/users', userExists, (req, res) => {

    const { name } = req.body;
    storage.push(name);

    //RESPOSTA
    return res.json(storage);
})

//FLUXOS DE REQUISIÇÃO
server.put('/users/:index', checkUserInArray, userExists, (req, res) => {
    
    const { index } = req.params;
    const { name } = req.body;
    
    storage[index] = name;

    //RESPOSTA
    return res.json(storage);
})

//FLUXOS DE REQUISIÇÃO
server.delete('/users/:index', (req, res) => {

    const { index } = req.params;
    storage.splice(index, 1);

    //RESPOSTA
    return res.send();
})


server.listen(3000);