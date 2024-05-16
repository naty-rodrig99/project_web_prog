import { TeamView } from "../views/teamView.jsx";
import { observer } from "mobx-react-lite";

const TeamPage = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function TeamRender(props){

        function setResultChosenACB(evt){
            props.model.setcurrentTeam(evt);
          }

        return <TeamView
            user={props.model.user}
            teamsList={props.model.teamsList}
            teamChosenACB = {setResultChosenACB}
        />
        
    }
);

export { TeamPage };