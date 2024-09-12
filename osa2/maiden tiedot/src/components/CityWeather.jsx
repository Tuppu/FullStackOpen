import React, { useEffect, useState } from "react";
import weatherService from "../services/weather";

const cityWeather = ({cityName}) => {
    
    const theCity = cityName[0];

    const [cityWeather, setCityWeather] = useState([])

    useEffect(() => {
        weatherService
        .getByCityName(theCity)
            .then(fetchedWeather => {
            setCityWeather(fetchedWeather)
            })
    }, [])

    if (!cityWeather || cityWeather.length == 0)
        return;

    return (
        <div>
            <h2>Weather in {cityWeather.name}</h2>
            <div>temperature {cityWeather.main?.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${cityWeather.weather[0]?.icon}@2x.png`} alt={cityWeather?.description} />
            <div>wind {cityWeather.wind?.speed} m/s</div>
        </div>
    )
}

export default cityWeather;