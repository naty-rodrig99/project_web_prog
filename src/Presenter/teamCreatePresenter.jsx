import { CreateTeamView } from "../views/teamView_CreateTeam.jsx";
import { observer } from "mobx-react-lite";

const CreateTeam = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function CreateTeamRender(props){

        function setResultChosenACB(evt){
            props.model.setcurrentPokemonId(evt);
            //console.log("EVT",evt);
          }

        return <CreateTeamView
            favoriteList={props.model.favoriteList}
            promise={props.model.currentPokemonPromiseState}
            detailsChosenACB = {setResultChosenACB}
        />
        
    }
);

export { CreateTeam };