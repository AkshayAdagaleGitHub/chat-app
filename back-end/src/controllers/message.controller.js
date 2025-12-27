import {userModel} from "../models/userModel.js";
import  { Op } from "sequelize";
import {MessageModel} from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    try{
        const loggedInUser = req.user.id;
        console.log("loggedInUser", loggedInUser);
        // const filteredUsers =
        //     await userModel.findAll({id: {$ne: loggedInUser}})
        const users = await userModel.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            where: {
                id: {
                    [Op.ne]: loggedInUser // 'ne' stands for Not Equal
                }
            }
        });
        // console.log("users");
        // console.log(users);
        return res.status(200).send(users);
    }catch (e) {
        console.log(e);
    }
    const users = userModel.findAll();
    res.status(200).send(users);
}

// export const getUser = async (req, res) => {
//     console.log("Inside getUser");
//     console.log("req.params ", req.params);
//     const { userId } = req.params;
//     const user = await userModel.findByPk(userId);
//     res.status(200).send(user);
// }

export const sendMessage = async (req, res) => {
    console.log("Inside sendMessage");
    console.log("req.body ", req);
    const { messageText, createdAt } = req.body;
    // const { createdAt } = req.body;
    const { userId } = req.params;
    console.log("message ", messageText);
    console.log("createdAt ", createdAt);
    console.log("userId ", userId);
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try{
        const user = await userModel.findByPk(userId);
        if(user == null){
            return res.status(404).send('user not found');
        }
        // console.log("user ", user.dataValues.fullName);
        // const emessage = message.replace(/<[^>]*>?/gm, '');
        const fullName = user.dataValues.fullName;
        const email = user.dataValues.email;

        const messageData = {
            fromUserId: decoded.id,
            toUserId: userId,
            fullName: fullName,
            email:email,
            messageText: messageText,
            createdAt: new Date(Number(createdAt))
        };
        console.log(await MessageModel.create(messageData));
        res.status(200).send(user);
    }catch (e) {
        console.log(e);
    }
}

// export const getMessages = async (req, res) => {
//     console.log("Inside getMessages");
//     console.log("req.body ", req.body);
//     const { messageData } = req.body;
//
//     const fromUserId = messageData.fromUserId;
//     const toUserId = messageData.toUserId;
//
//     const messages = await MessageModel.findAll({
//         where: {
//             [Op.and]: [
//                 { fromUserId: fromUserId },
//                 { toUserId: toUserId }
//             ]
//         }
//     });
//     res.status(200).send(messages);
// }

export const getMessages = async (req, res) => {
    console.log("Inside getMessages");

    const { fromUserId, toUserId } = req.query;
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!fromUserId || !toUserId) {
        return res.status(400).send({ error: "Missing User IDs" });
    }

    try {
        const messages = await MessageModel.findAll({
            where: {
                [Op.or]: [
                    { fromUserId:  decoded.id, toUserId: toUserId },
                    { fromUserId: toUserId, toUserId:  decoded.id }
                ]
            }
        });
        if (!messages) {
            console.log("No messages found");
            return res.status(404).send({ error: "Messages not found" });
        }

        res.status(200).send(messages);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}