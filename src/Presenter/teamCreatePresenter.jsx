import { CreateTeamView } from "../views/teamView_CreateTeam.jsx";
import { observer } from "mobx-react-lite";
import React, { useState,useEffect } from 'react';

const CreateTeam = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function CreateTeamRender(props){

        const [temporalPokemonList, setPokemonList] = useState([]);
        /*useEffect(() => {
            console.log("UPDATED", props.temporalTeamsList);
            // Update the local state pokemonList when props.temporalTeamsList changes
            if (props.temporalTeamsList && props.temporalTeamsList.pokemons) {
                setPokemonList(props.temporalTeamsList);
                console.log("Updated pokemonList:", temporalPokemonList);
            }
        }, [props.temporalTeamsList]); */

        useEffect(() => {
            // This code will execute whenever props.temporalTeamsList changes
            console.log("temporalTeamsList updated:", props.temporalTeamsList);
        }, [props.temporalTeamsList]); // This dependency array specifies that useEffect should run whenever props.temporalTeamsList changes

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
            //console.log("EVT",evt);
          }

        function addToTeamsListACB(teamName, pokemon){
            //console.log("TEAM NAME",teamName);
            //here I add items to temporalTeamsList
            props.model.addTemporalTeam(teamName, pokemon);
            //props.model.addTeam(props.model.currentPokemonPromiseState.data);
            //props.model.addTeam(props.model.currentPokemonPromiseState.data);
            //console.log("DATA",props.model.currentPokemonPromiseState.data.id);
        }

        function createTeamACB(){
            props.model.createTeam();
        }

        return <CreateTeamView
            favoriteList={props.model.favoriteList}
            promise={props.model.currentPokemonPromiseState}
            detailsChosenACB = {setResultChosenACB}
            addToTeamsACB={addToTeamsListACB}
            newTeamACB={createTeamACB}
            temporalTeamsList={props.model.temporalTeamsList}
            pokemonList={temporalPokemonList}
        />
        
    }
);

export { CreateTeam };