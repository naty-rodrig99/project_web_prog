import { DetailsView } from "./views/detailsView";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react"; //change this later

const Details = observer(
    function DetialsRender(props){
        
        useEffect(() => {
            props.model.setcurrentPokemonId(10); 
            // Call setCurrentpokemonId only once during component initialization
        }, []);

        function searchPokemonACB(){
            props.model.setcurrentPokemonId(10);
        }

        function searchAbilityACB(){
            props.model.getAbilities("friend-guard");
        }

        if(!props.model.currentPokemonPromiseState.promise){
            return "no data"
        }
        if(props.model.currentPokemonPromiseState.error){
            return props.model.currentPokemonPromiseState.error
        }
        if(!props.model.currentPokemonPromiseState.data){return <img src="https://brfenergi.se/iprog/loading.gif"></img>}
        return <DetailsView
        pokemonFunction = {searchPokemonACB}
        pokemon = {props.model.currentPokemonPromiseState.data}
        ability = {props.model.abilitiesPromiseState.data}
        abilitiesFunction = {searchAbilityACB}
        />

    }
    )

export {Details}