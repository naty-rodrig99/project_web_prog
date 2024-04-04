import { DetailsView } from "./views/detailsView";
import { DetailsViewDetails } from "./views/detailsView_Details"
import { DetailsViewSpecies } from "./views/detialsView_Species";
import { DetailsViewForum } from "./views/detailsView_Forum";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react"; 

const Details = observer(
    function DetialsRender(props){
        const [currentView, setCurrentView] = useState('details');
        
        function initializeData(){
            props.model.setcurrentPokemonId(10)
        }

        useEffect(initializeData);

        function searchPokemonACB(){
            props.model.setcurrentPokemonId(props.model.currentPokemonId);
        }

        function searchAbilityACB(){
            props.model.getAbilities(props.model.currentPokemonId);
        }

        function searchSpicies(){
            props.model.getSpecies(props.model.currentPokemonId);
        }

        function addToFavoriteListACB(){
            props.model.addToFavoriteList(props.model.currentPokemonPromiseState.data);
        }

        function showSpecies() {
            setCurrentView('species');
        }

        function showDetails() {
            setCurrentView('details');
        }

        function showForum() {
            setCurrentView('forum');
        }

        if(!props.model.currentPokemonPromiseState.promise){
            return "no data"
        }
        if(props.model.currentPokemonPromiseState.error){
            return props.model.currentPokemonPromiseState.error
        }
        if(!props.model.currentPokemonPromiseState.data){return <img src="https://brfenergi.se/iprog/loading.gif"></img>}

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

        return <>
        <DetailsView
            setCurrentView={setCurrentView}
            //pokemonFunction = {searchPokemonACB}
            pokemon = {props.model.currentPokemonPromiseState.data}
            ability = {props.model.abilitiesPromiseState.data}
            abilitiesFunction = {searchAbilityACB}
            addToFavoriteListACB={addToFavoriteListACB}

        />
            {viewToShow}
        </>

    }
    )

export {Details}