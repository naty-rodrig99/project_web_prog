/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchPokemon, getPokemonAbilities, getPokemonSpecies, getPokemonByName } from './pokemonSource.js';
import { resolvePromise } from './resolvePromise.js';
import axios from 'axios';

const model = {  
    user: null,
    currentPokemonId: null,
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
    showErrorMessage: false,
    emptyTeamName: false,
    showPokemons: false,
    existingTeamName: false,
    showRemovedTeamMsg: false,
    showPopupExperience: false,
    showPopupCaptureRate: false,
    showPopupHappiness: false,
    showPopupGrowthRate: false,
    offset: 0,
    pokemonData: [],

    resetOffset(){
        this.offset = 0;
    },

    setPokemonData(value){
        this.pokemonData = value
    },
    
    loadMorePokemon(setPokemonData){
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${this.offset}`)
            .then(({data}) => {
                const newPokemon = data.results.map(pokemon => pokemon.name);
                setPokemonData(oldData => [
                    ...oldData,
                    ...newPokemon.map(name => ({
                        name: name,
                        img: null
                    }))
                ]);
                Promise.all(data.results.map(({name}) => this.loadImage(name, setPokemonData)));
            })
            this.offset += 10;
    },

    async loadImage(name, setPokemonData){
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemonData(oldData => {
                const newData = [...oldData];
                const index = newData.findIndex(pokemon => pokemon.name === name);
                if (index !== -1){
                    newData[index].img = data.sprites.front_default
                }
                return newData
            })
            
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

    setEmptyTeamName(value){
        this.emptyTeamName=value;
    },

    setShowErrorMessage(value){
        this.showErrorMessage=value;
    },

    setEmptyTeamName(value){
        this.emptyTeamName=value;
    },

    setShowPokemons(value){
        this.showPokemons=value;
    },

    setExistingTeamName(value){
        this.emptyTeamName=value;
    },

    setShowRemovedTeamMsg(value){
        this.showRemovedTeamMsg=value;
    },

    setShowPopupExperience(value){
        this.showPopupExperience=value;
    },

    setShowPopupCaptureRate(value){
        this.showPopupCaptureRate=value;
    },

    setShowPopupHappiness(value){
        this.showPopupHappiness=value;
    },

    setShowPopupGrowthRate(value){
        this.showPopupGrowthRate=value;
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
        this.commentList=[];
    },

    clearPokemonModel(){
        this.currentReadPokemonId = null;
        this.currentPokemonLikeNumber = 0;
        this.commentList = [];
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

    addToCommentList(commentToAdd, pokemonId, timestamp){
        if(!this.commentList.includes(commentToAdd)){
            this.commentList= [...this.commentList, {commentToAdd, pokemonId, timestamp}];
            console.log(commentToAdd, pokemonId, timestamp);
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
                if(team.pokemons.length >= 4){
                    return true
                }
            }
        }
    },

    setcurrentTeam(team){
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

    deleteComment(comment) {
        const index = this.commentList.findIndex(c => c.comment === comment);
        if (index !== -1) {
            this.commentList.splice(index, 1); // Remove the comment from the commentList array
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
