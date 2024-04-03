/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchPokemon, getPokemonAbilities } from './pokemonSource.js';
import { resolvePromise } from './resolvePromise.js';

const model = {  
    pokemons: [],
    currentPokemonId: null,  // null means "intentionally empty"
    searchParams: {},
    searchResultsPromiseState: {},
    currentPokemonPromiseState: {},
    abilitiesPromiseState: {},

    setcurrentPokemonId(pokemonId){
        if(pokemonId != this.currentPokemonId){
            resolvePromise(searchPokemon(17 /*pokemonId*/),this.currentPokemonPromiseState);
        }
        this.currentPokemonId= pokemonId;
    },

    getAbilities(){
        resolvePromise(getPokemonAbilities("friend-guard" /*pokemonId*/),this.abilitiesPromiseState);
    },

    setSearchText(name){
        this.searchParams = name;
    },

    doSearch(params){
        //console.log("this.searchResultsPromiseState", this.searchResultsPromiseState)
        resolvePromise(searchPokemon(params), this.searchResultsPromiseState);
    },
    
    // more methods will be added here, don't forget to separate them with comma!
};

export {model};
