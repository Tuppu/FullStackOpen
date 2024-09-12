const CountryListItem = ({CountryName, showCountry}) => {
    return (
        <div>
            {CountryName} 
            <button onClick={() => showCountry(CountryName)}>
                {'show'}
            </button>
            </div>
    )
}

export default CountryListItem;