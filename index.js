//para ejecutar el server usamos npm run dev

const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
});

//webSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message',(data) =>{
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);
    });

    //reparticion de las llaves
    socket.on('chat:key', (data) =>{
        socket.broadcast.emit('chat:key', data);
    });
});