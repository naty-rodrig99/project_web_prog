export function CreateTeamView(props){

    function backtoTeamPage(evt){
        window.location.hash="#/team";
    }
    function newTeam(){
        props.newTeamACB();
        window.location.hash="#/team";
    }

    function favoriteListCB(pokemon){
        //console.log("userPage pokemon: ", pokemon);
        function changeToDetails(evt){
            props.detailsChosenACB(pokemon.id);
            window.location.hash="#/details";
        }
        function createTeam(evt){
            const inputElement = document.querySelector('.team_input_teamName');
            const teamName = inputElement.value;
            props.addToTeamsACB(teamName,pokemon);
        }

        return <div key={pokemon.id} className="team_carouselItem">
                    <div className="team_resultCard">
                        <img src={pokemon.sprites.front_default}/>
                        <ul>
                            <li className="team_resultCardName">{pokemon.name}</li>
                            <li><button className="team_cardButtonLearnMore" onClick={changeToDetails}>Learn More</button></li>
                        </ul>
                        <ul>
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
                    <input class="team_input_teamName" type="text" />
                </div>
                <div class="team_teamName">Select from your favorite list 4 pokemon to add to your team:</div>
                <div class="team_box">
                    <div className="team_carousel">
                        {props.favoriteList.map(favoriteListCB)}
                    </div>
                </div>
            </div>
            <div class="team_teamName">Team Members:</div>
            <div class="team_box_members">
                <div className="team_carousel">
                    {/* { props.temporalTeamsList[0]!==undefined ? (props.temporalTeamsList[0].pokemons!==undefined ? props.temporalTeamsList[0].pokemons.map(selectedPokemonsCB):null):null} */}
                    {props.temporalTeamsList[0]!==undefined ? props.temporalTeamsList[0].pokemons.map(selectedPokemonsCB):"haha"}
                </div>
            </div>
            
            <button class="team_submit_button" onClick={newTeam}>Create</button>
        </div>
        
    );
}