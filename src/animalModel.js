/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchAnimal } from './animalSource.js';
import { getPokemonDetials } from './getPokemon.js';
import { resolvePromise } from './resolvePromise.js';

const model = {  
    animals: [],
    currentAnimalId: null,  // null means "intentionally empty"
    searchParams: {},
    searchResultsPromiseState: {},
    currentAnimalPromiseState: {},

    setCurrentAnimalId(animalId){
    //setCurrentAnimalId(){
        //if(animalId != this.currentAnimalId){
            //getPokemonDetials()
            resolvePromise(getPokemonDetials(),this.currentAnimalPromiseState);
        //}
        //this.currentAnimalId= animalId;
    },

    setSearchName(name){
        this.searchParams = name;
    },

    doSearch(params){
        //console.log("searchparams",this.searchParams);
        console.log("this.searchResultsPromiseState", this.searchResultsPromiseState)
        resolvePromise(searchAnimal(params), this.searchResultsPromiseState);
    },
    
    // more methods will be added here, don't forget to separate them with comma!
};

export {model};
