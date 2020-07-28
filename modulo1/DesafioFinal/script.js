let totalUsers = null;
let statics = null;
let personContainer = null;

let genderM = null;
let genderF = null;
let totalAge = null;
let averageAge = null;

let buttonSearch = null;
let fieldSearch = null;

window.addEventListener("load", () => {
    totalUsers = document.querySelector(".usersFound h4");
    statics = document.querySelector(".statics h4");
    personContainer = document.querySelector(".personContainer");

    genderM = document.querySelector("#genderM");
    genderF = document.querySelector("#genderF");
    totalAge = document.querySelector("#totalAge");
    averageAge = document.querySelector("#averageAge");
    buttonSearch = document.querySelector("button");
    fieldSearch = document.querySelector("#fieldSearch");

    api = formatApi();
    runEvents();
});

function runEvents() {
    fieldSearch.addEventListener("keyup", (e) => {
        buttonCheck(e.target.value);
        inputCheck(e);
        fieldSearch.focus();
    });

    buttonSearch.addEventListener("click", (e) => {
        const valueSearch = fieldSearch.value;
        fieldSearch.value = "";
        search(valueSearch);
        fieldSearch.focus();
    });
}

function buttonCheck(value) {
    if (value) {
        buttonSearch.disabled = false;
        buttonSearch.style.backgroundColor = "black";
    } else {
        buttonSearch.disabled = true;
        buttonSearch.style.backgroundColor = "rgb(104, 107, 104)";
    }
}
function inputCheck(e) {
    if (e.key === "Enter" && e.target.value) {
        search(e.target.value);
        e.target.value = "";
        buttonCheck(e.target.value);
    }
}
function renderSummarry(filterItems) {
    function validatorSummary() {
        if (filterItems.length === 0) {
            totalUsers.innerHTML = "Nenhum usuário filtrado";
            personContainer.innerHTML = "";
            return false;
        }
        return true;
    }
    if (validatorSummary()) {
        let usersAvatar = "<div>";

        filterItems.forEach((person) => {
            const { name, age, picture } = person;

            const personHTML = `
            <div class="card-person">
                <div class="card-avatar">
                    <img src="${picture}"/>
                </div>
                <div class="card-content">
                    <p>${name}, ${age} anos</p>
                </div>
            </div>`;

            usersAvatar += personHTML;
            usersAvatar += "</div>";
        });
        personContainer.innerHTML = usersAvatar;
        const totalFound = filterItems.length;
        totalUsers.innerHTML = `${totalFound} usuário(s) encontrado(s)`;
    }
    renderStatics(filterItems);
}
function renderStatics(filterItems) {
    function validatorStatics() {
        if (filterItems.length === 0) {
            statics.innerHTML = "Nada a ser exibido";
            genderM.innerHTML = "";
            genderF.innerHTML = "";
            totalAge.innerHTML = "";
            averageAge.innerHTML = "";
            return false;
        }
        return true;
    }
    if (validatorStatics()) {
        function calculateGenderM() {
            const total = filterItems.filter(
                (person) => person.gender === "male"
            );
            return total.length;
        }

        function calculateGenderF() {
            const total = filterItems.filter(
                (person) => person.gender === "female"
            );
            return total.length;
        }
        function ageSum() {
            const totalAge = filterItems.reduce((acumulator, current) => {
                return acumulator + current.age;
            }, 0);
            return totalAge;
        }
        function average() {
            return (ageSum() / filterItems.length).toFixed(2);
        }

        genderM.innerHTML = `Sexo masculino: ${calculateGenderM()}`;
        genderF.innerHTML = `Sexo feminino: ${calculateGenderF()}`;
        totalAge.innerHTML = `Soma das idades: ${ageSum()}`;
        averageAge.innerHTML = `Média das idades: ${average()}`;
        statics.innerHTML = "Estatísticas";
    }
}
function search(value) {
    let filterItems = api.filter(
        (person) => person.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    filterItems = filterItems.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    renderSummarry(filterItems);
}
function formatApi() {
    const formated = api.map((person) => {
        const { gender } = person;
        const { first, last } = person.name;
        return {
            name: first + " " + last,
            age: person.dob.age,
            gender,
            picture: person.picture.thumbnail,
        };
    });

    return formated;
}
