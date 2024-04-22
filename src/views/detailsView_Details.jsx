
export function DetailsViewDetails(props){

    function showDetailsACB(){
        props.setCurrentView("details")
        //props.pokemonFunction()
    }

    function showSpeciesACB(){
        props.setCurrentView("species")
    }

    function showForumACB(){
        props.setCurrentView("forum")
    }

    function showAbilitiesACB(){
        props.abilitiesFunction()
    }

    return (
        <div>
            <div class="details_part2">
                <button onClick={showDetailsACB} class="details_part2_abilities">Details</button>
                <button onClick={showSpeciesACB} class="details_part2_abilities">Species</button>
                <button onClick={showForumACB} class="details_part2_abilities">Forum</button>
                <div class="details_part2_line"></div>
                <div class="details_part2_smallLine"></div>
            </div>

            <div class="details_part2_rectangle2">General</div>

            <div >
                <div class="details_part2_div1">
                    <span class="details_part2_headline2">Base Experience:</span>
                    <span class="details_part2_item1">{props.pokemon.base_experience}</span>
                  </div>
                <div class="details_part2_div1">
                    <span class="details_part2_headline2">Height:</span>
                    <span class="details_part2_item1">{props.pokemon.height}</span>
                </div>
                <div class="details_part2_div1">
                    <span class="details_part2_headline2">Weight:</span>
                    <span class="details_part2_item1">{props.pokemon.weight}</span>
                </div>
            </div>

            <div class="details_part2_rectangle2">Abilities </div>
            
            <div class="details_part2_abilities1">
                {props.pokemon.abilities.map(abilitiesACB)}
            </div> 
        
        </div>
    );

    function abilitiesACB(ability){
        return <div key={ability.slot} className="ability-item" >
            <div ><span class="details_part2_abilityName">Ability:</span> {ability.ability.name}</div>
            <div><span class="details_part2_abilityName">Hidden:</span> {ability.is_hidden ? 'Yes' : 'No'}</div>
        </div>;
    }
}