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