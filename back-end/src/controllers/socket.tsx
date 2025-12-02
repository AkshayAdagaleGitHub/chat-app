import { Server }  from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: 'http://localhost:5173',
    },
});

io.on('connection', socket => {

    console.log('connection', socket.id);
    socket.on('connection', message => {
        console.log('connection', socket.id);
    })

    socket.on('disconnect', () => {
        console.log('user disconnect and socket closed', socket.id);
    })

    socket.on('message', message => {

    })
})