const touristSpotsService = require('../services/touristSpotService');

const getTouristSpots = async (req, res)=>{
    const page = req.params.page;
    const lang = req.params.lang;
    console.log("Langue ==", lang);
    const signal = await touristSpotsService.getTouristSpots(page , lang);
    res.send(signal);
}

const getSpotsDetails = async (req ,res)=>{
    const idSpot = req.params.idSpot;
    const lang = req.params.lang;
    console.log("Langue Details ==", lang);
    const signal = await touristSpotsService.getSpotsDetails(idSpot , lang);
    res.send(signal);
}

const searchInTourist = async (req , res)=>{
    console.log("Request Body ", req.body);
    const reqSearch =  req.body.searchKeyword ? req.body.searchKeyword : req.body.nameValuePairs.searchKeyword;
    const lang = req.params.lang;
    console.log("Langue ==", reqSearch);
    const signal = await touristSpotsService.searchInTourist(reqSearch , lang);
    res.send(signal);
}

module.exports = {
    getTouristSpots,
    getSpotsDetails,
    searchInTourist
}