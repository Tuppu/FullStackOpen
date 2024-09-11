import { useState, useEffect } from 'react'
import countryService from './services/country'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

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

    let filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(newFilterValue.toLowerCase()));
    setFilteredCountries(filteredCountries);

    if (filteredCountries.length == 1 && filteredCountries[0].name.official)
    {
      countryService
      .getCountry(filteredCountries[0].name.official)
        .then(foundCountry => {
          setFoundCounty(foundCountry)
        });
    } else {
      setFoundCounty(null)
    }
  }

  return (
    <div>
      <Filter newFilter={searchCountryName} onChange={handlefilterChange} />
      <Countries countries={filteredCountries}/>
      <Country country={foundCountry}/>
    </div>
  )
}

export default App