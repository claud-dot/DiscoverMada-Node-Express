const User = require('../models/User')

const getTestUser = async (req , res)=>{
    const users = await User.find({});
    res.send(users);
}

module.exports = {
    getTestUser
}