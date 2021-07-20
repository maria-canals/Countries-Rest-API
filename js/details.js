// import { getCountriesFromApi } from './requests.js';
// import { numberWithDots } from '../utils/utils.js';

// const modalTitle = document.querySelector('.modal-title');
// const modalBody = document.querySelector('.modal-body');

// const response = await getCountriesFromApi();

// const showDetails = event => {
// 	let selectedCountry;
// 	if (event.target.parentNode.id) {
// 		selectedCountry = event.target.parentNode.id;
// 	} else {
// 		selectedCountry = event.target.parentNode.parentNode.id;
// 	}

// 	modalTitle.textContent = selectedCountry;
// 	renderCountry(selectedCountry);
// };

// const filterData = (dataType, countrySelected) => {
// 	const dataToIterate = dataType;
// 	for (const country of response) {
// 		if (country.name === countrySelected) {
// 			let dataType = Object.entries(country[dataToIterate]);
// 			let data = [];
// 			for (const el of dataType) {
// 				for (const a of el) {
// 					dataToIterate === 'currencies'
// 						? data.push(a.code)
// 						: data.push(a.name);
// 				}
// 			}
// 			const filteredData = data.filter(c => c != undefined);
// 			return filteredData;
// 		}
// 	}
// };

// const renderCountry = selectedCountry => {
// 	for (const country of response) {
// 		if (country.name === selectedCountry) {
// 			const currencies = filterData('currencies', selectedCountry);
// 			const languages = filterData('languages', selectedCountry);
// 			modalBody.innerHTML = `
// 			        <img src="${
// 								country.flag
// 							}" class="modal-card-img-top" style="width: 70%; alt="${selectedCountry}">
// 			        <div class="modal-card-body">
// 			            <p class="card-text">Native Name: ${country.nativeName}</p>
// 			            <p class="card-text">Population:
// 						 ${numberWithDots(country.population)}</p>
// 			            <p class="card-text">Region: ${country.region} </p>
// 						<p class="card-text">Currencies: ${currencies} </p>
// 						<p class="card-text">Languages: ${languages} </p>
// 			        </div>`;
// 		}
// 	}
// };

// export { showDetails };
