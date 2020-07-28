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
        await fs.writeFile(
            `./filtered/${Nome}.json`,
            JSON.stringify(cityFiltered)
        );
    });
};

// runCities();

const readCity = async (UF) => {
    const { arrayState } = await readJsonCityState();
    const { Sigla, Nome } = arrayState.find((element) => element.Sigla === UF);
    const data = JSON.parse(await fs.readFile(`./filtered/${Nome}.json`));
    return data.length;
};

const topFive = async (option) => {
    let arrayStateCityQuantity = [];

    const { arrayState } = await readJsonCityState();

    for (const { Sigla } of arrayState) {
        const quantity = await readCity(Sigla);
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

    console.log(arrayStateCityQuantity);
};

const moreStringCity = async () => {
    let cities = [];
    const { arrayState } = await readJsonCityState();
    for (const { Nome } of arrayState) {
        let moreString = [];
        cities = JSON.parse(await fs.readFile(`./filtered/${Nome}.json`));
        moreString = cities
            .sort((a, b) => {
                return a.Nome.localeCompare(b.Nome);
            })
            .slice(0, 1);

        cities = [...cities, moreString];
    }

    console.log(cities);
};

// topFive("More");
// topFive();
moreStringCity();
