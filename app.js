const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
var cors = require('cors');

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to the database");
  })
  .catch((err) => {
    console.log("The server cannot connect to the database "+err);
    process.exit();
  });
  
// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.options('*', cors());

// Définir le répertoire des fichiers statiques (images et vidéos)
app.use(express.static(__dirname+'/public')); 

//Routes
const userRoute = require("./app/routes/userRoute");

//Apis
app.get('/',(req , res)=>{
  res.send("Hello word ! ")
})
app.use("/api/user", userRoute);


module.exports = app;
