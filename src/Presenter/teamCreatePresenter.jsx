import { CreateTeamView } from "../views/teamView_CreateTeam.jsx";
import { observer } from "mobx-react-lite";

const CreateTeam = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function CreateTeamRender(props){

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
            //console.log("EVT",evt);
          }

        function addToTeamsListACB(teamName, pokemon){
            //console.log("TEAM NAME",teamName);
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
            teamporalTeamsList={props.model.teamporalTeamsList}
        />
        
    }
);

export { CreateTeam };