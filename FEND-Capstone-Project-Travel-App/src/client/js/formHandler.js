//all used objects to store data:
let geonamesObj = {};
let weatherbitObj = {};
let pixabayObj = {};
let projectData = {};
//all used var to store number of days:
let countDown = 0;
let duration = 0;

const handleSubmit = async (event) => {

  console.log("::: Form started :::")
  event.preventDefault();

  // Get data from user:
  let destination = document.getElementById('dest').value.toLowerCase();
  let startDate = document.getElementById('startDate').value
  let endDate = document.getElementById('endDate').value

  // check what text was put into the form field
  if (destination !== "" || startDate !== "" || endDate !== "") {
    if (Client.checkDate(startDate, endDate)) {

      console.log("::: Form Submitted :::")

      //Calculate the tvaler duration and the countDown :
      let toDay = new Date();
      countDown = Client.calculateDays(startDate, toDay);
      duration = Client.calculateDays(endDate, startDate);

      //to fetch data from geonames:
      const postData_URL = 'http://localhost:8081/data'
      postData(postData_URL, { city: destination })
        .then(function (geonamesData = {}) {
          //to fetch data from Weatherbit:
          const postWeather_URL = 'http://localhost:8081/weather'
          weatherbitObj = postWeather(postWeather_URL, geonamesObj);
        })

        .then(function (data = {}) {
          //to fetch data from Weatherbit:
          const postPixabay_URL = 'http://localhost:8081/pic'
          pixabayObj = postPixabay(postPixabay_URL, geonamesObj);
        })

      // Fitch Weatherbit promise:
      const promiseWeatherbit = new Promise((resolve, reject) => {
        setTimeout(() => { resolve(weatherbitObj); }, 5000);
      });
      promiseWeatherbit.then(weathervalues => {
        weatherbitObj = weathervalues
      })
      // Fitch pixabayObj promise:
      const promisePixabay = new Promise((resolve, reject) => {
        setTimeout(() => { resolve(pixabayObj); }, 5000);
      });
      promisePixabay.then(pixabayvalues => {
        pixabayObj = pixabayvalues
      })
        .then(function (res = {}) {
          projectData = {
            geonData : geonamesObj,
            weatherbitData : weatherbitObj,
            pixabayData : pixabayObj
          }
          // Update UI:
          const infoSection = document.getElementById('infoSection')
          infoSection.innerHTML = Client.updateUI(startDate, endDate, countDown, duration, projectData.geonData, projectData.weatherbitData, projectData.pixabayData)

        })
    } else {
      alert('Invalid date, Please enter a correct date!');
    }

  } else {
    alert('Please enter your Travel destination or date!');
  }

}

/* Fitch geonames data: */
const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  });
  try {
    const geoData = await response.json()

    geonamesObj = {
      city: geoData.city,
      country: geoData.country,
      lat: geoData.lat,
      lon: geoData.lon,
      days: duration
    }

    console.log("geonames data: " + JSON.stringify(geonamesObj));
    return geonamesObj;

  } catch (error) {
    console.log("error", error);
  }
};

/* Fitch Weatherbit data: */
const postWeather = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  });
  try {

    let weatherbit = await response.json()
    console.log("Weatherbit data: " + JSON.stringify(weatherbit));
    return weatherbit;

  } catch (error) {
    console.log("error", error);
  }
};

/* Fitch Pixaba data: */
const postPixabay = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  });
  try {
    let pixabay = await response.json()
    console.log("Image data: " + JSON.stringify(pixabay));
    return pixabay;

  } catch (error) {
    console.log("error", error);
  }
};

// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', btnEvent )
function btnEvent(){
  let btn = document.getElementById("search")
  btn.addEventListener("click", handleSubmit);
} 
  
export { handleSubmit }