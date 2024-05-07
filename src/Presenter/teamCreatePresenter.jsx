import { CreateTeamView } from "../views/teamView_CreateTeam.jsx";
import { observer } from "mobx-react-lite";

const TeamPage = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function CreateTeamRender(props){

        return <>
        <TeamViewCreate
            
        />
        </>
        
    }
);

export { CreateTeamView };