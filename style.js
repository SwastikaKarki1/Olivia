const apikey = '590faee483c67d749f7b22d357e62652';
async function getWeather() {
    let city = document.querySelector("#city").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }
try {
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            alert("City not found! Please check the city name.");
            return;
        }

        const weather = await response.json();

        document.getElementById("city-name").innerHTML = `${weather.name}, ${weather.sys.country}`;

        const date = new Date(weather.dt * 1000); 
        const formattedDate = date.toLocaleDateString(); 
        document.getElementById("date-info").innerHTML = `Date: ${formattedDate}`;
        document.getElementById("main-condition").innerHTML = `Main Condition: ${weather.weather[0].main}`;
        document.getElementById("weather-condition").innerHTML = `Condition: ${weather.weather[0].description}`;

        const weatherIcon = document.getElementById("weather-icon");
        const iconCode = weather.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.style.display = 'block';
        
        document.getElementById("temperature").innerHTML = `Temperature: ${weather.main.temp}°C`;
        document.getElementById("pressure").innerHTML = `Pressure: ${weather.main.pressure} hPa`;
        document.getElementById("humidity").innerHTML = `Humidity: ${weather.main.humidity}%`;
        document.getElementById("wind-speed").innerHTML = `Wind Speed: ${weather.wind.speed} m/s`;
        document.getElementById("wind-direction").innerHTML = `Wind Direction: ${weather.wind.deg}°`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to retrieve weather data. Please try again later.");
    }
}
