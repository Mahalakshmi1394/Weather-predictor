import { useState } from 'react';
import searchIcon from "./assets/icons/search.png";
import clearIcon from "./assets/icons/clear.png";
import drizzleIcon from "./assets/icons/drizzle.png";
import cloudIcon from "./assets/icons/cloud.png";
import snowIcon from "./assets/icons/snow.png";
import rainIcon from "./assets/icons/rain.png";
import windIcon from "./assets/icons/wind.png";
import humidityIcon from "./assets/icons/humidity.png";

const WeatherDetails = ({ icon, temp, city, country, lat, long, humidity, wind }) => {
    return (
        <>
            <div className='image'>
                <img src={icon} alt="Weather Icon" />
            </div>
            <div className='temp'>{temp}°C</div>
            <div className='location'>{city}</div>
            <div className='country'>{country}</div>
            <div className='cord'>
                <div>
                    <span className='lat'>Latitude: {lat}</span>
                </div>
                <div>
                    <span className='long'>Longitude: {long}</span>
                </div>
            </div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidityIcon} alt="Humidity" className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>{humidity}%</div>
                        <div className='text'>HUMIDITY</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={windIcon} alt="Wind" className='icon' />
                    <div className='data'>
                        <div className='wind-percent'>{wind} km/hr</div>
                        <div className='text'>WIND SPEED</div>
                    </div>
                </div>
            </div>
            <p className='coptryt'>Designed by <span>MAHA</span></p>
        </>
    );
};

function Weather() {
    const api_key = "3a3173fd0c79e4dd79da7e904850fe1d";

    const [icon, setIcon] = useState(snowIcon); // Default icon set to "snow"
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("Chennai");
    const [country, setCountry] = useState("India");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);

    const search = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.cod === "404") {
                console.log("City not found");
                return;
            }

            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(data.main.temp);
            setCity(data.name);
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLong(data.coord.lon);

            // Update weather icon based on condition
            const weatherCondition = data.weather[0].main.toLowerCase();
            if (weatherCondition.includes("snow")) setIcon(snowIcon);
            else if (weatherCondition.includes("rain")) setIcon(rainIcon);
            else if (weatherCondition.includes("cloud")) setIcon(cloudIcon);
            else if (weatherCondition.includes("drizzle")) setIcon(drizzleIcon);
            else if (weatherCondition.includes("clear")) setIcon(clearIcon);
            else setIcon(windIcon); // Default icon
        } catch (error) {
            console.log("An error occurred", error.message);
        }
    };

    return (
        <>
            <div className='container'>
                <div className='input-container'>
                    <input 
                        type="text" 
                        placeholder='SEARCH CITY' 
                        onChange={(e) => setCity(e.target.value)} // Dynamically update city value
                    />
                    <div className='search-icon' onClick={search}>
                        <img src={searchIcon} alt="Search" />
                    </div>
                </div>
                <WeatherDetails 
                    icon={icon} 
                    temp={temp} 
                    city={city} 
                    country={country} 
                    lat={lat} 
                    long={long}
                    humidity={humidity}
                    wind={wind}
                />
            </div>
        </>
    );
}

export default Weather;
