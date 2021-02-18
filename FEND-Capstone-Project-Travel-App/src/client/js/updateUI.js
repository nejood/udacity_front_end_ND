function updateUI(startDate, endDate, countDown, duration , geonamesObj, weatherbitObj, pixabayObj){
    console.log("::: Running updateUI :::");
    let page = null;
    for (let i = 0; i < duration; i++) {
        let num = i+1;
        if(i === 0){
        page = `<header>
        <h3 class="title">Dstination: ${geonamesObj.city}, ${geonamesObj.country} </h3> 
        <h4 class="aboutTime">From: ${startDate} To: ${endDate} </h4> 
        <h4 class="aboutTime">Your travel will be after ${countDown} days, and you will spend ${duration} days</h4>  
     </header>
    
     <div class="pixyImg">
        <img src="${pixabayObj.pixabayData.hits[0].webformatURL}" alt="this image from Pixabay API">
     </div>
      <hr class="hr">
      <div> 
      <h3 class="title">Wheather Details</h3>` }
      page += `<div class="details"> <h4 class="detailsTitle"> Day ${num}: </h4> <h5> Weather Description: ${weatherbitObj.weatherbitData.data[i].weather.description} </h5> <h5> High Temperature: ${weatherbitObj.weatherbitData.data[i].max_temp} Low Temperature: ${weatherbitObj.weatherbitData.data[i].min_temp} </5> </div>` 
         
     }
    return page;

}

export { updateUI }