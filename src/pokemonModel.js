/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchPokemon, getPokemonAbilities, getPokemonSpecies, getPaginatedPokemons, getPokemonByName } from './pokemonSource.js';
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
    currentTeam: null,
    commentList: [],
    searchResultsPromiseState: {},
    currentPokemonPromiseState: {},
    abilitiesPromiseState: {},
    speciesPromiseState: {},
    paginationPromiseState: {},

    getPokemonImage(name){
        let promiseState = {};
        resolvePromise(getPokemonByName(name), promiseState);
        return promiseState
    },

    getPaginationPokemons(offSet, limit){
        resolvePromise(getPaginatedPokemons(offSet, limit), this.paginationPromiseState);
        //this.pokemons = this.paginationPromiseState.data
    },

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
        this.currentPokemonLikeNumber++;
    },

    minuscurrentPokemonLikeNumber(){
        if(this.currentPokemonLikeNumber>0){
            this.currentPokemonLikeNumber--;
        }
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

    setSearchText(newName){
        this.searchParams.name = newName;
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
        if(!this.favoriteList.includes(pokemonToAdd)){
            this.favoriteList= [...this.favoriteList, pokemonToAdd];
        }
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
        function isPokemonIDMatch(p) {
            return p.id === pokemon.id;
        }
        const team = this.temporalTeamsList.find(isTeamNameMatch);
        if (!team || !team.pokemons) {
            return false; // Team doesn't exist or team's pokemons array is not defined
        }
        return team.pokemons.some(isPokemonIDMatch); // Returns true if the Pokemon is already in the team
    },

    isTeamNameEmpty(teamName, pokemon){
        return teamName == "";
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
            } else {
                team.pokemons.push(pokemon);
            }
        }
    },

    checkPokemonsLength(teamName,pokemon){
        function isTeamNameMatch(team) {
            return team.teamName === teamName;
        }
        if(this.isPokemonInTeam(teamName, pokemon) == false){
            const team = this.temporalTeamsList.find(isTeamNameMatch);
            if (!team) {
                return false
            } else {
                console.log("true",team.pokemons);
                if(team.pokemons.length >= 4){
                    return true
                }
            }
        }
    },

    setcurrentTeam(team){
        console.log("Team",team);
        if(team != this.currentTeam){
            this.currentTeam = this.teamsList.find(t => t.teamName === team);
        }
    },

    addComment(comment, pokemon, timestamp) {
        this.commentList= [...this.commentList,{comment, pokemon, timestamp}];
    },

    createTeam(){
        this.teamsList = [...this.teamsList,...this.temporalTeamsList];
        this.temporalTeamsList = [];
    },

    isTeamNameInTeam(teamName) {
        function isTeamNameMatch(team) {
            return team.teamName === teamName;
        }
        return this.teamsList.some(isTeamNameMatch);
    },

    resetTemporalList(){
        this.temporalTeamsList = [];
    },

    deleteTeam(teamName){
        const index = this.teamsList.findIndex(t => t.teamName === teamName);
        if (index !== -1) {
            this.teamsList.splice(index, 1); // Remove the team from the teamsList array
        }
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

    removeFromTeam(teamName, pokemonToRemove){
        const teamIndex = this.teamsList.findIndex(team => team.teamName === teamName);

        //If team exists
        if (teamIndex !== -1) {
            const team = this.teamsList[teamIndex];
            const pokemonIndex = team.pokemons.findIndex(pokemon => pokemon === pokemonToRemove);

            if (pokemonIndex !== -1) {
                //Remove the pokemon from the team
                team.pokemons.splice(pokemonIndex, 1);

                //If the team has no more pokemon, remove the team from the list
                if (team.pokemons.length === 0) {
                    this.teamsList.splice(teamIndex, 1);
                }
                return true; //Removed successfully
            } else {
                return false; //Pokemon was not found
            }
        } else {
            return false; //Team was not found
        }
    },

};

export {model};
