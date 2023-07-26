const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/test",userController.getTestUser);
router.get("/users",userController.getAllUsers);
router.post("/signup",userController.Signup);
router.post("/signin",userController.Signin)

module.exports = router