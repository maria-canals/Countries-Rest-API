import { getCountriesFromApi } from './requests.js';
import { clearContainer, numberWithDots } from '../utils/utils.js';
// import { showDetails } from './details.js';
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');

const container = document.getElementById('container');
const searchBar = document.getElementById('search');
const filterDropdown = document.getElementById('dropdown');

const getCountries = async (sValue = '', fValue = '') => {
	const response = await getCountriesFromApi();
	const searchedValue = sValue.toLowerCase();
	const filteredItem = fValue.toLowerCase();

	if ((!searchedValue && !filteredItem) || filteredItem === 'all') {
		response.forEach(country => {
			if (country.name.length > 32) {
				country.name = country.name.substring(0, 31) + ' ...';
			}
			createCountryCard(
				country.name,
				numberWithDots(country.population),
				country.flag,
				country.region,
				country.capital
			);
		});
	} else if (searchedValue && filteredItem) {
		for (const country of response) {
			if (country.region.toLowerCase() === filteredItem) {
				let regionFiltered = country.name.toLowerCase();
				let doesItmatch = regionFiltered.startsWith(searchedValue);
				if (doesItmatch) {
					createCountryCard(
						country.name,
						numberWithDots(country.population),
						country.flag,
						country.region,
						country.capital
					);
				}
			}
		}
	} else if (searchedValue) {
		for (const country of response) {
			if (country.name.toLowerCase().startsWith(searchedValue)) {
				createCountryCard(
					country.name,
					numberWithDots(country.population),
					country.flag,
					country.region,
					country.capital
				);
			}
		}
	} else if (filteredItem) {
		for (const country of response) {
			if (!searchedValue) {
				if (country.region.toLowerCase() === filteredItem) {
					createCountryCard(
						country.name,
						numberWithDots(country.population),
						country.flag,
						country.region,
						country.capital
					);
				}
			}
		}
	}
};

const searchBarFilter = event => {
	const searchedValue = event.target.value.toLowerCase();
	clearContainer();
	getCountries(searchedValue, filterDropdown.value);
};

searchBar.addEventListener('input', searchBarFilter);

const filterByRegion = event => {
	const filteredItem = event.target.value;
	searchBar.value = '';
	clearContainer();
	getCountries(undefined, filteredItem);
};

filterDropdown.addEventListener('change', filterByRegion);

const createCountryCard = (cName, cPopulation, cFlag, cRegion, cCapital) => {
	cCapital === '' ? (cCapital = 'No capital') : cCapital;
	let card = document.createElement('li');
	card.innerHTML = `
    <div class="card m-3" id="${cName}" style="width: 18.5rem;">
        <img src="${cFlag}" class="card-img-top" alt="${cName}">
        <div class="card-body">
            <h5 class="card-title mt-2 text-center">${cName}</h5>
            <p class="card-text">Population: ${cPopulation}</p>
            <p class="card-text">Region: ${cRegion}</p>
            <p class="card-text">Capital: ${cCapital}</p>
        </div>
    </div>
    `;
	card.setAttribute('data-bs-toggle', 'modal');
	card.setAttribute('data-bs-target', '#exampleModal');
	card.addEventListener('click', showDetails);
	container.appendChild(card);
};

const toggleModeButton = document.querySelector('.header_button');
const icon = document.querySelector('.fas');
const currentTheme = document.body.className;

toggleModeButton.addEventListener('click', () => {
	if (icon.classList.contains('fa-moon')) {
		icon.classList.replace('fa-moon', 'fa-sun');
		toggleModeButton.innerHTML = `
		<i class="fas fa-sun"></i> Light Mode`;
	} else {
		icon.classList.replace('fa-sun', 'fa-moon');
		toggleModeButton.innerHTML = `
		<i class="fas fa-moon"></i> Dark Mode`;
	}

	document.body.classList.toggle('dark_mode');
	localStorage.setItem('theme', currentTheme);
});

const showDetails = event => {
	let selectedCountry;
	if (event.target.parentNode.id) {
		selectedCountry = event.target.parentNode.id;
	} else {
		selectedCountry = event.target.parentNode.parentNode.id;
	}

	modalTitle.textContent = selectedCountry;
	renderCountry(selectedCountry);
};

const filterData = async (dataType, countrySelected) => {
	const response = await getCountriesFromApi();
	const dataToIterate = dataType;
	for (const country of response) {
		if (country.name === countrySelected) {
			let dataType = Object.entries(country[dataToIterate]);
			let data = [];
			for (const el of dataType) {
				for (const a of el) {
					dataToIterate === 'currencies'
						? data.push(a.code)
						: data.push(a.name);
				}
			}
			const filteredData = data.filter(c => c != undefined);
			return filteredData;
		}
	}
};

const renderCountry = async selectedCountry => {
	const response = await getCountriesFromApi();
	for (const country of response) {
		if (country.name === selectedCountry) {
			const currencies = filterData('currencies', selectedCountry);
			const languages = filterData('languages', selectedCountry);
			modalBody.innerHTML = `
			        <img src="${
								country.flag
							}" class="modal-card-img-top" style="width: 70%; alt="${selectedCountry}">
			        <div class="modal-card-body">
			            <p class="card-text">Native Name: ${country.nativeName}</p>
			            <p class="card-text">Population:
						 ${numberWithDots(country.population)}</p>
			            <p class="card-text">Region: ${country.region} </p>
						<p class="card-text">Currencies: ${currencies} </p>
						<p class="card-text">Languages: ${languages} </p>
			        </div>`;
		}
	}
};

getCountries();
