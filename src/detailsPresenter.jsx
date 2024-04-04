import { DetailsView } from "./views/detailsView";
import { DetailsViewDetails } from "./views/detailsView_Details"
import { DetailsViewSpecies } from "./views/detialsView_Species";
import { DetailsViewForum } from "./views/detailsView_Forum";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react"; //change this later

const Details = observer(
    function DetialsRender(props){
        const [currentView, setCurrentView] = useState('details');
        
        useEffect(() => {
            props.model.setcurrentPokemonId(10); 
        }, []);

        function searchPokemonACB(){
            props.model.setcurrentPokemonId(10);
        }

        function searchAbilityACB(){
            props.model.getAbilities("friend-guard");
        }

        function searchSpicies(){
            props.model.getSpecies(10);
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
                    pokemonFunction = {searchPokemonACB}
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
            pokemonFunction = {searchPokemonACB}
            pokemon = {props.model.currentPokemonPromiseState.data}
            ability = {props.model.abilitiesPromiseState.data}
            abilitiesFunction = {searchAbilityACB}
        />

            {viewToShow}
        </>

    }
    )

export {Details}