import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider, signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child, onValue} from "firebase/database";
import { searchPokemon } from "./pokemonSource";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnKnScjDc7ovrLA-0onOHhJBX8o8IxLBY",
    authDomain: "ddrela-filfor-rodrig-yujingzh.firebaseapp.com",
    databaseURL: "https://ddrela-filfor-rodrig-yujingzh-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ddrela-filfor-rodrig-yujingzh",
    storageBucket: "ddrela-filfor-rodrig-yujingzh.appspot.com",
    messagingSenderId: "379588591673",
    appId: "1:379588591673:web:d82589a970f78108954de8",
    measurementId: "G-2TZ06LVBJG"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const auth = getAuth(app)
const provider = new GoogleAuthProvider();
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutWithGoogle = () => signOut(auth);

const db= getDatabase(app)

const PATH_Pokenmon="pokemons"; //save pokemon comment and like number
const PATH_user="users"; //save users'favorite list and team

function pokemonModelToPersistence(model){
    const pokemonData = {
        pokemonId:model.currentReadPokemonId,
        comments: model.currentPokemonCommentList,//how to save it 
        likeNumber: model.currentPokemonLikeNumber,
    }
    return pokemonData;
}

function userModelToPersistence(objectUser){
    function transformerCB(pokemon){
        return pokemon.id;
    }

    function transformTeamCB(team) {
        function getPokemonId(pokemon) {
            return pokemon.id;
        }
        return {
            teamName: team.teamName,
            pokemons: team.pokemons.map(getPokemonId)
        };
    }

    function transformCommentCB(commentData) {
        function getPokemonId(pokemon) {
            return pokemon.id;
        }
        return {
            comment: commentData.comment,
            pokemon: commentData.pokemon,
            timestamp: commentData.timestamp
        };
    }

    const pokemonFavoriteIds = objectUser.favoriteList.map(transformerCB).sort();
    const userTeams = objectUser.teamsList.map(transformTeamCB).sort();
    const userComments = objectUser.commentList.map(transformCommentCB).sort();
  
    const userData = {
        currentPokemonId: objectUser.currentPokemonId,
        currentSearchName: objectUser.searchParams.name,
        favoriteList: pokemonFavoriteIds,
        currentTeam: objectUser.currentTeam,
        teamsList: userTeams,
        commentList: userComments
    }
    return userData;
}


function persistenceToPokemonModel(pokemondata_from_firebase, model){
    if(!pokemondata_from_firebase || model.currentPokemonId===null){
        model.currentReadPokemonId=model.currentPokemonId;
    }
    else{
        model.currentReadPokemonId=model.currentPokemonId;
        model.currentPokemonCommentList = model.currentPokemonCommentList;
        model.currentPokemonLikeNumber=pokemondata_from_firebase.likeNumber;
    }
    return model;
}

function persistenceToUserModel(userdata_from_firebase, userModel){
    function responseFavoriteACB(response){
        if(response){
            userModel.addToFavoriteList(response);
        }
    }
    function searchPokemonList(id){
        searchPokemon(id).then(responseFavoriteACB);
    }
    function searchPokemonFavorite(id_arrays){
        userModel.favoriteList=[];
        return id_arrays.map(searchPokemonList);
    }

    function responseTeamsACB(response){
        if(response){
            userModel.addToTeamsList(response.teamName,response.response);
        }
    }

    function searchPokemonListforTeams(data){
        const id = data.id;
        const teamName = data.teamName;
        searchPokemon(id).then(response => responseTeamsACB({ response: response, teamName: teamName }));
    }

    function transformTeamCB(team) {
        return {
            teamName: team.teamName,
            pokemons: team.pokemons.map(id => searchPokemonListforTeams({ id: id, teamName: team.teamName }))
        };
    }

    function searchTeams(id_arrays){
        userModel.teamsList=[];
        return id_arrays.map(transformTeamCB);
    }
    
    //user do not exist
    if (!userdata_from_firebase || userdata_from_firebase.currentPokemonId == "undefined" ) {
        userModel.likeNumber = 0;
        userModel.teamsList = [];
        userModel.favoriteList = [];
        userModel.commentList = [];
    }
    else{
        userModel.setcurrentPokemonId(userdata_from_firebase.currentPokemonId);
        userModel.searchParams.name=(userdata_from_firebase.currentSearchName);
        if(!userdata_from_firebase.currentTeam || userdata_from_firebase.currentTeam === 'undefined'){
            console.log("team undefined")
            userModel.currentTeam=[];
        }
        else{
            userModel.currentTeam=userdata_from_firebase.currentTeam;
        }

        if(!userdata_from_firebase.favoriteList || userdata_from_firebase.favoriteList === 'undefined'){
            searchPokemonFavorite([]);
        }
        else{
            searchPokemonFavorite(userdata_from_firebase.favoriteList);
        }
        if(!userdata_from_firebase.teamsList || userdata_from_firebase.teamsList === 'undefined'){
            searchTeams([]);
        }
        else{
            searchTeams(userdata_from_firebase.teamsList);
        }
    }
}

function saveToFirebaseUser(model, uid){
    if(model.ready){
        set(ref(db, PATH_user+"/"+uid), userModelToPersistence(model));
    }
}

function saveToFirebasePokemon(PokenmonModel){
    set(ref(db, PATH_Pokenmon+"/"+PokenmonModel.currentPokemonId), pokemonModelToPersistence(PokenmonModel));//check the model to persistence 
}

function readFromFirebasePokemon(model){
    function convertDataCB(snapshot){
        return persistenceToPokemonModel(snapshot.val(), model);
    }
    if(model.currentPokemonId!==null){
        return get(ref(db, PATH_Pokenmon+"/"+model.currentPokemonId)).then(convertDataCB);
    }
   
}
function readFromFirebaseUser(model, uid){
    model.ready = false;
    function convertDataCB(snapshot){
        return persistenceToUserModel(snapshot.val(),model);
    }

    function changeModelReadyCB(){
        model.doSearch(model.searchParams.name);
        model.ready = true;
    }
    
    return get(ref(db, PATH_user+"/"+uid)).then(convertDataCB).then(changeModelReadyCB);
}

function readCommentsFromFirebase(pokemonId) {
    const commentsRef = ref(db, `pokemons/${pokemonId}/comments`);

    return get(commentsRef).then(snapshot => {
        if (snapshot.exists()) {
            const commentsData = snapshot.val();
            console.log("Comments for Pokemon ID", pokemonId, ":", commentsData);
            return commentsData;
        } else {
            console.log("No comments found for Pokemon ID", pokemonId);
            return [];
        }
    }).catch(error => {
        console.error("Failed to fetch comments:", error);
        throw error;
    });
}

function connectToFirebaseUser(model, watchFunction){
    onAuthStateChanged(auth, loginOutACB);
    function loginOutACB(user){
        if(user!==null){
            model.setUser(user.uid)
            readFromFirebaseUser(model, model.user)
            watchFunction(checkUserACB, effectUserACB);
        }
        else{
            model.setUser(null)
            model.clearModel()
        }
    }

    readFromFirebasePokemon(model)
    watchFunction(checkPokemonChangeACB, effectPokemonChangeACB);
    watchFunction(checkPokemonACB, effectPokemonACB);

    function checkUserACB(){
        return [model.currentPokemonId, model.favoriteList, model.currentTeam,model.teamsList, model.searchParams.name, model.commentList];
    }
    function effectUserACB(){
        if(model.user!==null){
            saveToFirebaseUser(model, model.user)
        }
    }

    function checkPokemonChangeACB(){
        return [model.currentPokemonId];
    }
    function effectPokemonChangeACB(){
        model.clearPokemonModel();
    }

    function checkPokemonACB(){
        if(model.currentPokemonId!==model.currentReadPokemonId){
            readFromFirebasePokemon(model)
        }
        return [model.currentPokemonId, model.currentPokemonLikeNumber, model.currentPokemonCommentList];
    }
    function effectPokemonACB(){
        if(model.currentReadPokemonId!==null && model.currentPokemonId===model.currentReadPokemonId){
            saveToFirebasePokemon(model);
        }
    }
}

export { connectToFirebaseUser, pokemonModelToPersistence, userModelToPersistence, persistenceToUserModel, persistenceToPokemonModel, saveToFirebasePokemon, saveToFirebaseUser, readFromFirebaseUser, readFromFirebasePokemon, readCommentsFromFirebase }