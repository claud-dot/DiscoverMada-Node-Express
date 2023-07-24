const touristSpotsService = require('../services/touristSpotService');

const getTouristSpots = async (req, res)=>{
    const page = req.params.page;
    const signal = await touristSpotsService.getTouristSpots(page);
    res.send(signal);
}

module.exports = {
    getTouristSpots
}