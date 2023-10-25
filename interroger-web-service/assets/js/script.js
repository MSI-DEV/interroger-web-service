console.log("Script chargé !")
import monJson from '../../data.json' assert {type: 'json'};
console.log("Mon JSON : ", monJson);
const resultAjax = await ajaxTest('https://pokeapi.co/api/v2/pokemon?limit=1292');
console.log("Résultat via Ajax - nécéssite une promesse explicite: ", resultAjax);
function ajaxTest (url) {
    return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Abandon :( Impossible de créer une instance de XMLHTTP');
        return false;
    }
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                return resolve(JSON.parse(this.response));
            }
        }
    };
    xhr.send();
    });
}
// Méthode avec axios

let datasAxios = await axiosTest();
console.log("Datas via Axios : ", datasAxios);
async function axiosTest () {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1292");
    return response.data;
}
// / Idem avec une promesse explicite :
let datasAxiosBis = await axiosTestAvecPromesseExplicite();
console.log("Datas via Axios et une promesse explicite: ", datasAxiosBis.data);
function axiosTestAvecPromesseExplicite () {
    return new Promise((resolve) => {
        return resolve(axios.get("data.json"));
    });
}

// Méthode avec fetch
let dataFetch;
const urlApi = "https://pokeapi.co/api/v2/pokemon?limit=1292";
await getDataFetch();
async function getDataFetch () {
    const res = await fetch(urlApi);
    dataFetch = await res.json();
}
let dataFetchBis;
await getDataFetchBis();
console.log("Voici les données via fetch: ", dataFetchBis);

async function getDataFetchBis () {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1292", {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            
        }
    });
    dataFetchBis = await res.json();
}
// Idem avec une promesse explicite :
let dataFetchTer = await getDataAvecPromesseExplicite();
console.log("Voici les données via fetch avec promesse explicite: ", dataFetchTer);

function getDataAvecPromesseExplicite () {
    return new Promise((resolve) => {
        return resolve(
            fetch("https://pokeapi.co/api/v2/pokemon?limit=1292", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
            }).then(function(response) {
                return response.json();
            })
        );
    });
}
const getPokemons = async () => {
    try{
        const reponse = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100");
        const pokemons = await reponse.json();
        return pokemons;
    } catch (error){
        console.log("Echec de la récupération de la liste des pokemons");
    }
}
const displayPokemons = async () => {
    const pokemons = await getPokemons();
    console.log("Pokemons : ", pokemons);
}

displayPokemons();


let monTableauPokemons = document.createElement("table");
        document.body.appendChild(monTableauPokemons);

for (let i = 0; i<= 5; i++){
        let maLigne = document.createElement("tr")
        monTableauPokemons.appendChild(maLigne)
    for(let j = 0; j<= 1; j++){
        let maCellule;
        maCellule = document.createElement("td");
        if (j==0) {
            maCellule.innerText = dataFetch.results[i].name;
        } else {
            maCellule.innerText = dataFetch.results[j].url;
        }
        maLigne.appendChild(maCellule);
   }
}




