//import { BASE_URL } from './apiConfig.js';
const BASE_URL = 'https://pokeapi.co/api/v2';

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

export function getPaginatedPokemons(offSet, limit){
    const URL = `${BASE_URL}/pokemon/?offset=${offSet}&Limit=${limit}`;
    return fetch(URL).then(gotResonseACB).then(returnObjectACB)

    function gotResonseACB(response){
        if (!response.ok) {
            throw new Error('not ok');
        }
        const result = response.json();
        //console.log("response", result)
        return result;
    }

    function returnObjectACB(objectResponse){
        //console.log("objectResponse", objectResponse)
        return objectResponse
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