// model
// agron2 hashPassword
const Users = require('../models/users');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config');

class AuthController {
    async getUser(req, res, next ){
        try {
            const user = await Users.findById(req.userId).select('-password');
            if(!user){
                return res.status(400).json({success : false, message : 'User not found'});
            }
            res.json({success : true, user})
        } catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Internal server error"});
        }
    }
    async register(req,res,next){
        const {username, password} = req.body;
        if(!username || !password){
            return res
            .status(400)
            .json({success : false, message : "Missing password or username"});
        }

        try {
            // Check for user existing 
            const user = await Users.findOne({username});
            
            if(user){
                return res
                .status(400)
                .json({success : false, message : "user is existing"})
            }
            // Hash password
            const hashPassword = await argon2.hash(password);
            const newUser = new Users({
                username,
                password : hashPassword
            })
            await newUser.save();

            //return token
            const accessToken = jwt.sign({
                userId : newUser._id},
                config.ACCESS_TOKEN_SECRET)
        
            return res.json({
                success : true, message : "User created successfully!", accessToken});

        } catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Internal server error"});
        }
    }
    async login(req,res,next){
        // Simple validate
        // Check for user
        const {username, password} = req.body;

        if(!username || !password){
            return res
            .status(400)
            .json({success : false, message : "missing password or username"})
        }

        try {
            const user = await Users.findOne({username});
            if(!user) {
                return res
                .status(400)
                .json({
                    success : false, message : "Incorrect username or password"})
            }
            const passwordValid = await argon2.verify(user.password,password);
            if(!passwordValid){
                return res
                .status(400)
                .json({
                    success : false, message : "Incorrect username or password"})
            }

            const accessToken = jwt.sign({
                userId : user._id},
                config.ACCESS_TOKEN_SECRET)
        
            return res.json({
                success : true, message : "User Logged is successfully!", accessToken});

        } catch (error) {
            console.log(error);
            res.status(500).json({success : false, message : "Internal server error"});
        }
    }
}

module.exports = new AuthController();