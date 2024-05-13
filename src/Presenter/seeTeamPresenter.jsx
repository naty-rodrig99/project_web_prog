import { SeeTeamView } from "../views/teamView_SeeTeam.jsx";
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';

const SeeTeam = observer(      
    function SeeTeamRender(props){

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
          }

          function deleteTeamACB(evt){
            props.model.deleteTeam(evt);
        }

        return <SeeTeamView
            currentTeam={props.model.currentTeam}
            detailsChosenACB = {setResultChosenACB}
            deleteTeamACB={deleteTeamACB}
        />
        
    }
);

export { SeeTeam };