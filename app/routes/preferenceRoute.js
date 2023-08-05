const express = require("express");
const router = express.Router();
const preferenceController = require('../controllers/preferenceController');

router.get('/user/:idUser', preferenceController.getSettingUser);
router.post('/user/change/:idUser' , preferenceController.updateSettingUser);
router.put('/user/reset/:idUser' , preferenceController.resetSettingUser);

module.exports = router;