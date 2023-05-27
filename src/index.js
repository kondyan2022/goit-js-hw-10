import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import 'notiflix/dist/notiflix-3.2.6.min.css';
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';
// import './css/index.css';

Notify.init({ width: '420px', position: 'center-center' });

function showLoader(shown = true) {
  if (shown) {
    document.querySelector('p.loader').classList.remove('is-hidden');
    document.querySelector('p.error').classList.add('is-hidden');
  } else {
    document.querySelector('p.loader').classList.add('is-hidden');
  }
}

function showError(shown = true) {
  if (shown) {
    Notify.failure(`❌ Oops! Something went wrong! Try reloading the page!`);
    // document.querySelector('p.error').classList.remove('is-hidden');
  } else {
    document.querySelector('p.error').classList.add('is-hidden');
  }
}
function showSelect(shown = true) {
  if (shown) {
    document.querySelector('select.breed-select').classList.remove('is-hidden');
  } else {
    document.querySelector('select.breed-select').classList.add('is-hidden');
  }
}

function showCatInfo(shown = true) {
  if (shown) {
    document.querySelector('div.cat-info').classList.remove('is-hidden');
  } else {
    document.querySelector('div.cat-info').classList.add('is-hidden');
  }
}

function createOptionList(array) {
  document
    .querySelector('select.breed-select')
    .insertAdjacentHTML(
      'afterbegin',
      array
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join('')
    );
  //   new SlimSelect({
  //     select: '#slim-select',
  //   });
}

function createCatView({ url, height, width, name, temperament, description }) {
  document.querySelector('div.cat-info').innerHTML = `
     <img src="${url}" alt="${name}" class="cat-image" height="${height}" width="${width}" />
     <div class="card"> 
     <h1 class="name">${name}</h1>
      <p class="description">${description}</p>
      <p class="temperament"><span class="h-temp">Temperament: </span>${temperament}</p>
      </div>`;
}

showSelect(false);
showCatInfo(false);
showLoader();
fetchBreeds()
  .then(data => {
    createOptionList(data);
    showSelect();
  })
  .catch(x => {
    showError();
  })
  .finally(() => {
    showLoader(false);
  });

document
  .querySelector('select.breed-select')
  .addEventListener('change', event => {
    showLoader();
    showCatInfo(false);
    fetchCatByBreed(event.currentTarget.value)
      .then(data => {
        showCatInfo();
        createCatView(data);
      })
      .catch(x => {
        showCatInfo(false);
        showError();
        console.log(x);
      })
      .finally(() => {
        showLoader(false);
      });
  });
