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
const loader = document.querySelector(".loader-wrapper");
const btnShowMore = document.querySelector(".show-more");
btnShowMore.onclick = fetchAndRenderFilms;

let page = 1;

async function fetchAndRenderFilms() {
  try {
    loader.classList.remove("none");

    const data = await fetchData(url + `top?page=${page}`, options);
    if (data.pagesCount > 1) page++;

    if (data.pagesCount > 1) btnShowMore.classList.remove("none");

    loader.classList.add("none");

    renderFilms(data.films);

    if (page > data.pagesCount) btnShowMore.classList.add("none");
  } catch (err) {
    console.log(err);
  }
}

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

function renderFilms(films) {
  for (film of films) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = film.filmId;

    card.onclick = openFilmDetails;
    const html = `
        <img src=${film.posterUrlPreview} alt=${film.nameRu} class="card__img" />
        <h3 class="card__title">${film.nameRu}</h3>
        <p class="card__year">${film.year}</p>
        <p class="card__rate">Рейтинг: ${film.rating}</p>
      `;
    card.insertAdjacentHTML("afterbegin", html);

    filmsWrapper.insertAdjacentElement("beforeend", card);
  }
}

async function openFilmDetails(e) {
  const id = e.currentTarget.id;
  const data = await fetchData(url + id, options);

  renderFilmData(data);
}

function renderFilmData(film) {
  const prevContainer = document.querySelector(".container-right");
  prevContainer ? prevContainer.remove() : "";

  const containerRight = document.createElement("div");
  containerRight.classList.add("container-right");
  document.body.insertAdjacentElement("beforeend", containerRight);

  const btnClose = document.createElement("button");
  btnClose.classList.add("btn-close");
  btnClose.innerHTML = '<img src="img/cross.svg" alt="Close" width="24" />';
  containerRight.insertAdjacentElement("afterbegin", btnClose);

  btnClose.onclick = () => {
    containerRight.remove();
  };

  const html = `
  <div class="film">
    <div class="film__title">${film.nameRu}</div>

    <div class="film__img">
      <img src=${film.posterUrl} alt=${film.nameRu} />
    </div>

    <div class="film__desc">
      <p class="film__details">Год: ${film.year}</p>
      <p class="film__details">Рейтинг: ${film.ratingKinopoisk}</p>
      <p class="film__details">Продолжительность: ${film.filmLength}</p>
      <p class="film__details">Страна: ${film.countries[0]["country"]}</p>
      <p class="film__text">${film.description}</p>
    </div>
  </div>
  `;

  containerRight.insertAdjacentHTML("beforeend", html);
}

fetchAndRenderFilms();
