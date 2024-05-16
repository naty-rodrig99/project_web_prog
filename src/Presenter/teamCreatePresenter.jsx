import { CreateTeamView } from "../views/teamView_CreateTeam.jsx";
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';

const CreateTeam = observer(            
    function CreateTeamRender(props){
        const [showErrorMessage, setShowErrorMessage] = useState(false);
        const [emptyTeamName, setEmptyTeamName] = useState(false);
        const [showPokemons, setShowPokemons] = useState(false);
        const [existingTeamName, setExistingTeamName] = useState(false);

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
          }

        function addToTeamsListACB(teamName, pokemon){
            setShowPokemons(false);
            if(props.model.isTeamNameEmpty(teamName, pokemon) == false){
                setEmptyTeamName(false); 
                if(props.model.isTeamNameInTeam(teamName) == true){
                    setExistingTeamName(true);
                } else{
                    setExistingTeamName(false);
                    if(props.model.checkPokemonsLength(teamName, pokemon) == true){
                        setShowErrorMessage(true);
                        setShowPokemons(false);
                    } else{
                        props.model.addTemporalTeam(teamName, pokemon);
                        setShowPokemons(true);
                    }
                }
            } else{
                setEmptyTeamName(true);  
            }
        }

        function createTeamACB(){
            props.model.createTeam();
        }

        function resetTemporalListACB(){
            props.model.resetTemporalList();
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
            showPokemons={showPokemons}
            resetTemporal={resetTemporalListACB}
            existingTeamName={existingTeamName}
        />
        
    }
);

export { CreateTeam };