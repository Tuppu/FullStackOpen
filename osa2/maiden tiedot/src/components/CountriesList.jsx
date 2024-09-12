import CountryListItem from "./CountryListItem"

const CountriesList = ({countries, showCountry}) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length == 0) {
        return (<div>None matches, loose a filter</div>)
    } else if (countries.length == 1) {
        return (<></>)
    } else {
        return (

            countries.map(country => <CountryListItem key={country.name.official} CountryName={country.name.common} showCountry={showCountry}></CountryListItem>)
        )
    }
}
  
export default CountriesList;