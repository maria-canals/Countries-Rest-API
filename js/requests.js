const getCountriesFromApi = () => {
	return axios.get('https://restcountries.eu/rest/v2/all').then(response => {
		localStorage.setItem('countries', JSON.stringify(response.data));
	});
};
