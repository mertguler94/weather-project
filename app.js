// jshint esversion: 6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req,res) { 
    res.sendFile(__dirname + "/index.html");
 });


app.post("/", function (req,res) {
    const appid = process.env.API_KEY;
    const q = req.body.city;
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&units=" + units + "&q=" + q;

    https.get(url, function (response) {

        response.on("data", function (data) { 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;


            res.write(`<h1>The temperature in ${q} is ${temp} Celcius Degree.</h1>`);
            res.write("<p>Temperature can be described as: " + weatherDesc + "</p>");
            res.write(`<img src='http://openweathermap.org/img/wn/${weatherIcon}@2x.png'>`);

            res.send();

         });

    });


});



app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});

