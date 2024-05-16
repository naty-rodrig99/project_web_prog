import { CreateTeamView } from "../views/teamView_CreateTeam.jsx";
import { observer } from "mobx-react-lite";
import { reaction } from 'mobx';

const CreateTeam = observer(            
    function CreateTeamRender(props){

        reaction(checkACB, effectACB)

        function checkACB(){
            return [props.model.temporalTeamsList.pokemons];
        }

        function effectACB(){
            props.model.temporalTeamsList;
        }

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
          }

        function addToTeamsListACB(teamName, pokemon){
            props.model.setShowPokemons(false);
            if(props.model.isTeamNameEmpty(teamName, pokemon) == false){
                props.model.setEmptyTeamName(false); 
                if(props.model.isTeamNameInTeam(teamName) == true){
                    props.model.setExistingTeamName(true);
                } else{
                    props.model.setExistingTeamName(false);
                    if(props.model.checkPokemonsLength(teamName, pokemon) == true){
                        props.model.setShowErrorMessage(true);
                        props.model.setShowPokemons(false);
                    } else{
                        props.model.addTemporalTeam(teamName, pokemon);
                        props.model.setShowPokemons(true);
                    }
                }
            } else{
                props.model.setEmptyTeamName(true);  
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
            showErrorMessage={props.model.showErrorMessage}
            emptyTeamName={props.model.emptyTeamName}
            showPokemons={props.model.showPokemons}
            resetTemporal={resetTemporalListACB}
            existingTeamName={props.model.existingTeamName}
        />
        
    }
);

export { CreateTeam };