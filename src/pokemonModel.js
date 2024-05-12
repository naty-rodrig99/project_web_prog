/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchPokemon, getPokemonAbilities, getPokemonSpecies, getPaginatedPokemons } from './pokemonSource.js';
import { resolvePromise } from './resolvePromise.js';


const model = {  
    user: null,
    currentPokemonId: null, 
    //currentReadPokemon: [null, 0, []], //pokemon Id, Like number, Comment List
    currentReadPokemonId: null,
    currentPokemonLikeNumber: 0,
    currentPokemonCommentList: [],
    searchParams: {},
    queryParams: {},
    favoriteList:[],
    teamsList: [],
    temporalTeamsList: [],
    commentList: [],
    // favoriteList:[],
    //team: [],
    searchResultsPromiseState: {},
    currentPokemonPromiseState: {},
    abilitiesPromiseState: {},
    speciesPromiseState: {},
    paginationPromiseState: {},

    setUser(user){
        this.user=user;
    },

    setcurrentReadPokemon(id){
        this.currentReadPokemon[0]= id;
        this.currentReadPokemon.pokemonId=id;

    },
    setcurrentReadPokemonId(id){
        this.currentReadPokemonId= id;
    },

    setcurrentPokemonlikeNumber(number){
        this.currentPokemonLikeNumber= number;
    },

    addcurrentPokemonLikeNumber(){
        //console.log("before add: ", this.likeNumber);
        this.currentPokemonLikeNumber++;
        //this.currentReadPokemon[1]++;
        //console.log("after add: ", this.currentPokemonLikeNumber);
    },

    minuscurrentPokemonLikeNumber(){
        if(this.currentPokemonLikeNumber>0){
            this.currentPokemonLikeNumber--;
        }
        // this.currentPokemonLikeNumber--;
    },

    clearModel(){
        this.user=null;
        this.currentPokemonId=null;
        this.currentReadPokemonId=null;
        this.favoriteList=[];
        this.teamsList=[];
        this.commentList=[];
        this.searchParams={};
        this.queryParams={};
        this.currentPokemonLikeNumber=0;
        this.currentPokemonCommentList=[];
    },

    clearPokemonModel(){
        this.currentReadPokemonId = null;
        this.currentPokemonLikeNumber = 0;
        this.currentPokemonCommentList = [];
    },

    setcurrentPokemonId(pokemonId){
        if(pokemonId != this.currentPokemonId){
            resolvePromise(searchPokemon(pokemonId),this.currentPokemonPromiseState);
            resolvePromise(getPokemonAbilities(pokemonId),this.abilitiesPromiseState);
            resolvePromise(getPokemonSpecies(pokemonId),this.speciesPromiseState);
        }
        this.currentPokemonId = pokemonId;
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

    getPaginationPokemons(page){
        resolvePromise(getPaginatedPokemons(page), this.paginationPromiseState)
        console.log("from model", this.paginationPromiseState)
    },

    doSearch(params){
        if(Number.isInteger(params)){
            params=params.toString()
        }
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
        if(!this.favoriteList.includes(pokemonToAdd)){
            this.favoriteList= [...this.favoriteList, pokemonToAdd];
        }
        //console.log("Current the favorite list is: ", this.favoriteList);
    },

    removeFromFavoriteList(pokemonToRemove){
        function shouldWeKeepFavoritePokemonCB(pokemon){
            return (pokemon.id!==pokemonToRemove.id);
        }
        this.favoriteList = this.favoriteList.filter(shouldWeKeepFavoritePokemonCB);
    },

    isPokemonInTeam(teamName, pokemon) {
        function isTeamNameMatch(team) {
            return team.teamName === teamName;
        }
        const team = this.temporalTeamsList.find(isTeamNameMatch);
        if (!team || !team.pokemon || !team.pokemon.includes(pokemon)) {
            return false;
        }
        return true;
    },

    addTemporalTeam(teamName, pokemon) {
        function isTeamNameMatch(team) {
            return team.teamName === teamName;
        }
        if(this.isPokemonInTeam(teamName, pokemon) == false){
            const team = this.temporalTeamsList.find(isTeamNameMatch);
            // If the team doesn't exist, create a new team
            if (!team) {
                this.temporalTeamsList= [...this.temporalTeamsList,{teamName, pokemons: [pokemon]}];
                //console.log("CREATING NEW",teamName,pokemon);
                //this.teamsList.push({ teamName, pokemons: [pokemon] });
                //console.log("LIST",this.temporalTeamsList[0]);
            } else {
                // If the team already exists, add the Pokemon;
                team.pokemons.push(pokemon);
            }
        }
    },

    addComment(comment, pokemon, timestamp) {
        this.commentList= [...this.commentList,{comment, pokemon, timestamp}];
    },

    createTeam(){
        //this.teamsList = [...this.teamsList,this.temporalTeamsList];
        this.teamsList = [...this.teamsList,...this.temporalTeamsList];
        this.temporalTeamsList = [];
        //console.log("NEW",this.teamsList);
    },

    addToTeamsList(teamName, pokemon){
        function isTeamNameMatch(team) {
            return team.teamName === teamName;
        }
        if(this.isPokemonInTeam(teamName, pokemon) == false){
            const team = this.teamsList.find(isTeamNameMatch);
            // If the team doesn't exist, create a new team
            if (!team) {
                this.teamsList= [...this.teamsList,{teamName, pokemons: [pokemon]}];
            } else {
                team.pokemons.push(pokemon); // If the team already exists, add the Pokemon;
            }
        } 
    },

};

// const PokenmonModel = {
//     pokemonId: null,
//     likeNumber: 0,
//     commentList: [],

//     setPokemonId(pokemonId){
//         this.pokemonId= pokemonId;
//     },

//     setlikeNumber(number){
//         this.likeNumber= number;
//     },

//     addLikeNumber(){
//         //console.log("before add: ", this.likeNumber);
//         this.likeNumber++;
//         //console.log("after add: ", this.likeNumber);
//     },

//     minusLikeNumber(){
//         this.likeNumber--;
//     },

//     addToCommentList(comment){
//         // array spread syntax example. Make sure you understand the code below.
//         // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
//         this.commentList= [...this.commentList, comment];
//         //console.log("Current the favorite list is: ", this.favoriteList);
//     },

// };

export {model};
