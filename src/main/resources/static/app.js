var cities = {
    Mississauga: { lat: 43.5890, lon: -79.6441 },
    Hamilton: { lat: 43.2560, lon: -79.8728 },
    Laval: { lat: 45.5571, lon: -73.7211 },
    Kitchener: { lat: 43.4512, lon: -80.4927 },
    Richmond: { lat: 49.1631, lon: -123.1374 },
    Burnaby: { lat: 49.2433, lon: -122.9725 },
    Kelowna: { lat: 49.8879, lon: -119.4959 },
    Abbotsford: { lat: 49.0521, lon: -122.3294 },
    Coquitlam: { lat: 49.2842, lon: -122.7932 },
    Victoria: { lat: 48.4283, lon: -123.3649 },
    Oakville: { lat: 43.4474, lon: -79.6666 },
    Yellowknife: { lat: 62.4540, lon: -114.3773 },
    Vancouver: {lat: 49.2586, lon: -123.1207},
    Toronto: {lat: 43.6532, lon: -79.3832},
    Montreal: {lat: 45.5031, lon: -73.5698},
    Calgary: {lat: 51.0456, lon: -114.0575},
    Ottawa: {lat: 45.4208, lon: -75.6901},
    Edmonton: {lat: 53.5436, lon: -113.4912},
    Winnipeg: {lat: 49.8955, lon: -97.1384},
    Brampton: {lat: 43.6858, lon: -79.7599},
    Surrey: {lat: 49.1913, lon: -122.8491},
    Chilliwack: {lat: 49.1709, lon: -121.9525},
};
async function getWeather(lat, lon) {
    var url ="https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + 
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation" + "&timezone=auto";

    var res = await fetch(url);
    var data = await res.json();
    return data.current;
}

function renderWeather(cityName, current) {
    var box = document.getElementById("weather-info");

    box.innerHTML = 
    "<h2>" + cityName + "</h2>" + 
    "<p>Temp: " + current.temperature_2m + " C</p>" + "<p>Humidity: " + current.relative_humidity_2m + "%</p>" + 
    "<p>Wind: " + current.wind_speed_10m + " km/h</p>" + "<p>Current Precipitation: " + current.precipitation + " mm</p>";
}

function attachListners() {
    var buttons = document.querySelectorAll("#top-10 .view-btn,.dropdown-content .view-btn")

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