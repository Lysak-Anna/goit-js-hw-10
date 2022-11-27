import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
const list = document.querySelector('.country-list');
const card = document.querySelector('.country-info');



function inputHandler(event) {
    const name = event.target.value.trim();
    if (!name) {
        card.innerHTML = '';
        list.innerHTML = '';
        return;
    }
    fetchCountries(name).then(countries => {
        interfaceOfResult(countries);
    }).catch((error) => {
        card.innerHTML = '';
        list.innerHTML = '';
        return Notify.failure("Oops, there is no country with that name");
    });
    
}

function interfaceOfResult(countries) {
    if (countries.length > 10) {
        list.innerHTML = '';
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length > 2 && countries.length < 10) {
        renderListForFirstCase(countries);
    } else if (countries.length === 1) {
        renderListForSecondCase(countries);
    }
}

function renderListForFirstCase(countries) {
    card.innerHTML = '';
    const markup = countries.map(country => {
        return `<li>
        <img src=${country.flags.svg} width=70 height=50></img>
        <p>${country.name.official}</p></li>`
    }).join('');
    list.innerHTML = markup;
}

function renderListForSecondCase(countries) {
    list.innerHTML = '';
    const markup = countries.map(country => {
        return `<img src=${country.flags.svg} width=120 height=100></img>
        <p>${country.name.official}</p>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${Object.values(country.languages)}</p>`
    }).join('');
    card.innerHTML = markup;
    
}