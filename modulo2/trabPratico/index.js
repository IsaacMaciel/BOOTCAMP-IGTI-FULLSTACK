const { promises } = require("fs");

const fs = promises;

const readJsonCityState = async () => {
  const arrayCity = JSON.parse(await fs.readFile("Cidades.json"));
  const arrayState = JSON.parse(await fs.readFile("Estados.json"));

  return {
    arrayCity,
    arrayState,
  };
};

const runCities = async () => {
  const { arrayCity, arrayState } = await readJsonCityState();
  arrayState.forEach(async ({ Nome }) => {
    let cityFiltered = arrayCity.filter(
      (city) => parseInt(city.Estado) === parseInt(state.ID)
    );
    await fs.writeFile(`./filtered/${Nome}.json`, JSON.stringify(cityFiltered));
  });
};

// runCities();

const readCityQuantity = async (UF) => {
  const { arrayState } = await readJsonCityState();
  const { Sigla, Nome } = arrayState.find((element) => element.Sigla === UF);
  const data = JSON.parse(await fs.readFile(`./filtered/${Nome}.json`));
  return data.length;
};

const readCityForUF = async (UF) => {
  const { arrayState } = await readJsonCityState();
  const { Nome } = arrayState.find((element) => element.Sigla === UF);
  const data = JSON.parse(await fs.readFile(`./filtered/${Nome}.json`));
  return data;
};

const topFive = async (option) => {
  let arrayStateCityQuantity = [];

  const { arrayState } = await readJsonCityState();

  for (const { Sigla } of arrayState) {
    const quantity = await readCityQuantity(Sigla);
    arrayStateCityQuantity = [
      ...arrayStateCityQuantity,
      { UF: Sigla, QtdCidades: quantity },
    ];
  }

  arrayStateCityQuantity = arrayStateCityQuantity
    .sort((a, b) => {
      if (option == "More") {
        return b.QtdCidades - a.QtdCidades;
      } else {
        return a.QtdCidades - b.QtdCidades;
      }
    })
    .slice(0, 5);
  option
    ? console.log(arrayStateCityQuantity)
    : console.log(arrayStateCityQuantity.reverse());
};
const stringCity = async (option) => {
  const { arrayCity, arrayState } = await readJsonCityState();

  let cityString = null;
  let state = null;

  const orderedCity = arrayCity
    .map((city) => {
      return {
        ...city,
        nameLenght: city.Nome.length,
      };
    })
    .sort();

  cityString = orderedCity
    .sort((a, b) => {
      if (option === "More") {
        return b.nameLenght - a.nameLenght;
      }
      return a.nameLenght - b.nameLenght;
    })
    .slice(0,100);
    cityString.sort((a,b) => {
        return a.Nome.localeCompare(b.Nome)
    })

  state = arrayState.find(({ ID }) => ID === cityString[0].Estado);

console.log(`${cityString[0].Nome} -  ${state.Sigla}`);


};

const largeCityForUf = async (option) => {
  const { arrayState } = await readJsonCityState();
  let largeCities = [];
  let largeCitiesFormatted = [];
  let stringArray = "";

  for (const { Sigla } of arrayState) {
    let stringCity = [];
    const cityArray = await readCityForUF(Sigla);
    const orderedCity = cityArray
      .map((city) => {
        return {
          ...city,
          nameLenght: city.Nome.length,
        };
      })
      .sort();

    stringCity = orderedCity
      .sort((a, b) => {
        if (option === "More") {
          return b.nameLenght - a.nameLenght;
        }
        return a.nameLenght - b.nameLenght;
      })
      .slice(0, 1);

    largeCities.push(stringCity);
  }
  largeCitiesFormatted = largeCities.map((city) => {
    for (const state of arrayState) {
      if (state.ID === city[0].Estado) {
        return `${city[0].Nome} - ${state.Sigla}`;
      }
    }
  });

  console.log(largeCitiesFormatted);
};

// largeCityForUf();
// largeCityForUf("More");
largeCityForUf();

// topFive();
// topFive();
// moreStringCity();

// stringCity();
// stringCity();
