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
  arrayState.forEach(async (state) => {
    let name = state.Nome;

    let cityFiltered = arrayCity.filter(
      (city) => parseInt(city.Estado) === parseInt(state.ID)
    );
    await fs.writeFile(`./filtered/${name}.json`, JSON.stringify(cityFiltered));
  });
};

// runCities();

const readCity = async (UF) => {
  const { arrayState } = await readJsonCityState();
  const { Sigla, Nome } = arrayState.find((element) => element.Sigla === UF);
  const data = await JSON.parse(await fs.readFile(`./filtered/${Nome}.json`));
  return data.length;
};

const topFiveStateMoreCity = async () => {
  const { arrayCity, arrayState } = await readJsonCityState();
  const numberCity = [];

  arrayState.forEach(async ({ Sigla, Nome }) => {
    const quantidade = await readCity(Sigla);
    numberCity[{'Estado': Sigla, 'Quantidade': quantidade}]
  });
  console.log(numberCity);
};

topFiveStateMoreCity();
