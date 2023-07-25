const express = require("express");
const router = express.Router();
const touristSpotController = require('./../controllers/touristSpotController');

router.get("/:page", touristSpotController.getTouristSpots);
router.get("/search/:lang", touristSpotController.searchInTourist);

module.exports = router;