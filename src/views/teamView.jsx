
export function TeamView(props){

    function backtoHomePage(evt){
        window.location.hash="#/main";
    }
    
    return (
        <div>
            <div>
                <button className="details_part1_backbutton" onClick={backtoHomePage}>Back</button>
            </div>
            <div>
                <div class = "team_view1_title">My Teams</div>
            </div>    
            <div>
                <button className="team_createteam_button">Create Team</button>
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
                <tbody>
                    <tr>
                        <td>Team 1</td>
                        <td>ditto - weedle - pikachu - bulbasaur - raichu</td>
                        <td><button class="team_seedetails_button">See Details</button></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        
    );
}