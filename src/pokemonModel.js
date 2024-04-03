/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchPokemon } from './pokemonSource.js';
import { getPokemonDetials } from './getPokemon.js';
import { resolvePromise } from './resolvePromise.js';

const model = {  
    pokemons: [],
    currentPokemonId: null,  // null means "intentionally empty"
    searchParams: {},
    queryParams: {},
    searchResultsPromiseState: {},
    currentPokemonPromiseState: {},

    setcurrentPokemonId(pokemonId){
    //setcurrentPokemonId(){
        //if(pokemonId != this.currentPokemonId){
            //getPokemonDetials()
            resolvePromise(getPokemonDetials(),this.currentPokemonPromiseState);
            //console.log("promise:",this.currentPokemonPromiseState);

        //}
        //this.currentPokemonId= pokemonId;
    },

    setSearchText(name){
        this.searchParams.name = name;
    },

    doSearch(params){
        //console.log("this.searchResultsPromiseState", this.searchResultsPromiseState)
        resolvePromise(searchPokemon(params), this.searchResultsPromiseState);
    },
    // more methods will be added here, don't forget to separate them with comma!
    setQueryTypeDefaultOrShiny(queryType){
        this.queryParams.defaultOrShiny = queryType
    }
};

export {model};
