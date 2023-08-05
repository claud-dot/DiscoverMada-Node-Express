const preferenceService = require('../services/preferenceService');

const getSettingUser = async(req , res)=>{
    const idUser = req.params.idUser;
    const signal = await preferenceService.getSettingsUser(idUser);
    res.send(signal);
}

const updateSettingUser = async(req , res)=>{
    const idUser = req.params.idUser;
    const dataPref =  req.body.preference ? req.body.preference : req.body.nameValuePairs.preference.nameValuePairs;
    const signal = await preferenceService.updateSettingUser(idUser , dataPref);
    res.send(signal);
}

const resetSettingUser = async(req , res)=>{
    const idUser = req.params.idUser;
    const signal = await preferenceService.resetSetting(idUser);
    res.send(signal);
}

module.exports = {
    getSettingUser,
    updateSettingUser,
    resetSettingUser
}