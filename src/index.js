import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './JS/fetchCountries';

const DEBOUNCE_DELAY = 300;

let input = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');
let countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(e => {
    let trimmedValue = input.value.trim();
    cleanHtml();

    if (trimmedValue !== '') {
      fetchCountries(trimmedValue).then(foundData => {
        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.',
            { position: 'center-top' }
          );
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name', {
            position: 'center-top',
          });
        } else if (foundData.length >= 2 && foundData.length <= 10) {
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
          renderOneCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  let markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="50" hight="28">
         <p>${country.name.official}</p>
                </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  let markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="50" hight="28">
         <p>${country.name.official}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
