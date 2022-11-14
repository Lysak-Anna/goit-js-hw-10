import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
// const searchParams = new URLSearchParams({
//     nativeName,
//     capital,
//     population,
//     flags: [0],
//     languages,
// });


function inputHandler(event) {
    let name = event.target.value;
    fetchCountries(name);
    
}

