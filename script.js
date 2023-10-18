
var res=fetch("https://restcountries.com/v2/all")
res.then((data)=> data.json()).then((data1)=>{
    var numColumns = 3; 
    var countryInfoContainer = document.createElement("div");
    countryInfoContainer.classList.add("container", "mt-5");

    for(var i=0;i<data1.length;i++){
        if (i % numColumns === 0) {
            var row = document.createElement("div");
            row.classList.add("row");
            countryInfoContainer.appendChild(row);
        }
        var card = document.createElement("div");
        card.classList.add("col-lg-4", "col-sm-6", "col-md-4","col-lx-4");

        card.innerHTML= `
        <div class="card" style="width: 18rem; height:100">
        <div class="card-header" style="text-align:center">${data1[i].name}
        <img src="${data1[i].flag}" class="card-img-top" alt="">
        <div class="card-body">
          <h4 class="card-header">${data1[i].name}</h4>
          <h4 class="card-title">${data1[i].region}</h4>
          <h4 class="card-title">${data1[i].subregion}</h4>
          <h4 class="card-title">${data1[i].population}</h4>
         
          <a href="https://openweathermap.org/find?q=weather" class="btn btn-primary" data-country-code="${data1[i].alpha2Code}">click for weather</a>
          </div>
          </div>
          </div>
       `;
      row.appendChild(card);
    }
    document.body.append(countryInfoContainer);
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-primary")) {
        const countryCode = e.target.getAttribute("data-country-code");
        fetchWeather(countryCode);
    }
});
function fetchWeather(countryCode) {
    const apiKey = "73cbeda827374101b1413aae034b0358";
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`)
        .then((response) => response.json())
        .then((weatherData) => {
            alert(`Weather in ${weatherData.name}: ${weatherData.weather[0].description}`);
        })
        .catch((error) => {
            console.error("Error fetching weather data: ", error);
        });
}
