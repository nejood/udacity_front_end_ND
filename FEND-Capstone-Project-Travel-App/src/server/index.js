let projectData = {};

const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require("node-fetch");

const dotenv = require('dotenv');
dotenv.config();


const app = express()
/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)


//TODO: All API
// Geonames :
const geoBaseURL = 'http://api.geonames.org/searchJSON?q='
const geoUserName = process.env.geoUserName
console.log(`Your geonames user name is  ${geoUserName}`);

// Weatherbit :
const WeatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherbitApiKey = process.env.weatherbitApiKey
console.log(`Your Weatherbit API is  ${weatherbitApiKey}`);

// Pixabay :
const PixabayBaseURL = 'https://pixabay.com/api/?'
const pixabayApiKey = process.env.pixabayApiKey
console.log(`Your Pixabay API is  ${pixabayApiKey}`);


// GET route
app.get('/', function (req, res) {
          res.sendFile('dist/index.html')
        //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// POST route to get information from geonames API:
app.post('/data', async (req, res)=> {
    let City = req.body.city;
    console.log('The city is ', City); 
    const geoURL = `${geoBaseURL}${City}&maxRows=1&username=${geoUserName}` 
    const response = await fetch(geoURL);
    const geoURLdata = await response.json();
  
    projectData ={
        city: geoURLdata.geonames[0].name,
        country: geoURLdata.geonames[0].countryName,
        lat: geoURLdata.geonames[0].lat,
        lon: geoURLdata.geonames[0].lng
    }
    res.send(projectData);
   
})

// POST route to get information from Weatherbit API:
app.post('/weather', async (req, res)=> {

   let lat = req.body.lat;
   let lon = req.body.lon;
   let Days = req.body.days;

   console.log(`Latitude: ${lat}, Longitude: ${lon}, Days: ${Days}`);

   const WeatherbitURL = `${WeatherbitBaseURL}&lat=${lat}&lon=${lon}&days=${Days}&key=${weatherbitApiKey}`
    const response = await fetch(WeatherbitURL);
    const WeatherURLdata = await response.json();
    projectData ={
    weatherbitData: WeatherURLdata
    }
    res.send(projectData);
})

// POST route to get information from Pixabay API:
app.post('/pic', async (req, res)=> {
    let cityName = req.body.city;
    let countryName = req.body.country;

     console.log(`For Image: City is ${cityName}, Country is ${countryName}`);
     const PixabayCityURL = `${PixabayBaseURL}key=${pixabayApiKey}&q=${cityName}&image_type=photo&orientation=horizontal&per_page=4&pretty=true` 
     const response = await fetch(PixabayCityURL);

     try {
        const PixabayCityURLdata = await response.json();
        if(PixabayCityURLdata.totalHits > 0){
            projectData = {
                pixabayData: PixabayCityURLdata  
            }
            res.send(projectData);
            console.log('image found by city name')
        }
        else{
            try {
                const PixabayCountryURL = `${PixabayBaseURL}key=${pixabayApiKey}&q=${countryName}&image_type=photo&orientation=horizontal&per_page=4&pretty=true` 
                const response2 = await fetch(PixabayCountryURL);
                const PixabayCountryURLdata = await response2.json();
                projectData = {
                    pixabayData: PixabayCountryURLdata  
                }
                res.send(projectData);
                console.log('image found by country name')
            } catch (error) {
                console.log("error", error);
            }

        }
         
     } catch (error) {
        console.log("error", error);
     }
  
 })
 module.exports = { app }