// import { getCountriesFromApi } from './requests.js';
import { clearContainer, numberWithDots } from '../utils/utils.js';
import { showDetails } from './details.js';

const container = document.getElementById('container');
const searchBar = document.getElementById('search');
const filterDropdown = document.getElementById('dropdown');
// let response = await getCountriesFromApi();

const getCountries = async (sValue = '', fValue = '') => {
	// response = await getCountriesFromApi();
	const countriesFromLocalStorage = localStorage.getItem('countries');
	const response = JSON.parse(countriesFromLocalStorage);
	const searchedValue = sValue.toLowerCase();
	const filteredItem = fValue.toLowerCase();

	if ((!searchedValue && !filteredItem) || filteredItem === 'all') {
		console.log(response);
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
	card.setAttribute('type', 'button');
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

getCountries();
