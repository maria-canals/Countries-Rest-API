const getCountriesFromApi = () => {
	return axios.get('https://restcountries.eu/rest/v2/all').then(response => {
		console.log(typeof response.data);
		localStorage.setItem('countries', JSON.stringify(response.data));
		return response.data;
	});
};

export { getCountriesFromApi };
