let apikey = "defeee5efab2111ef30348c1596b4a9b"
let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

let searchim = document.querySelector(".search input")
let weatherconditiion = document.querySelector(".weather-now")

async function getdata(city) {
    if (city.trim() === "") {
        alert("Enter city name please");
        return;
    }

    try {
        let resp = await fetch(apiurl + city + `&appid=${apikey}`);
        let data = await resp.json();
        console.log(data);

        if (data.cod === "404") {
            alert(`${searchim.value} was not found`);
            return;
        }

        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector("#city").innerHTML = data.name;
        document.querySelector(".windspeed").innerHTML = data.wind.speed + " Km/p";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        searchim.value = '';

      
        if (data.weather[0].main === "Clouds") {
            weatherconditiion.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherconditiion.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherconditiion.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherconditiion.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherconditiion.src = "images/mist.png";
        } else if (data.weather[0].main === "Haze") {
            weatherconditiion.src = "images/haze.png";
        } else {
            weatherconditiion.src = "images/default.png";
        }

    } catch (error) {
        alert(`API STOP WORKING`);
        console.error(error);
    }
}

document.querySelector("#submit").addEventListener("click",(e)=>{
    e.preventDefault()
    getdata(searchim.value)
})
searchim.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        getdata(searchim.value);
    }
});
