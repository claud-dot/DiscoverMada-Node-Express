const touristSpotsService = require('../services/touristSpotService');

const getTouristSpots = async (req, res)=>{
    const page = req.params.page;
    const signal = await touristSpotsService.getTouristSpots(page);
    res.send(signal);
}

const searchInTourist = async (req , res)=>{
    const reqSearch = req.body.searchKeyword;
    const lang = req.params.lang;
    const signal = await touristSpotsService.searchInTourist(reqSearch , lang);
    res.send(signal);
}

module.exports = {
    getTouristSpots,
    searchInTourist
}