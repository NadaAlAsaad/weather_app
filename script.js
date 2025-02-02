const apiKey = "f4b2935125e082f9d9ae60c5903fc5cc";
const searchBtn = document.querySelector("button");
const searchInput = document.querySelector(".search-bar");
const cityText = document.querySelector(".city");
const tempText = document.querySelector(".temp");
const descText = document.querySelector(".description");
const humidityText = document.querySelector(".humidity");
const windText = document.querySelector(".wind");
const weatherIcon = document.querySelector(".icon");
const translateBtn = document.getElementById("translate-btn");
const weatherContainer = document.querySelector(".weather");

let isArabic = false;

searchBtn.addEventListener("click", function() {
    var city = searchInput.value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    weatherContainer.classList.add("loading");
    getWeather(city);
});

function getWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;
    fetch(url)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject("City not found");
            }
        })
        .then(function(data) {
            updateWeatherUI(data);
            updateBackground(city);
        })
        .catch(function(err) {
            alert(err);
            weatherContainer.classList.remove("loading");
            document.body.style.backgroundImage = "OIP.jpg";
            document.body.style.backgroundColor = "#87ceeb";
        });
}

function updateWeatherUI(data) {
    cityText.textContent = "Weather in " + data.name;
    tempText.textContent = data.main.temp + "°C";
    descText.textContent = data.weather[0].description;
    humidityText.textContent = "Humidity: " + data.main.humidity + "%";
    windText.textContent = "Wind speed: " + data.wind.speed + " km/h";
    weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    weatherContainer.classList.remove("loading");
}

function updateBackground(cityName) {
    var unsplashKey = "rA4AoYbB78LLOy23LZxqlDftOvwuG9_om7WVde52AMI";
    var unsplashUrl = "https://api.unsplash.com/search/photos?query=" + cityName + "&client_id=" + unsplashKey;
    
    fetch(unsplashUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Unsplash fetch error");
            }
        })
        .then(function(data) {
            if (data.results && data.results.length > 0) {
                var imageUrl = data.results[0].urls.regular;
                document.body.style.backgroundImage = "url(" + imageUrl + ")";
                document.body.style.backgroundColor = "#87ceeb";
            } else {
                throw new Error("No images found");
            }
        })
        .catch(function(error) {
            document.body.style.backgroundImage = "OIP.jpg";
            document.body.style.backgroundColor = "#87ceeb";
        });
}

translateBtn.addEventListener("click", function() {
    if (isArabic) {
        cityText.textContent = cityText.textContent.replace("في", "in");
        descText.textContent = descText.textContent.replace("غائم", "Cloudy");
        humidityText.textContent = humidityText.textContent.replace("الرطوبة:", "Humidity:");
        windText.textContent = windText.textContent.replace("سرعة الرياح:", "Wind speed:");
        translateBtn.textContent = "🌍 Arabic";
    } else {
        cityText.textContent = cityText.textContent.replace("Weather in", "الطقس في");
        descText.textContent = descText.textContent.replace("Cloudy", "غائم");
        humidityText.textContent = humidityText.textContent.replace("Humidity:", "الرطوبة:");
        windText.textContent = windText.textContent.replace("Wind speed:", "سرعة الرياح:");
        translateBtn.textContent = "🌍 English";
    }
    isArabic = !isArabic;
});
