
export function DetailsViewDetails(props){

    function showBaseExperience(){
        props.togglePopupExperience();
    }

    return (
        <div>
            <div class="details_part2_rectangle2">General</div>
            <div >
                <div class="details_part2_div1">
                    <span><button class="team_info_button" onClick={showBaseExperience}>i</button></span>
                    <span class="details_part2_headline2">Base Experience:</span>
                    <span class="details_part2_item1">{props.pokemon.base_experience}</span>
                  </div>
                <div class="details_part2_div1">
                    {props.showPopupExperience && <div className="details_part2_popup">The base experience gained for defeating this Pokémon.</div>}
                </div>
                <div class="details_part2_div1">
                    <span class="details_part2_headline2">Height:</span>
                    <span class="details_part2_item1">{props.pokemon.height}</span>
                    <span class="details_part2_item_units"> decimetres</span>
                </div>
                <div class="details_part2_div1">
                    <span class="details_part2_headline2">Weight:</span>
                    <span class="details_part2_item1">{props.pokemon.weight}</span>
                    <span class="details_part2_item_units"> hectograms</span>
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