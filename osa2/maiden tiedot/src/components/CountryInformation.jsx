import CityWeather from "./CityWeather";

const CountryInformation = ({country}) => {
    if (!country) {
        return (
            <></>
        )
    }

    let languages = [];
    for (const [key, value] of Object.entries(country.languages)) {
        languages.push({"key":key, "value": value});
        }
        
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital}<br />
                area {country.area}
            </p>
            <h2>languages</h2>
            <ul>
                {languages.map(language => <li key={language.key}>{language.value}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width="160" height="100" />
            <CityWeather cityName={country.capital} />
        </div>
    )
}

export default CountryInformation;