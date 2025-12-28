import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

export const app = express();
export const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: 'http://localhost:5173',
    },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on('connection', socket => {

    console.log('connection', socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap) );
    socket.join(userId);

    socket.on('sendMessage', (message) => {
        const {toUserId, messageText} = message;
        io.to(toUserId).emit('receiveMessage', {
            fromUserId: userId,
            toReceiverId: toUserId,
            messageText: messageText,
            createdAt: new Date()
        });
    })
    socket.on('disconnect', () => {
        console.log('user disconnect and socket closed', socket.id);
        delete userSocketMap[userId];
        io.emit('userOffline', userId);
    })
})
export default {io, app, server};