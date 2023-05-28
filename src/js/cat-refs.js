import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import 'slim-select/dist/slimselect.css';

Notify.init({ width: '420px', position: 'center-center' });

export const refs = {
  loader: document.querySelector('p.loader'),
  error: document.querySelector('p.error'),
  breedSelect: document.querySelector('select.breed-select'),
  catInfo: document.querySelector('div.cat-info'),
};

export function showLoader(shown = true) {
  if (shown) {
    refs.loader.classList.remove('is-hidden');
    refs.error.classList.add('is-hidden');
  } else {
    refs.loader.classList.add('is-hidden');
  }
}

export function showError(shown = true) {
  if (shown) {
    Notify.failure(`❌ Oops! Something went wrong! Try reloading the page!`);
    // refs.error.classList.remove('is-hidden');
  } else {
    refs.error.classList.add('is-hidden');
  }
}
export function showSelect(shown = true) {
  if (shown) {
    refs.breedSelect.classList.remove('is-hidden');
  } else {
    refs.breedSelect.classList.add('is-hidden');
  }
}

export function showCatInfo(shown = true) {
  if (shown) {
    refs.catInfo.classList.remove('is-hidden');
  } else {
    refs.catInfo.classList.add('is-hidden');
  }
}
