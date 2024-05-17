/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchPokemon, getPokemonAbilities, getPokemonSpecies, getPokemonByName } from './pokemonSource.js';
import { resolvePromise } from './resolvePromise.js';
import { reaction } from "mobx";
import { readCommentsFromFirebase, writeCommentToFirebase } from './firebaseModel.js';
import axios from 'axios';

const model = {  
    user: null,
    currentPokemonId: null,
    currentReadPokemonId: null,
    currentPokemonLikeNumber: 0,
    //currentPokemonCommentList: [],
    searchParams: {},
    queryParams: {},
    favoriteList:[],
    teamsList: [],
    temporalTeamsList: [],
    //temporalCommentList: [],
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

    fetchComments() {
        if (this.currentPokemonId) {
            readCommentsFromFirebase(this.user.id, this.currentPokemonId)//issue
                //console.log(this.user.id, this.currentPokemonId)
                .then(comments => {
                    if(this.commentList){

                        this.commentList = comments;//here
                    }                
                })
                .catch(error => console.error("Error fetching comments: ", error));
        }
    },
    
    writeComment(commentText) {
        if (this.currentPokemonId) {
            writeCommentToFirebase(this.user.id, this.currentPokemonId, commentText)
                .then(() => {
                    console.log("Comment successfully written!");
                    // Optionally, fetch the updated comments list
                    this.fetchComments();
                })
                .catch(error => console.error("Error writing comment: ", error));
        }
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
        console.log("addcommentmodel")
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

// function watchOrReaction(checkCB, effectCB, interval = 1000) {
//     let lastCheck = checkCB();
//     setInterval(() => {
//         const currentCheck = checkCB();
//         if (JSON.stringify(lastCheck) !== JSON.stringify(currentCheck)) {
//             lastCheck = currentCheck;
//             effectCB();
//         }
//     }, interval);
// }

function checkPokemonIdChangeACB() {
    return model.currentPokemonId; //pokemon list 
}

function sideEffectFetchCommentsACB() {
    if (model.user) {
        readCommentsFromFirebase(model.user, model.currentPokemonId)
            .then(comments => {
                model.commentList = comments;
            })
            .catch(error => console.error("Error fetching comments: ", error));
    }
}

function checkCommentListChangeACB() {
    return model.commentList; //pokemon list 
}

function sideEffectWriteCommentsACB(newComment) {
    if (model.user) {
        writeCommentToFirebase(model.user, model.currentPokemonId, newComment)
            .then(() => {
                console.log("Comment successfully written!");
            })
            .catch(error => console.error("Error writing comment: ", error));
    }
}




function initializeSideEffects() {
    reaction(checkPokemonIdChangeACB, sideEffectFetchCommentsACB);
    reaction(checkCommentListChangeACB, sideEffectWriteCommentsACB);
}

initializeSideEffects();

export {model, initializeSideEffects};
