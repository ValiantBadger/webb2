const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');

const apiKey = 'b1b475089729441ccb5f560a6e05ca26';
let lat = '63.1793655';
let lon = '14.6357061';
let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

app.get("/", function (req, res) {
    let selectedDate = req.query.date; 
    let hours = [];

  
    const today = new Date();
    let availableDates = [];
    for (let i = 0; i <= 100; i++) {
        let date = new Date(today);
        date.setDate(today.getDate() + i);
        
    }

    request(url, function (err, _response, body) {
        if (err) {
            console.log( err);
            
        } else {
            let weather = JSON.parse(body);

            for (let i = 0; i < weather["list"].length; i++) {
                let hour = weather["list"][i];
                let hourDate = hour["dt_txt"].split(" ")[0]; 

                
                if (hourDate === selectedDate || !selectedDate) {
                    hours.push({
                        date: hour["dt_txt"], 
                        temp: (hour["main"]["temp"] - 273.15).toFixed(1) //
                    });
                }
            }

         
            res.render("index", { hours: hours, selectedDate: selectedDate, availableDates: availableDates });
        }
    });
});

app.listen(port, function () {
    console.log("good to go boss");
});
