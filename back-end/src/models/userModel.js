import { DataTypes } from 'sequelize';
import {sequelize} from "../config/db.js";

export const userModel
    =  sequelize.define('ChatUser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true
    });


export const MessageModel
    =  sequelize.define('ChatMessage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        messageText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fromUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: true
    });