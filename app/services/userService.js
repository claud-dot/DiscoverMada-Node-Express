const crypto= require('crypto');
const User = require ('../models/User');
function hashStringToMD5(input){
    const hash = crypto.createHash('md5').update(input).digest('hex');
    return hash;
}

const createUser=async function createUser(username,email,password){

    const user = new User({username,email,password});
    const checkUser= await User.findOne({
        $or:[
            {email: user.email.trim().toLowerCase()},
            {username: user.username.trim().toLowerCase()}
        ]
    }).exec();
    if(checkUser){
        return {
            response: null,
            error: 1,
            errorMessage:"utilisateur existe déjà",
        };
    }
    user.created_at=new Date();
    user.password= hashStringToMD5(user.password);
    const savedUser= await user.save();
    return {
        response: savedUser,
        error: 0,
        error: ''
    };
}

const verifyUser = async function(userNameOrEmail,password){
    const normalizedInput = userNameOrEmail.trim().toLowerCase();
    const isEmail = /\S+@\S+\.\S+/.test(normalizedInput);
    const query = isEmail ? {email : normalizedInput} : {username : normalizedInput};

    const user= await User.findOne(query).exec();

    if(!user){
        return{
            response: null,
            error: 1,
            errorMessage: "Utilisateur introuvable"
        }
    }

    const hashedPassword=hashStringToMD5(password);
    if(hashedPassword!=user.password){
        return {
            response:null,
            error: 1,
            errorMessage: "Mot de passe incorrecte"
        };
    }
    
    return {
        response: user,
        error: 0,
        errorMessage: ''
    };
    
}


module.exports= {
    createUser,
    verifyUser
}

