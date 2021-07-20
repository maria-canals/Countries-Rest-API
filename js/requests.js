const getCountriesFromApi = () => {
	return axios.get('https://restcountries.eu/rest/v2/all').then(response => {
		return response.data;
	});
};

export { getCountriesFromApi };
