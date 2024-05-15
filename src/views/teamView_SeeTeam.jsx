export function SeeTeamView(props){

    function backtoTeamsPage(evt){
        window.location.hash="#/team";
    }

    function deleteTeam(evt){
        props.deleteTeamACB(props.currentTeam.teamName);
        window.location.hash="#/team";
    }
    
    function pokemonsInTeamCB(pokemon){
        function changeToDetails(evt){
            props.detailsChosenACB(pokemon.id);
            window.location.hash="#/details";
        }
    function removeFromTeam(evt){
        props.removeFromTeamACB(pokemon);
    }
        return <div key={pokemon.id} className="team_carouselItem">
                    <div className="team_resultCard">
                        <img src={pokemon.sprites.front_default}/>
                        <ul>
                            <li className="team_resultCardName">{pokemon.name}</li>
                            <li><button className="team_cardButtonLearnMore" onClick={changeToDetails}>Learn More</button></li>
                            <li><button className="team_cardButtonAdd" onClick={removeFromTeam}>Remove</button></li>
                        </ul>
                    </div>

                </div>;
    }

    return (
        <div>
            <div>
                <button className="team_backbutton" onClick={backtoTeamsPage}>Back</button>
            </div>
            <div className="team_teamNameContainer">
                <span className="team_teamName2">Team Name </span>
                <span className="team_teamNameNoBold">{props.currentTeam.teamName}</span></div>
            <div class="team_teamName">Team Members</div>
            <div class="team_box">
                <div className="team_carousel">
                    {props.currentTeam.pokemons.map(pokemonsInTeamCB)}
                </div>
            </div>
            {props.showRemovedTeamMsg && <div className="team_Msg">The selected pokemon has been removed from the team.</div>}
            <button class="team_submit_button" onClick={deleteTeam}>Delete Team</button>
        </div>
        
    );
}