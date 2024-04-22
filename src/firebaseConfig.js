import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getDatabase, ref, get, set, child, onValue} from "firebase/database";
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

const PATH1="pokemons";
const PATH2="users";

set(ref(db, PATH1), "pokemon1");
set(ref(db, PATH2), "user1");

function modelToPersistence(objectPokemon){
    function transformerCB(pokemon){
        return pokemon.id;
    }
    //const pokemonIds = objectPokemon.dishes.map(transformerCB).sort();
    
    const pokemonData = {
        comments: objectPokemon.comments,
        pokemonId: objectDinner.currentDishId,
        likeNum: objectPokemon.likeNum
    }
    return pokemonData;
}
