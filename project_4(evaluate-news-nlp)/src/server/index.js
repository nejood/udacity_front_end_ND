
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


//TODO: API
const BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const apiKEY = process.env.API_KEY
console.log(`Your API key is ${apiKEY}`);


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

// POST route
app.post('/add', async (req, res)=> {
    let data = req.body.url;
    console.log('server side data ', data); 
    const url_MC = `${BASE_URL}?key=${apiKEY}&url=${data}&lang=en`
    const response = await fetch(url_MC);
    const response_MC = await response.json();
    res.send(response_MC);
})