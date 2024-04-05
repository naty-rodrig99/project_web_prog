/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchPokemon, getPokemonAbilities, getPokemonSpecies } from './pokemonSource.js';
import { resolvePromise } from './resolvePromise.js';

const model = {  
    pokemons: [],
    currentPokemonId: null,  // null means "intentionally empty"
    searchParams: {},
    queryParams: {},
    favoriteList:[],
    searchResultsPromiseState: {},
    currentPokemonPromiseState: {},
    abilitiesPromiseState: {},
    speciesPromiseState: {},

    setcurrentPokemonId(pokemonId){
        if(pokemonId != this.currentPokemonId){
            resolvePromise(searchPokemon(pokemonId),this.currentPokemonPromiseState);
            resolvePromise(getPokemonAbilities(pokemonId),this.abilitiesPromiseState);
            resolvePromise(getPokemonSpecies(pokemonId),this.speciesPromiseState);
        }
        this.currentPokemonId= pokemonId;
    },

    getAbilities(){
        resolvePromise(getPokemonAbilities(pokemonId),this.abilitiesPromiseState);
    },

    getSpecies(pokemonId){
        resolvePromise(getPokemonSpecies(pokemonId),this.speciesPromiseState);
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
    },

    addToFavoriteList(pokemonToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.favoriteList= [...this.favoriteList, pokemonToAdd];
        //console.log("Current the favorite list is: ", this.favoriteList);
    },

    // filter callback exercise
    removeFromFavoriteList(pokemonToAdd){
        function shouldWeKeepDishCB(pokemon){
            if(pokemon.id===pokemonToAdd.id){
                return false
            }
            else{
                return true
            }
        }
        this.favoriteList= this.favoriteList.filter(shouldWeKeepDishCB);
    },

};

export {model};
