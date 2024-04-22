import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getDatabase, ref, get, set, child, onValue} from "firebase/database";
import { searchPokemon } from "./pokemonSource";
import { useReducer } from "react";
import { useMatch } from "react-router-dom";

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
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};

const db= getDatabase(app)

const PATH_Pokenmon="pokemons"; //save pokemon comment and like number
const PATH_user="users/yujingzh"; //save users'favorite list and team

// set(ref(db, PATH1), "pokemon1");
// set(ref(db, PATH2), "user1");

function pokemonModelToPersistence(objectPokemon){
    const pokemonData = {
        pokemonId:objectPokemon.pokemonId,
        comments: objectPokemon.commentList,
        likeNumber: objectPokemon.likeNumber
    }
    //console.log("pokemonData", pokemonData);
    return pokemonData;
}

function userModelToPersistence(objectUser){
    function transformerCB(pokemon){
        return pokemon.id;
    }
    
    //const pokemonTeamIds = objectUser.team.map(transformerCB).sort();
    const pokemonFavoriteIds = objectUser.favoriteList.map(transformerCB).sort();
    //console.log("pokemonFavoriteIds", pokemonFavoriteIds);
    const userData = {
        //userId: objectUser.currentId,
        currentPokemonId: objectUser.currentPokemonId,
        favoriteList: pokemonFavoriteIds,
        //team: pokemonTeamIds
    }
    return userData;
}


function persistenceToPokemonModel(pokemondata_from_firebase, pokenmonModel, id){
    //console.log("pokemondata_from_firebase", pokemondata_from_firebase);
    if(!pokemondata_from_firebase || pokenmonModel.likeNumber==NaN){
        //console.log("no!!! pokenmonModel id: ");
        pokenmonModel.setPokemonId(id);
        pokenmonModel.commentList = [];
        pokenmonModel.likeNumber = 0;
    }
    else{
        //console.log("pokenmonModel !!! id: ", pokemondata_from_firebase);
        pokenmonModel.setPokemonId(pokemondata_from_firebase.pokemonId);
        pokenmonModel.commentList = [];
        pokenmonModel.likeNumber = pokemondata_from_firebase.likeNumber;
    }
    //console.log("pokenmonModel after: ", pokemondata_from_firebase);
    return pokenmonModel;
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
        id_arrays.map(searchPokemon);
        return id_arrays.map(searchPokemonList);
        // return searchPokemon().then(responseFavoriteACB);
    }
    //user do not exist
    if (!userdata_from_firebase) {
        userModel.team = [];
        userModel.favoriteList = [];
        userModel.currentPokemonId=null;
    }
    else{
        userModel.setcurrentPokemonId(userdata_from_firebase.currentPokemonId);

        if(!userdata_from_firebase.favoriteList || userdata_from_firebase.favoriteList === 'undefined'){
            return searchPokemonFavorite([]);
        }
        else{
            //console.log("userdata_from_firebase.favoriteList", userdata_from_firebase.favoriteList);
            return searchPokemonFavorite(userdata_from_firebase.favoriteList);
        }
    }
}

function saveToFirebaseUser(model){
    if(model.ready){
        //console.log("saveToFirebaseUser", model);
        set(ref(db, PATH_user), userModelToPersistence(model));
    }
}

function saveToFirebasePokemon(model, id){
    if(model.ready){
        //console.log("model.pokemonId", model.pokemonId);
        set(ref(db, PATH_Pokenmon+"/"+id), pokemonModelToPersistence(model));
    }
}

function readFromFirebasePokemon(model, id){
    //console.log("readFromFirebasePokemon", model);
    //console.log("id", id);
    model.ready = false;

    function convertDataCB(snapshot){
        return persistenceToPokemonModel(snapshot.val(), model, id);
    }

    function changeModelReadyCB(){
        //console.log("readFromFirebasePokemon", model);
        model.ready = true;
    }
    
    return get(ref(db, PATH_Pokenmon+"/"+id)).then(convertDataCB).then(changeModelReadyCB);
}
function readFromFirebaseUser(model){
    model.ready = false;

    function convertDataCB(snapshot){
        //console.log("snapshot", snapshot.val());
        return persistenceToUserModel(snapshot.val(),model);
    }

    function changeModelReadyCB(){
        model.ready = true;
    }
    
    return get(ref(db, PATH_user)).then(convertDataCB).then(changeModelReadyCB);
}
function connectToFirebaseUser(model, watchFunction){
    readFromFirebaseUser(model)
    function checkACB(){
        //console.log("checking");
        //console.log("current model11", model);
        return [model.currentPokemonId, model.favoriteList, model.team];
    }
    function effectACB(){
        saveToFirebaseUser(model)
        //console.log("current model", model);
        //console.log("side effect triggred: save to firebase!")
    }
    watchFunction(checkACB, effectACB);
}

function connectToFirebasePokemon(pokemonModel, id, watchFunction){
    readFromFirebasePokemon(pokemonModel, id)
    function checkACB(){
        //console.log("checking pokemonModel");
        return [pokemonModel.commentList, pokemonModel.likeNumber, pokemonModel.pokemonId];
    }
    function effectACB(){
        saveToFirebasePokemon(pokemonModel, pokemonModel.pokemonId)
        //console.log("side effect triggred: save to firebase pokemonModel! ")
    }
    watchFunction(checkACB, effectACB);
}


// Remember to uncomment the following line:
export { connectToFirebaseUser, connectToFirebasePokemon, pokemonModelToPersistence, userModelToPersistence, persistenceToUserModel, persistenceToPokemonModel, saveToFirebasePokemon, saveToFirebaseUser, readFromFirebaseUser, readFromFirebasePokemon }
