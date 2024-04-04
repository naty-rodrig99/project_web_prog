import React, { useState } from 'react';

export function DetailsView(props){
    const [heartImgSrc, setHeartImgSrc] = useState('src/icons/empty_heart.png');

    // function showDetailsACB(){
    //     props.pokemonFunction()
    // }

    function handleHeartClick(){
        const newHeartImg = 'src/icons/red_heart.png';
        setHeartImgSrc(newHeartImg);
        props.addToFavoriteListACB(props.pokemon);

    }

    return (
        <div>
            <div class="details_part1">
                <img class="details_part1_img1" src={props.pokemon.sprites.front_default}></img>
                <img class="details_part1_img1" src={props.pokemon.sprites.front_shiny}></img>
                <div class="details_part1_name">{props.pokemon.name}</div>
                <button onClick={handleHeartClick} className="details_part1_button-img2">
                    <img class="details_part1_img2" src={heartImgSrc}></img>
                </button>
            </div>
            {/* <div class="details_selector">
                <div class="detail_selector_item" style="z-index: 1; margin-top:0; background-color: #B4D3EE;" onClick={onChange(0)}>Details</div>
                <div class="detail_selector_item" style="z-index: 2;" onClick={onChange(1)}>Species</div>
                <div class="detail_selector_item" style="z-index: 2;" onClick={onChange(2)}>Forum</div>
            </div> */}
        </div>
    )

}