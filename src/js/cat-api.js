export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  const api_key =
    'live_gjsDAbiVVqU3VKXGaxOhzhjZ0WgBx8tX9HEnAR2MFuFx3Et1Ju66JBqEQRRajf2r';
  const headers = new Headers({
    'Content-Type': 'application/json',
    'x-api-key': api_key,
  });
  return fetch(url, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.map(({ id, name }) => ({ id, name }));
    })
    .catch(error => {
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  const api_key =
    'live_gjsDAbiVVqU3VKXGaxOhzhjZ0WgBx8tX9HEnAR2MFuFx3Et1Ju66JBqEQRRajf2r';
  const headers = new Headers({
    'x-api-key': api_key,
  });

  const searchParams = new URLSearchParams({
    breed_ids: breedId,
  });
  const url = `https://api.thecatapi.com/v1/images/search?${searchParams}`;
  return fetch(url, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data[0])
    .then(data => {
      const { url, height, width, breeds } = data;
      const { name, temperament, description } = breeds[0];

      return { url, height, width, name, temperament, description };
    })
    .catch(error => {
      console.log(error);
    });
}
