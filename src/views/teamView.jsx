
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
                <button className="details_part1_backbutton">Create Team</button>
            </div>
        </div>
    );
}