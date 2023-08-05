const Preference = require('../models/Preference');
const User = require('../models/User');
const mongoose = require('mongoose');

const saveSettingUser = async (idUser)=>{
    const user_preference = new Preference();
    user_preference.user = idUser;
    const savedUserPreference =  await user_preference.save();
    return savedUserPreference;
}

const getSettingsUser = async (idUser)=>{
    try {
        const queryPreference = { "user" : idUser };
        const queryUser = { "_id" : idUser }
        console.log();
        const user =await User.findOne(queryUser);
        if(!user){
          return {
            status : 400,
            message : "User not exist !"
          }
        }
        let preference = await Preference.findOne(queryPreference);
        if(!preference){
            preference = await saveSettingUser(idUser);
        }
    
        return {
            status : 200,
            data : preference
        }
    } catch (error) {
        console.log(error);
        return {
          status: 400,
          message: "Une erreur au niveau server",
        }
    }
} 

const updateSettingUser = async (idUser , preferenceData)=>{
    try {
        const newValue = getValue(preferenceData.value);
        const preferenceUser = await getSettingsUser(idUser);
        if (!preferenceUser) {
            return {
                status: 400,
                message: "Préference user not found",
            };
        }
        
        preferenceUser.data[preferenceData.item] = newValue;
        const setting = new Preference(preferenceUser.data);
        await setting.save();
        return {
            status : 200,
            message : "Preference Changed !"
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: "Error in server",
        };
    }
}

const resetSetting = async(idUser)=>{
    try {
      const user_preference = new Preference();
      const query = {user: idUser};
  
      const defaultValues = user_preference.toObject();
  
      const updateObject = {};
      for (const key in defaultValues) {
        if (key !== '_id')updateObject[key] = defaultValues[key];
      }
  
      const updatedDocument = await Preference.findOneAndUpdate(query, updateObject, { new: true });
  
      if (!updatedDocument) {
        return {
          status: 400,
          message: "Erreur lors de la mise à jour des valeurs par défaut.",
        };
      } else {
        return {
          status: 200,
          data: updatedDocument,
          message: "Reset settings successfully !",
        };
      }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Une erreur au niveau server",
        };
    }
  }


function getValue(newValue) {
    if (newValue === 'true') {
      return true;
    } else if (newValue === 'false') {
      return false;
    } else {
      return newValue;
    }
  }

  module.exports={
    getSettingsUser,
    updateSettingUser,
    resetSetting

  }