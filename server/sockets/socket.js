const { io } = require('../server');

const voting = io.of('/voting');

voting.on('connection', (client) => {
    console.log('Cliente Conectado:', client.id);

    client.on('disconnect', ()=>{
        console.log('Cliente Desconectado');
    });


    client.on('vote',(data, callback)=>{

        client.broadcast.emit('updateVoging',data);

        callback(client.id);
    });



});
