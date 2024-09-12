const CountryInformation = (country) => {
    if (country.country) {
        const theCountry = country.country

        let languages = [];
        for (const [key, value] of Object.entries(theCountry.languages)) {
            languages.push({"key":key, "value": value});
          }
          
        return (
            <div>
                <h1>{theCountry.name.common}</h1>
                <p>
                    capital {theCountry.capital}<br />
                    area {theCountry.area}
                </p>
                <h2>languages</h2>
                <ul>
                    {languages.map(language => <li key={language.key}>{language.value}</li>)}
                </ul>
                <img src={theCountry.flags.png} alt={theCountry.flags.alt} width="160" height="100" />
            </div>
        )
    }
}
  
export default CountryInformation;