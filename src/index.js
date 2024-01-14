function refreshWeather(response){
    let temperatureElement = document.querySelector("#weather-app-temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let conditionElement = document.querySelector("#condition");
    let timeElement = document.querySelector("#time"); 
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML =  `${response.data.wind.speed}km/h`;
    conditionElement.innerHTML = response.data.condition.description;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"></img>`
}

function formatDate(date) {
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

    if (minutes <10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}, `
}



function searchCity (city){
let apiKey = "befe28ed9d48eac93fd074tafa91d7of";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
axios.get(apiUrl).then(refreshWeather);
}




function searchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("London");
