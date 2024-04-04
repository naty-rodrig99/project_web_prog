import React, { useState } from 'react';

export function DetailsView(props){
    const [heartImgSrc, setHeartImgSrc] = useState('src/icons/empty_heart.png');

    function showDetailsACB(){
        props.pokemonFunction()
    }

    function showAbilitiesACB(){
        props.abilitiesFunction()
    }

    function handleHeartClick(){
        const newHeartImg = 'src/icons/red_heart.png';
        setHeartImgSrc(newHeartImg);
    }

    return (
        <div>
            <div class="details_part1">
                <img class="details_part1_img1" src={props.pokemon.sprites.front_shiny}></img>
                <div class="details_part1_name">{props.pokemon.name}</div>
                <button onClick={handleHeartClick} className="details_part1_button-img2">
                    <img class="details_part1_img2" src={heartImgSrc}></img>
                </button>
            </div>
            <div class="details_part2">
                <button onClick={showAbilitiesACB} class="details_part2_abilities">Details</button>
                <button class="details_part2_abilities">Sprites</button>
                <button class="details_part2_abilities">Forum</button>
                <div class="details_part2_line"></div>
                <div class="details_part2_smallLine"></div>
                <div class="details_part2_headline1">Abilities </div>
            </div>

            <div class="details_part2_abilities1">
                {props.pokemon.abilities.map(abilitiesACB)}
            </div>

            <div > </div>

            
            
        </div>
    );

    function abilitiesACB(ability){
        return <div key={ability.slot} className="ability-item" >
            <div ><span class="details_part2_abilityName">Ability:</span> {ability.ability.name}</div>
            <div><span class="details_part2_abilityName">Hidden:</span> {ability.is_hidden ? 'Yes' : 'No'}</div>
        </div>;
    }
}