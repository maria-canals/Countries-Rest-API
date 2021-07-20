const clearContainer = () => {
	container.innerHTML = '';
};

const numberWithDots = x => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export { clearContainer, numberWithDots };
