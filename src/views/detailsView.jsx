
export function DetailsView(props){

    function showDetailsACB(){
        props.pokemonFunction()
    }

    function showAbilitiesACB(){
        props.abilitiesFunction()
    }

    return (
        <div>
            <button onClick={showDetailsACB}>Show</button>
            <div class="details_part1">
                <img class="details_part1_img1" src={props.pokemon.sprites.front_shiny}></img>
                <div class="details_part1_name">{props.pokemon.name}</div>
                <img class="details_part1_img2" src='src\icons\empty_heart.png'></img>
            </div>
            <div class="details_part2">
                <button onClick={showAbilitiesACB} class="details_part2_abilities">Details</button>
                <div class="details_part2_line"></div>
                <div class="details_part2_smallLine"></div>
                <div class="details_part2_headline1">Abilities </div>
            </div>

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