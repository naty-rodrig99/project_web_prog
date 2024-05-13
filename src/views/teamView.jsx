export function TeamView(props){

    function backtoHomePage(evt){
        window.location.hash="#/main";
    }

    function showCreateTeamView(){
        window.location.hash="#/createTeam";
    }

    
    function teamsListCB(team){
        
        function showSeeTeamView(){
            props.teamChosenACB(team.teamName);
            window.location.hash="#/seeTeam";
        }
        const pokemonNames = team.pokemons.map(pokemon => pokemon.name).join(', ');
        return  <tr key={team.teamName}>
                        <td>{team.teamName}</td>
                        <td>{pokemonNames}</td>
                        <td><button class="team_seedetails_button" onClick={showSeeTeamView}>See Details</button></td>
                    </tr>
                
    }
    
    return (
        <div>
            <div>
                <button className="team_backbutton" onClick={backtoHomePage}>Back</button>
            </div>
            <div>
                <div class = "team_view1_title">My Teams</div>
            </div>    
            <div>
                <button className="team_createteam_button" onClick={showCreateTeamView}>Create Team</button>
            </div>
            <div class="team_table-container">
            <table>
                <thead class="team_table-container_th">
                    <tr>
                        <th>Team Name</th>
                        <th>Pokemon Team Members</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >{props.teamsList.map(teamsListCB)}</tbody>
            </table>
            </div>
        </div>
        
    );
}