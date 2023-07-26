const User = require('../models/User')
const userService= require('../services/userService');

const getTestUser = async (req , res)=>{
    const users = await User.find({});
    res.send(users);
}



const getAllUsers= async(req, res) =>{
    try{
        const users= await User.find({},'-password');
        res.json(users);
    }
    catch(err){
        res.status(500).json({error: 'erreur serveur'});
    }
};

const Signup= async function(request, response){
    const {username,email,password}= request.body;
    try{
        var result= await userService.createUser(username,email,password);
        response.json (result);
    }
    catch(error){
        response.status(500).json({error: 'erreur serveur'});
    }
}

const Signin= async function(request, response){
    const {usernameOrEmail,password}= request.body;
    try{
        var result= await userService.verifyUser(usernameOrEmail,password);
        response.json (result);
    }
    catch(error){
        response.status(500).json({error: 'erreur serveur'});
    }
}


module.exports = {
    getTestUser,
    getAllUsers,
    Signup,
    Signin
}