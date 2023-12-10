document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData.email);
  const api_key = "b33b9693004ec7f5aa68c57be61c75ee";

  const city = userData.location;
  const country_code = userData.phone.slice(0, 4);
  console.log(city, country_code);

  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country_code}&appid=${api_key}&units=metric`;
  const data = await fetch(url, {
    method: "GET",
  }).then(async (res) => {
    const result = await res.json();
    const forecastData = result.list;

    // Group forecast data by day
    const groupedByDay = {};
    forecastData.forEach((forecast) => {
      const date = forecast.dt_txt.split(" ")[0];
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(forecast);
    });

    // Clear existing forecast cards
    const div = document.getElementById("weather-data");
    div.innerHTML = "";

    // Create separate cards for each day
    for (const day in groupedByDay) {
      const dayForecast = groupedByDay[day];

      const card = document.createElement("div");
      card.classList.add("weather-card");

      const weatherDiv = document.createElement("div");
      weatherDiv.classList.add("weather-info");
      weatherDiv.innerHTML = `
           <div>
             <strong>Date:</strong><br>
             ${day}
           </div>
           <div>
             <strong>Temperature:</strong><br>
             ${dayForecast[0].main.temp}°C
           </div>
           <div>
             <strong>Humidity:</strong><br>
             ${dayForecast[0].main.humidity}%
           </div>
           <div>
             <strong>Weather:</strong><br>
             ${dayForecast[0].weather[0].main}
           </div>
           <div>
             <strong>Description:</strong><br>
             ${dayForecast[0].weather[0].description}
           </div>
           <div>
             <strong>Wind Speed:</strong><br>
             ${dayForecast[0].wind.speed} m/s
           </div>
        `;

      card.appendChild(weatherDiv);
      div.appendChild(card);
    }
  });
});
