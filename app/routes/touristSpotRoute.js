const express = require("express");
const router = express.Router();
const touristSpotController = require('./../controllers/touristSpotController');

router.get("/:page/:lang", touristSpotController.getTouristSpots);
router.post("/search/:lang", touristSpotController.searchInTourist);
router.get("/spot/:idSpot/:lang", touristSpotController.getSpotsDetails);

module.exports = router;