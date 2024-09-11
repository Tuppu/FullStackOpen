const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length == 0) {
        return (<div>None matches, loose a filter</div>)
    } else if (countries.length == 1) {
        return (<></>)
    } else {
        return (
            countries.map(country => <div key={country.name.common}>{country.name.common}</div>)
        )
    }
}
  
export default Countries;