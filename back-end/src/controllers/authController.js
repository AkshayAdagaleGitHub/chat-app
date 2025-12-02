import { userModel } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const token = jwt.sign({id: user.id},
                            process.env.JWT_SECRET,
                        {expiresIn: '7d'});
    return token;
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        // hash password
        if(password.length < 6){
            res.status(400).send('password must be least 6 characters long');
        }

        const userExists = await userModel.findOne({ where: { email } });
        if(userExists){
            res.status(400).send('user already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create(
            { name, email, password: hashedPassword });

        if(user){
            // generate jwt token
            const token = generateToken(user);
            res.cookie('jwt', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,// so that cookie is not accessible by client side script
                secure: process.env.NODE_ENV === 'production'
            });

            await user.save();

            res.status(201)
                .json({
                    message: 'user created successfully',
                    user: user,
                    id: user.id
                });
            // res.status(201).send(user);
        }else{
            res.status(400).send({
                message:'Invalid user data'
            });
        }
    }catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try{
        // const user = userModel.findOne({ where: { email: email } });
        const user = await userModel.findOne({ where: { email } });
        if(!user){
            return res.status(400).send({
                message: 'user not found'
            });
        }
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send('invalid credentials');
        }
        const token = generateToken(user);
        res.cookie('jwt', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,// so that cookie is not accessible by client side script
            secure: process.env.NODE_ENV === 'production'
        });
       return res.status(200)
            .send({
                message: 'logged in successfully',
                userId: user.id
            });
    }catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

export const logout = (req, res) => {
    try{
        // res.clearCookie('jwt',{
        //     httpOnly: true
        // });
        res.cookie('jwt', '', { expires: new Date(0)})
        res.status(200).send('logged out successfully');
    }catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

export const updateProfile = (req, res) => {
    try{
        res.status(200).send({
            message: 'profile updated successfully'
        });
    }catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
};

export const checkAuth = (req, res) => {
    console.log(req.user);
    if(userModel.id === req.user.id){
       res.status(200).send(req.user);
    }
}