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
    //team: [],
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
        resolvePromise(searchPokemon(params.toLowerCase()), this.searchResultsPromiseState);
    },
    setQueryTypeDefaultOrShiny(queryType){
        this.queryParams.defaultOrShiny = queryType
    },

    setQueryPokemonGameVersion(queryGameVersion){
        this.queryParams.gameVersion = queryGameVersion
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

const PokenmonModel = {
    pokemonId: null,
    likeNumber: 0,
    commentList: [],

    setPokemonId(pokemonId){
        this.pokemonId= pokemonId;
    },

    setlikeNumber(number){
        this.likeNumber= number;
    },

    addLikeNumber(){
        //console.log("before add: ", this.likeNumber);
        this.likeNumber++;
        //console.log("after add: ", this.likeNumber);
    },

    minusLikeNumber(){
        this.likeNumber--;
    },

    addToCommentList(comment){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.commentList= [...this.commentList, comment];
        //console.log("Current the favorite list is: ", this.favoriteList);
    },

};

export {model, PokenmonModel};
