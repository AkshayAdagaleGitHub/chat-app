import jwt from 'jsonwebtoken';
import { userModel } from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try{
        console.log("Protect Route!! ");
        const token = req.cookies.jwt;
        // console.log("request ", req.cookies.jwt);
        if (!token) return res.status(401).send({
            message: 'not authorized, please log in'
        })
        if(!token){
            return res.status(401)
                .send({
                    message: 'not authorized, please log in'
                });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        if(!decoded){
            return res.status(401).send('token is not valid');
        }

        // const user = await userModel.findByPk(decoded.id);
        const user = await userModel.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });
        if(!user || user == null){
            return res.status(404).send('user not found');
        }
        // console.log("User Found !!! ", user);
        req.user = user;
        // console.log("req user ", req.user);
        next();
    }catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
}