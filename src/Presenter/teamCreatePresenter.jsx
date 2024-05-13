import { CreateTeamView } from "../views/teamView_CreateTeam.jsx";
import { observer } from "mobx-react-lite";
import React, { useState,useEffect } from 'react';

const CreateTeam = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function CreateTeamRender(props){
        const [showErrorMessage, setShowErrorMessage] = useState(false);
        const [emptyTeamName, setEmptyTeamName] = useState(false);

        /*const [temporalPokemonList, setPokemonList] = useState([]);

        useEffect(() => {
            // This code will execute whenever props.temporalTeamsList changes
            console.log("temporalTeamsList updated:", props.temporalTeamsList);
        }, [props.temporalTeamsList]); // This dependency array specifies that useEffect should run whenever props.temporalTeamsList changes
        */
        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
            //console.log("EVT",evt);
          }

        function addToTeamsListACB(teamName, pokemon){
            if(props.model.isTeamNameEmpty(teamName, pokemon) == false){
                setEmptyTeamName(false); 
                if(props.model.checkPokemonsLength(teamName, pokemon) == true){
                    setShowErrorMessage(true);
                } else{
                    props.model.addTemporalTeam(teamName, pokemon);
                }
            } else{
                setEmptyTeamName(true);  
            }
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
            showErrorMessage={showErrorMessage}
            emptyTeamName={emptyTeamName}
            //pokemonList={temporalPokemonList}
        />
        
    }
);

export { CreateTeam };