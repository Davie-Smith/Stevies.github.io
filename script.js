const dvCityCountry = document.querySelector("#dvCityCountry");
const dvCurrDate = document.querySelector("#dvCurrDate");
const dvCurrTemp = document.querySelector("#dvCurrTemp");
const dvCurrCondition = document.querySelector("#dvCurrCondition");
const dvCurrIcon = document.querySelector("#dvCurrIcon");

let cityName, countryName;

async function getGeoData() {
  let search = "Dundee, Scotland";
  const url = `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2&addressdetails=1`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response status: ${response.status}");
    }

    const result = await response.json();
    console.log(result);

    let lat = result[0].lat;
    let lon = result[0].lon;

    loadLocationData(result);
    getWeatherData(lat, lon);
  } catch (error) {
    console.error(error.message);
  }
}

getGeoData();

function loadLocationData(locationData) {
  let location = locationData[0].address;
  cityName = location.city;
  countryName = location.country;

  let dateOptions = {
    weekday: "long",
  };

  let date = new Intl.DateTimeFormat("en-US", dateOptions).format(new Date());

  console.log(cityName, countryName, date);

  /*dvCityCountry.textContent = '${cityName}, ${countryName}';*/
  dvCurrDate.textContent = date;
}

async function getWeatherData(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response status: ${response.status}");
    }

    const result = await response.json();
    console.log(result);

    loadWeatherData(result);
  } catch (error) {
    console.error(error.message);
  }
}

function loadWeatherData(weather) {
  dvCurrTemp.textContent = weather.current.temperature_2m;
}

function getWeatherCodeName(code) {
  const weatherCodes = {
    0: "sunny",
    1: "partly-cloudy",
    2: "partly-cloudy",
    3: "overcast",
    45: "fog",
    48: "fog",
    51: "drizzle",
    53: "drizzle",
    55: "drizzle",
    56: "drizzle",
    57: "drizzle",
    61: "rain",
    63: "rain",
    65: "rain",
    66: "rain",
    67: "rain",
    80: "rain",
    81: "rain",
    82: "rain",
    71: "snow",
    73: "snow",
    75: "snow",
    77: "snow",
    85: "snow",
    86: "snow",
    95: "storm",
    96: "storm",
    99: "storm",
  };

  let fileName = "icon-${weatherCodes[code]}.webp";

  return fileName;
}

getGeoData();
