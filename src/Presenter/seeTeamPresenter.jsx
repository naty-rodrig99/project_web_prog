import { SeeTeamView } from "../views/teamView_SeeTeam.jsx";
import { observer } from "mobx-react-lite";
import { reaction } from 'mobx';

const SeeTeam = observer(      
    function SeeTeamRender(props){

        reaction(checkACB, effectACB)

        function checkACB(){
            return [props.model.teamsList.pokemons];
        }

        function effectACB(){ 
            props.model.teamsList;
        }

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
          }

          function deleteTeamACB(evt){
            props.model.deleteTeam(evt);
        }

        function removeFromTeamACB(evt){
            if(props.model.removeFromTeam(props.model.currentTeam.teamName,evt) == true){
                props.model.setShowRemovedTeamMsg(true);
            }else{
                props.model.setShowRemovedTeamMsg(false);
            }
        }

        return <SeeTeamView
            currentTeam={props.model.currentTeam}
            detailsChosenACB = {setResultChosenACB}
            deleteTeamACB={deleteTeamACB}
            removeFromTeamACB={removeFromTeamACB}
            showRemovedTeamMsg={props.model.showRemovedTeamMsg}
        />
        
    }
);

export { SeeTeam };