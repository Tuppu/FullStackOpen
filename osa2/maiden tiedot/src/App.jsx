import { useState, useEffect } from 'react'
import countryService from './services/country'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import CountryInformation from './components/CountryInformation'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchCountryName, setSearchCountryName] = useState('')
  const [foundCountry, setFoundCounty] = useState(null)

  useEffect(() => {
    countryService
      .getAllCountries()
        .then(initialCountries => {
          setCountries(initialCountries)
        })
  }, [])

  const handlefilterChange = (event) => {
    const newFilterValue = event.target.value;
    setSearchCountryName(newFilterValue)

    const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(newFilterValue.toLowerCase()));
    const foundSpecificCountry = filteredCountries.find(country => country.name.common.toLowerCase() == newFilterValue.toLowerCase());
    setFilteredCountries(filteredCountries);

    if (filteredCountries.length == 1 && filteredCountries[0].name.official || foundSpecificCountry)
    {
      countryService
      .getCountry(foundSpecificCountry?.name?.official ?? filteredCountries[0].name.official)
        .then(foundCountry => {
          setFoundCounty(foundCountry)
        });
    } else {
      setFoundCounty(null)
    }
  }

  const showCountry = (officialName) => {
    countryService
    .getCountry(officialName)
      .then(foundCountry => {
        setFoundCounty(foundCountry)
      });
  }

  return (
    <div>
      <Filter newFilter={searchCountryName} onChange={handlefilterChange} />
      <CountriesList countries={filteredCountries} showCountry={showCountry}/>
      <CountryInformation country={foundCountry}/>
    </div>
  )
}

export default App