import { SeeTeamView } from "../views/teamView_SeeTeam.jsx";
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';

const SeeTeam = observer(      
    function SeeTeamRender(props){
        const [showRemovedTeamMsg, setShowRemovedTeamMsg] = useState(false);

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
          }

          function deleteTeamACB(evt){
            props.model.deleteTeam(evt);
        }

        function removeFromTeamACB(evt){
            if(props.model.removeFromTeam(props.model.currentTeam.teamName,evt) == true){
                setShowRemovedTeamMsg(true);
            }else{
                setShowRemovedTeamMsg(false);
            }
        }

        return <SeeTeamView
            currentTeam={props.model.currentTeam}
            detailsChosenACB = {setResultChosenACB}
            deleteTeamACB={deleteTeamACB}
            removeFromTeamACB={removeFromTeamACB}
            showRemovedTeamMsg={showRemovedTeamMsg}
        />
        
    }
);

export { SeeTeam };