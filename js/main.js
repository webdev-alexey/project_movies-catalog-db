const apiKey = "0ac301a9-1fd4-4d82-b10d-450c085d12ff";

const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const options = {
  method: "GET",
  headers: {
    "X-API-KEY": apiKey,
    "Content-Type": "application/json",
  },
};

// fetch(url + "top", options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.log(err));

const filmsWrapper = document.querySelector(".films");

async function fetchAndRenderFilms() {
  try {
    const response = await fetch(url + "top", options);
    const data = await response.json();

    for (film of data.films) {
      console.timeLog(film);
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
  } catch (err) {
    console.log(err);
  }
}

fetchAndRenderFilms();
