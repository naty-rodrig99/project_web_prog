//import { BASE_URL } from './apiConfig.js';
const BASE_URL = 'https://pokeapi.co/api/v2';
import axios from "axios";

export function searchPokemon(searchParams){
    //console.log("searchParams", searchParams)
    const URL = `${BASE_URL}/pokemon/${searchParams}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
            'Access-Control-Allow-Credentials': 'true'
        }
    };
    if (searchParams.length === 0){
        console.log("Empty search paramater --> (Object.entries(searchParams).length === 0)")
    }
    else{
        return fetch(URL).then(gotResponseACB).then(someACB);
    }

    //aynchronous callback to handle response
    function gotResponseACB(response) {
        if (!response.ok) {
            throw new Error('No Pokémon that matches your search string was found. Try using the full Pokémon name or its pokedex number.');
        }
        const result = response.json();
        //console.log("json", result)
        return result;
    } 

    function someACB(objectResponse){
        //console.log("results", objectResponse)
        return objectResponse; 
    }
}

export function loadPaginationPokemon(offset, setPokemonData){
    axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
    .then(({data}) => {
        const newPokemon = data.results.map(pokemon => pokemon.name);
        setPokemonData(oldData => [
            ...oldData,
            ...newPokemon.map(name => ({
                name: name,
                img: null
            }))
        ]);
        Promise.all(data.results.map(({name}) => loadImage(name, setPokemonData)));
    })
}

async function loadImage(name, setPokemonData){
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonData(oldData => {
            const newData = [...oldData];
            const index = newData.findIndex(pokemon => pokemon.name === name);
            if (index !== -1){
                newData[index].img = data.sprites.front_default
            }
            return newData
        })
        
}

export function getPokemonByName(name){
        //console.log("searchParams", searchParams)
        const URL = `${BASE_URL}/pokemon/${name}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
                'Access-Control-Allow-Credentials': 'true'
            }
        };

        return fetch(URL).then(gotResponseACB).then(someACB);
        
    
        //aynchronous callback to handle response
        function gotResponseACB(response) {
            if (!response.ok) {
                throw new Error('not ok');
            }
            const result = response.json();
            //console.log("json", result)
            return result;
        } 
    
        function someACB(objectResponse){
            //console.log("results", objectResponse)
            return objectResponse; 
        }
}

export function getPokemonAbilities(abilityName){
    //console.log("searchParams", abilityName)
    const URL = `${BASE_URL}/ability/${abilityName}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
            'Access-Control-Allow-Credentials': 'true'
        }
    };

    return fetch(URL).then(gotResponseACB).then(someACB);

    function gotResponseACB(response) {
        if (!response.ok) {
            throw new Error('not ok');
        }
        const result = response.json();
        //console.log("ability", result)
        return result;
    } 

    function someACB(objectResponse){
        return objectResponse; 
    }
}

export function getPokemonSpecies(pokemonName){
    //console.log("searchParams", pokemonName)
    const URL = `${BASE_URL}/pokemon-species/${pokemonName}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
            'Access-Control-Allow-Credentials': 'true'
        }
    };

    return fetch(URL).then(gotResponseACB).then(someACB);

    function gotResponseACB(response) {
        if (!response.ok) {
            throw new Error('not ok');
        }
        const result = response.json();
        return result;
    } 

    function someACB(objectResponse){
        return objectResponse; 
    }
}