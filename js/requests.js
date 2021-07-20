const getCountriesFromApi = async () => {
	let data = await fetch('https://restcountries.eu/rest/v2/all');
	let response = await data.json();
	return response;
};

export { getCountriesFromApi };
