export function CreateTeamView(props){

    function backtoTeamPage(evt){
        window.location.hash="#/team";
    }

    function favoriteListCB(pokemon){
        console.log("userPage pokemon: ", pokemon);
        function changeToDetails(evt){
            props.detailsChosenACB(pokemon.id);
            window.location.hash="#/details";
        }

        return <div key={pokemon.id} className="team_carouselItem">
                    <div className="team_resultCard">
                        <img src={pokemon.sprites.front_default}/>
                        <ul>
                            <li className="team_resultCardName">{pokemon.name}</li>
                            <li><button className="team_cardButtonLearnMore" onClick={changeToDetails}>Learn More</button></li>
                        </ul>
                        <ul>
                            <li><button className="team_cardButtonAdd">Add to team</button></li>
                        </ul>
                    </div>

                </div>;
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
                    <div class="team_box">
                        <div className="team_carousel">
                            {props.favoriteList.map(favoriteListCB)}
                        </div>
                    </div>
                </div>
            <div class="team_teamName">
                    Team Members:
            </div>
            <button class="team_submit_button">Submit</button>
        </div>
        
    );
}