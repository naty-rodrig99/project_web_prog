import { DetailsView } from "../views/detailsView";
import { DetailsViewDetails } from "../views/detailsView_Details"
import { DetailsViewSpecies } from "../views/detialsView_Species";
import { DetailsViewForum } from "../views/detailsView_Forum";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react"; 


import { reaction, observable, configure } from "mobx";
import { PokenmonModel } from '../pokemonModel.js';
import { connectToFirebasePokemon } from '../firebaseConfig.js';

const reactivePokemonModel= observable(PokenmonModel);
//console.log("reactivePokemonModel", reactivePokemonModel);
const Details = observer(
    function DetialsRender(props){
        const [currentView, setCurrentView] = useState('details');

        connectToFirebasePokemon(reactivePokemonModel, props.model.currentPokemonId, reaction);

        function searchAbilityACB(){
            props.model.getAbilities(props.model.currentPokemonId);
        }

        function searchSpicies(){
            props.model.getSpecies(props.model.currentPokemonId);
        }

        function addToFavoriteListACB(){
            props.model.addToFavoriteList(props.model.currentPokemonPromiseState.data);
            //console.log("add!!");
            reactivePokemonModel.addLikeNumber();
        }

        function removeFromFavoriteListACB(){
            props.model.removeFromFavoriteList(props.model.currentPokemonPromiseState.data);
            reactivePokemonModel.minusLikeNumber();
        }

        if(!props.model.currentPokemonPromiseState.promise){
            return "no data"
        }
        if(props.model.currentPokemonPromiseState.error){
            return props.model.currentPokemonPromiseState.error
        }
        if(!props.model.currentPokemonPromiseState.data){
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }

        let viewToShow;

        if (currentView === 'details') {
            viewToShow = ( 
                <DetailsViewDetails
                    setCurrentView={setCurrentView}
                    //pokemonFunction = {searchPokemonACB}
                    pokemon = {props.model.currentPokemonPromiseState.data}
                    ability = {props.model.abilitiesPromiseState.data}
                    abilitiesFunction = {searchAbilityACB}
                    species={props.model.speciesPromiseState.data}
                    searchSpecies={searchSpicies}
                    
                />
            );
        } else if(currentView === 'species'){
            console.log("species", props.model.speciesPromiseState);
            viewToShow = ( 
                <DetailsViewSpecies
                    setCurrentView={setCurrentView}
                    species={props.model.speciesPromiseState.data}
                    searchSpecies={searchSpicies}
                />
            );
        } else if(currentView === 'forum'){
            viewToShow = ( 
                <DetailsViewForum
                    setCurrentView={setCurrentView}
                />
            );
        }

        function isInFavoriteCB(pokemon){
            return pokemon.id===props.model.currentPokemonId;
        }

        function getLikeNumber(){
            //  props.model.currentPokemonId
            return 0;
        }

        //console.log("props.model.favoriteList.", props.model.favoriteList);
        return <>
        <DetailsView
            setCurrentView={setCurrentView}
            //pokemonFunction = {searchPokemonACB}
            isInFavorite={props.model.favoriteList.find(isInFavoriteCB)}
            pokemon = {props.model.currentPokemonPromiseState.data}
            ability = {props.model.abilitiesPromiseState.data}
            abilitiesFunction = {searchAbilityACB}
            addToFavoriteListACB={addToFavoriteListACB}
            removeFromFavoriteListACB={removeFromFavoriteListACB}
            likeNumber={reactivePokemonModel.likeNumber}
        />
            {viewToShow}
        </>

    }
    )

export {Details}