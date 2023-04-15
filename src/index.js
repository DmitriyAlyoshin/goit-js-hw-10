import './css/styles.css';
import { fetchCountries } from './JS/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
