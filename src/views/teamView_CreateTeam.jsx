export function CreateTeamView(props){

    function backtoTeamPage(evt){
        window.location.hash="#/team";
    }
    
    return (
        <div>
            <div>
                <button className="team_backbutton" onClick={backtoTeamPage}>Back</button>
            </div>
            <div>
                <div class = "team_view1_title">Create Team</div>
            </div>
            <div>
                <div class="team_teamName">
                    Team Name:
                    <input class="team_input_teamName" type="text" />
                </div>
                <div class="team_teamName">Select from your favorite list 5 pokemon to add to your team:</div>
                <div class="team_box" />
            </div>
            <div class="team_teamName">
                    Team Members:
            </div>
            <button class="team_submit_button">Submit</button>
        </div>
        
    );
}