import jwt from 'jsonwebtoken';
import { userModel } from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try{
        if (req.cookies === undefined || req.cookies.jwt === undefined) return res.status(401).send({
            message: 'not authorized, please log in'
        })
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401)
                .send({
                    message: 'not authorized, please log in'
                });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).send('token is not valid');
        }

        const user = await userModel.findByPk(decoded.id)
            .select('-password');
        if(!user){
            res.status(404).send('user not found');
        }
        req.user = user;
        next();
    }catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
}