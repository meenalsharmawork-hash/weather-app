const tempF = document.querySelector(".temp");
const cityF = document.querySelector(".city");
const timeF = document.querySelector(".localtime");

const conditionF = document.querySelector(".weather_condition span");
const conditionIcon = document.querySelector(".weather_condition img");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const API_KEY = "acfaa6b777ff410c944125822261904"; // apni key daalna

async function fetchWeatherData(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${acfaa6b777ff410c944125822261904}&q=${city}&aqi=no`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateDOM(data);

  } catch (error) {
    alert("Error fetching data");
    console.error(error);
  }
}

// Default load
fetchWeatherData("Delhi");

function updateDOM(data) {
  const { current, location } = data;

  tempF.textContent = `${current.temp_c}°C`;
  cityF.textContent = location.name;
  timeF.textContent = formatTime(location.localtime);
  conditionF.textContent = current.condition.text;

  conditionIcon.src = `https:${current.condition.icon}`;
  conditionIcon.alt = current.condition.text;
}

// Time formatter
function formatTime(localtime) {
  const [date, time] = localtime.split(" ");
  const day = getDayName(date);
  return `${time} ${day}, ${date}`;
}

// Day finder
function getDayName(dateString) {
  const dayIndex = new Date(dateString).getDay();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return days[dayIndex];
}

// Form submit
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = searchInput.value.trim();

  if (city === "") {
    alert("Enter city name");
    return;
  }

  fetchWeatherData(city);
  searchInput.value = "";
});
