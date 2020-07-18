let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener("load", () => {
  tabCountries = document.querySelector("#tabCountries");
  tabFavorites = document.querySelector("#tabFavorites");

  countCountries = document.querySelector("#countCountries");
  countFavorites = document.querySelector("#countFavorites");

  totalPopulationList = document.querySelector("#totalPopulationList");
  totalPopulationFavorites = document.querySelector(
    "#totalPopulationFavorites"
  );

  numberFormat = Intl.NumberFormat("pt-BR");

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode: id, translations, population, flag } = country;
    return {
      id,
      name: translations.pt,
      population,
      flag,
    };
  });

  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();

  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = "<div>";

  allCountries.forEach((country) => {
    const { id, name, population, flag } = country;

    const countryHTML = `
    <div class='country d-flex align-items-center m-3'>
        <div>
            <a id="${id}" class="btn btn-success text-white">+</a>
        </div>
        <div>
           <img class="m-2" src="${flag}" alt="${name}"/>
        </div>
        <div >
            <ul class="align-items-center">
                <li>${name}</li>
                <li>${population}</li>
            </ul>
        </div>
    </div>`;

    countriesHTML += countryHTML;
    countriesHTML += "</div>";
  });
  tabCountries.innerHTML = countriesHTML;
}
function renderFavorites() {
  let favoritesHTML = "<div>";

  favoriteCountries.forEach((country) => {
    const { id, name, population, flag } = country;

    const countryHTML = `
    <div class='country d-flex align-items-center m-3'>
        <div>
            <a id="${id}" class="btn btn-danger text-white">-</a>
        </div>
        <div>
           <img class="m-2" src="${flag}" alt="${name}"/>
        </div>
        <div >
            <ul class="align-items-center">
                <li>${name}</li>
                <li>${population}</li>
            </ul>
        </div>
    </div>`;

    favoritesHTML += countryHTML;
    favoritesHTML += "</div>";
  });
  tabFavorites.innerHTML = favoritesHTML;
}
function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;

  const countPopulation = allCountries.reduce((acumulator, current) => {
    return acumulator + current.population;
  }, 0);

  totalPopulationList.textContent = countPopulation;

  const countPopulationFavorites = favoriteCountries.reduce(
    (acumulator, current) => {
      return acumulator + current.population;
    },
    0
  );

  totalPopulationFavorites.textContent = countPopulationFavorites;
}
function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll(".btn"));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll(".btn"));

  countryButtons.forEach((button) => {
    button.addEventListener("click", () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);
  favoriteCountries = [...favoriteCountries, countryToAdd];
  console.log(favoriteCountries);
}

function removeFromFavorites(id) {}
