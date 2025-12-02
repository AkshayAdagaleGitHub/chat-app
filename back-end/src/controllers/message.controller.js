import {userModel} from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try{
        const loggedInUser = req.user.id;
        const filteredUsers =
            await userModel.findAll({id: {$ne: loggedInUser}})
    }catch (e) {
        console.log(e);
    }
    const users = userModel.findAll();
    res.status(200).send(users);
}