var cities = {
    Vancouver: {lat: 49.2586, lon: -123.1207},
    Toronto: {lat: 43.6532, lon: -79.3832}
}
async function getWeather(lat, lon) {
    var url ="https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + 
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m" + "&timezone=auto";

    var res = await fetch(url);
    var data = await res.json();
    return data.current;
}

function renderWeather(cityName, current) {
    var box = document.getElementById("weather-info");

    box.innerHTML = 
    "<h2>" + cityName + "</h2>" + 
    "<p>Temp: " + current.temperature_2m + " C</p>" + "<p>Humidity: " + current.relative_humidity_2m + "%</p>" + 
    "<p>Wind: " + current.wind_speed_10m + " km/h</p>";
}

function attachListners() {
    var buttons = document.querySelectorAll("#top-10 .view-btn")

    buttons.forEach(function (btn) {
        btn.addEventListener("click", async function () {
            var cityName = btn.dataset.city;
            var city = cities[cityName];

            if(!city) {
                document.getElementById("weather-info").textContent = "City not found in list.";
                console.log("dataset.city = ", btn.dataset.city);
                return;
            }

            try {
                const spinner = document.getElementById("spinner-border");
                spinner.style.display = "block";
                var current = await getWeather(city.lat, city.lon);
                renderWeather(cityName, current);
                spinner.style.display = "none";
            } catch(err) {
                document.getElementById("weather-info").textContent = "Error loading weather."
                console.log(err)
            }
        });
    });
}

attachListners();