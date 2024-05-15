export function CreateTeamView(props){

    function backtoTeamPage(evt){
        history.back();
        //window.location.hash="#/team";
        props.resetTemporal();
    }
    function newTeam(){
        props.newTeamACB();
        window.location.hash="#/team";
    }

    console.log("favorite list: ", props.favoriteList.length)
    function favoriteListCB(pokemon){
        //console.log("userPage pokemon: ", pokemon);
        function changeToDetails(evt){
            props.detailsChosenACB(pokemon.id);
            window.location.hash="#/details";
        }
        function createTeam(evt){
            const inputElement = document.querySelector('.team_input_teamName1');
            const teamName = inputElement.value;
            props.addToTeamsACB(teamName,pokemon);
        }

        return <div key={pokemon.id} className="team_carouselItem">
                    <div className="team_resultCard">
                        <img src={pokemon.sprites.front_default}/>
                        <ul>
                            <li className="team_resultCardName">{pokemon.name}</li>
                            <li><button className="team_cardButtonLearnMore" onClick={changeToDetails}>Learn More</button></li>
                            <li><button className="team_cardButtonAdd" onClick={createTeam}>Add to team</button></li>
                        </ul>
                    </div>

                </div>;
    }

    function selectedPokemonsCB(pokemon){
        function changeToDetails(evt){
            props.detailsChosenACB(pokemon.id);
            window.location.hash="#/details";
        }
        console.log("selectedPokemonsCB",pokemon)
        return <div key={pokemon.id} className="team_carouselItem">
                    <div className="team_resultCard">
                        <img src={pokemon.sprites.front_default}/>
                        <ul>
                            <li className="team_resultCardName">{pokemon.name}</li>
                            <li><button className="team_cardButtonLearnMore" onClick={changeToDetails}>Learn More</button></li>
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
                    <input class="team_input_teamName1" type="text" />
                </div>
                <div class="team_teamName">Select from your favorite list 4 pokemon to add to your team:</div>
                <div class="team_box">
                    <div className="team_carousel">
                        {props.favoriteList.length>0?props.favoriteList.map(favoriteListCB):"You should first add at least 4 pokemons to create the team"}
                    </div>
                </div>
            </div>
            <div>
                {props.showErrorMessage && <div className="team_ErrorMsg">Error: You already have 4 pokemons in your team</div>}
            </div>
            <div>
                {props.emptyTeamName && <div className="team_ErrorMsg">Error: First you need to write the team name</div>}
            </div>
            <div>
                {props.showPokemons && <div className="team_Msg">The selected pokemon has been added to the team.</div>}
            </div>
            <div class="team_teamName">Team Members:</div>
            <div class="team_box_members">
                <div className="team_carousel">
                {props.temporalTeamsList.map(team => team.pokemons.map(pokemon => selectedPokemonsCB(pokemon)))}
                </div>
            </div>
            
            <button class="team_submit_button" disabled={props.temporalTeamsList.length<4} onClick={newTeam}>Create</button>
        </div>
        
    );
}