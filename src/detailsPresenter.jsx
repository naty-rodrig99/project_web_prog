import { DetailsView } from "./views/detailsView";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react"; //change this later

const Details = observer(
    function DetialsRender(props){
        
        useEffect(() => {
            props.model.setCurrentpokemonId(10); 
            // Call setCurrentpokemonId only once during component initialization
        }, []);

        function searchPokemonACB(){
            props.model.setCurrentpokemonId(10);
        }

        if(!props.model.currentAnimalPromiseState.promise){
            return "no data"
        }
        if(props.model.currentAnimalPromiseState.error){
            return props.model.currentAnimalPromiseState.error
        }
        if(!props.model.currentAnimalPromiseState.data){return <img src="https://brfenergi.se/iprog/loading.gif"></img>}
        return <DetailsView
        pokemonFunction = {searchPokemonACB}
        pokemon = {props.model.currentAnimalPromiseState.data}
        />

    }
    )

export {Details}