/* Global Variables */
const postURL = 'http://localhost:3000/addData';
const getURL = 'http://localhost:3000/all';
//const { error } = require("console");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const base = 'http://api.openweathermap.org/data/2.5/weather?appid=';
const apiKey = '246dc3fb56d4f5033d9e5a33a0fb372c&units=imperial';


/* Function called by event listener */
const generate = async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const url_weather = `${base}${apiKey}&zip=${zip}`;
   getWeather(url_weather)
   .then(function(weatherData={}){
    const data = {
      temp: weatherData.main.temp, 
      date: newDate, 
      feelings: feelings
    }
    return data;
   })
   .then(function(data={}){
      postData(postURL, data);
      console.log("POST Data: "+ JSON.stringify(data));
   })
   .then(function(){
    updateUI();
   })
}
/* Function to GET Web API Data*/
const getWeather = async (url)=>{
    const response = await fetch(url);
    try {
     const newData = await response.json();
     console.log('Weather Data:'+ JSON.stringify(newData));
     return newData; 
    }catch(error) {
     console.log('error', error);
    }
};
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });
    try {
     const newData = await response.json();
     return newData;
      }catch(error) {
      console.log("error", error);
      }
};

/* Function to GET Project Data */
const updateUI = async () =>{
  const request = await fetch(getURL);
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById('content').innerHTML = `I feel: ${allData.feelings}`;
  } catch (error) {
    console.log("error", error);  
  }
  };
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);