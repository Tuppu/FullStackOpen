import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi'

const getAllCountries = () => {
    const url = new URL("/restcountries/api/all", baseUrl);
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getCountry = (countryName) => {
    const url = new URL("/restcountries/api/name/", baseUrl);
    const request = axios.get(url + countryName);
    return request.then(response => response.data)
}

export default {getAllCountries, getCountry}