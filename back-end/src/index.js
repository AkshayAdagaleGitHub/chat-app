// const express = require('express');
import express from 'express';
import router from './routes/authRoutes.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import {sequelize} from './config/db.js';
import './models/userModel.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors(
    {
            origin: 'http://localhost:5173',
            credentials: true
    }));
app.use('/api/auth', router);
app.use('/api/message', messageRoutes);

const PORT = process.env.PORT || 5001;

sequelize.sync()
    .then(() => {
        console.log('DB connected')
        app.listen(PORT, () => {
            console.log('server started on port 3000');
        });
    }).catch(err => console.log(err));