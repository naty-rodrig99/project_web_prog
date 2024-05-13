import { TeamView } from "../views/teamView.jsx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react"; 

const TeamPage = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function TeamRender(props){
        const [currentView, setCurrentView] = useState('team');
        if ( props.model.user===null){
            window.location.hash="#/user";
        }

        let viewToShow;

        if(currentView === 'seeTeam') {
            viewToShow = ( 
                <TeamViewSeeTeam

                />
            );
        }

        function setResultChosenACB(evt){
            props.model.setcurrentTeam(evt);
            //console.log("EVT",evt);
          }

        return <>
        <TeamView
            teamsList={props.model.teamsList}
            teamChosenACB = {setResultChosenACB}
        />
        </>
        
    }
);

export { TeamPage };