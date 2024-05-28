const apiKey = "0ac301a9-1fd4-4d82-b10d-450c085d12ff";

const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const options = {
  method: "GET",
  headers: {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
  },
};

const filmsWrapper = document.querySelector(".films");

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function fetchAndRenderFilms() {
  try {
    const data = await fetchData(url + "top", options);
    renderFilms(data.films);
  } catch (err) {
    console.log(err);
  }
}

function renderFilms(films) {
  for (film of films) {
    const html = `
      <div class="card">
          <img src=${film.posterUrlPreview} alt=${film.nameRu} class="card__img" />
          <h3 class="card__title">${film.nameRu}</h3>
          <p class="card__year">${film.year}</p>
          <p class="card__rate">Рейтинг: ${film.rating}</p>
      </div>
      `;
    filmsWrapper.insertAdjacentHTML("beforeend", html);
  }
}

fetchAndRenderFilms();
