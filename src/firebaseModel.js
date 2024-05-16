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
        comments: model.currentPokemonCommentList,
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
        model.currentPokemonCommentList = pokemondata_from_firebase.comments || [];
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

    function responseCommentACB(response){
        if(response){
            userModel.addToCommentList(response.comment,response.pokemon,response.timestamp);
            console.log(response, "response");
        }
    }

    function responseTeamsACB(response) {
        if (response) {
            userModel.addToTeamsList(response.teamName, response.response);
        }
    }

    function searchPokemonCommentList(data){
        searchPokemon(data.pokemon).then(pokemonResult => responseCommentACB({ comment: data.comment, pokemon: pokemonResult, timestamp:data.timestamp }));
        //searchPokemon(data.pokemon).then(responseCommentACB);
        console.log(data, "printing id");
    }

    function searchPokemonList(id) {
        searchPokemon(id).then(responseFavoriteACB);
    }

    function searchPokemonListforTeams(data) {
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

    function searchPokemonFavorite(id_arrays) {
        userModel.favoriteList = [];
        id_arrays.forEach(searchPokemonList);
    }

    function searchPokemonComment(id_arrays){
        userModel.commentList=[];
        console.log(id_arrays, "prt array");
        return id_arrays.map(searchPokemonCommentList);
    }

    function searchTeams(id_arrays) {
        userModel.teamsList = [];
        id_arrays.forEach(transformTeamCB);
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
        if(!userdata_from_firebase.commentList || userdata_from_firebase.commentList === 'undefined'){
            console.log(userdata_from_firebase.commentList, "hellooooo");
            searchPokemonComment([]);
        }
        else{
            console.log(userdata_from_firebase.commentList, "hey");
            searchPokemonComment(userdata_from_firebase.commentList);
        }
        //userModel.commentList = userdata_from_firebase.commentList || [];
    }
}

function saveToFirebaseUser(model, uid){
    if(model.ready){
        set(ref(db, PATH_user+"/"+uid), userModelToPersistence(model));
    }
}

function saveToFirebasePokemon(userId, PokenmonModel) {
    const pokemonData = {
        comments: PokenmonModel.currentPokemonCommentList,
        likeNumber: PokenmonModel.currentPokemonLikeNumber
    };
    set(ref(db, `users/${userId}/commentList`), pokemonData);
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

function readCommentsFromFirebase(userId, pokemonId) {
    const commentsRef = ref(db, `users/${userId}/commentList`);

    return get(commentsRef).then(snapshot => {
        if (snapshot.exists()) {
            const commentsData = snapshot.val();
            const filteredComments = Object.values(commentsData).filter(comment => comment.pokemon === pokemonId);
            console.log("Comments for user ID", userId, ":", filteredComments);
            return filteredComments;
        } else {
            console.log("No comments found for user ID", userId);
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
        return [model.currentPokemonId, model.favoriteList, model.teamsList, model.searchParams.name, model.commentList];
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