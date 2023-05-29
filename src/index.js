import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { showLoader, showError, showSelect, showCatInfo } from './js/loader';
import { refs } from './js/cat-refs';

import SlimSelect from 'slim-select';

function createOptionList(array) {
  refs.breedSelect.insertAdjacentHTML(
    'afterbegin',
    array
      .map(
        ({ id, name }) =>
          `<option class="select-item" value="${id}">${name}</option>`
      )
      .join('')
  );
  new SlimSelect({
    select: refs.breedSelect,
  });
  showSelect();
}

function createCatView({ url, height, width, name, temperament, description }) {
  refs.catInfo.innerHTML = `
     <img src="${url}" alt="${name}" class="cat-image"  />
     <div class="card"> 
     <h1 class="name">${name}</h1>
      <p class="description">${description}</p>
      <p class="temperament"><span class="h-temp">Temperament: </span>${temperament}</p>
      </div>`;
  showCatInfo();
}

showSelect(false);
showCatInfo(false);
showLoader();
fetchBreeds()
  .then(createOptionList)
  .catch(x => {
    showError();
  })
  .finally(() => {
    showLoader(false);
  });

refs.breedSelect.addEventListener('change', event => {
  showLoader();
  showCatInfo(false);
  fetchCatByBreed(event.currentTarget.value)
    .then(createCatView)
    .catch(x => {
      showCatInfo(false);
      showError();
    })
    .finally(() => {
      showLoader(false);
    });
});
