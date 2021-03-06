
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const path = require('path')
const color = require('colors');
var cors = require('cors')

require('dotenv').config();

const PORT = process.env.PORT || 4000;
const URLBD = process.env.URL_DB || 'mongodb://localhost:27017/votingdojo';

const app = express();

let server = http.createServer(app);

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/api',require('./controller'));

mongoose.connect(URLBD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {

    if (err) throw err;

    console.log('Base de Datos ONLINE!'.green);

});

module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(PORT, () => {
    console.log("Escuchando en ", PORT);
});