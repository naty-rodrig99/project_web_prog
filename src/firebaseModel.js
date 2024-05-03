import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider, signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child, onValue} from "firebase/database";
import { searchPokemon } from "./pokemonSource";
import { useReducer } from "react";
import { useMatch } from "react-router-dom";
import {model} from "./pokemonModel"

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

function pokemonModelToPersistence(objectPokemon){
    const pokemonData = {
        pokemonId:objectPokemon.pokemonId,
        comments: objectPokemon.commentList,
        likeNumber: objectPokemon.likeNumber
    }
    return pokemonData;
}

function userModelToPersistence(objectUser){
    function transformerCB(pokemon){
        return pokemon.id;
    }
    
    const pokemonFavoriteIds = objectUser.favoriteList.map(transformerCB).sort();
    const userData = {
        currentPokemonId: objectUser.currentPokemonId,
        favoriteList: pokemonFavoriteIds,
    }
    return userData;
}


function persistenceToPokemonModel(pokemondata_from_firebase, pokenmonModel, id){
    if(!pokemondata_from_firebase || pokenmonModel.isNaN){
        pokenmonModel.setPokemonId(id);
        pokenmonModel.commentList = [];
        pokenmonModel.likeNumber = 0;
    }
    else{
        pokenmonModel.setPokemonId(pokemondata_from_firebase.pokemonId);
        pokenmonModel.commentList = [];
        pokenmonModel.likeNumber = pokemondata_from_firebase.likeNumber;
    }
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
            return searchPokemonFavorite(userdata_from_firebase.favoriteList);
        }
    }
}

function saveToFirebaseUser(model, uid){
    if(model.ready){
        set(ref(db, PATH_user+"/"+uid), userModelToPersistence(model));
    }
}

function saveToFirebasePokemon(model, id){
    if(model.ready){
        set(ref(db, PATH_Pokenmon+"/"+id), pokemonModelToPersistence(model));
    }
}

function readFromFirebasePokemon(model, id){
    model.ready = false;

    function convertDataCB(snapshot){
        return persistenceToPokemonModel(snapshot.val(), model, id);
    }

    function changeModelReadyCB(){
        model.ready = true;
    }
    
    return get(ref(db, PATH_Pokenmon+"/"+id)).then(convertDataCB).then(changeModelReadyCB);
}
function readFromFirebaseUser(model, uid){
    model.ready = false;
    function convertDataCB(snapshot){
        return persistenceToUserModel(snapshot.val(),model);
    }

    function changeModelReadyCB(){
        model.ready = true;
    }
    
    return get(ref(db, PATH_user+"/"+uid)).then(convertDataCB).then(changeModelReadyCB);
}
function connectToFirebaseUser(model, watchFunction){
    onAuthStateChanged(auth, loginOutACB);
    function loginOutACB(user){
        if(user!==null){
            model.setUser(user.uid)
            readFromFirebaseUser(model, model.user)
            watchFunction(checkACB, effectACB);
         }
        else{
            model.setUser(null)
            model.clearModel()
        }
     }

    function checkACB(){
        console.log("check");
        if(model.user!==null){
            return [model.currentPokemonId, model.favoriteList, model.team];
        }

    }
    function effectACB(){
        if(model.user!==null){
            saveToFirebaseUser(model, model.user)
        }
    }
}



function connectToFirebasePokemon(pokemonModel, id, watchFunction){
    readFromFirebasePokemon(pokemonModel, id)
    function checkACB(){
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
