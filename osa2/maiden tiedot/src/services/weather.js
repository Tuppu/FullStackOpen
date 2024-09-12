import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_SOME_KEY

const getByCityName = (cityName) => {
    const request = axios.get(`${baseUrl}?q=${cityName}&units=metric&appid=${api_key}`);
    return request.then(response => response.data)
}

export default {getByCityName}