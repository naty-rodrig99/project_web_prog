import React, { useState } from 'react';

export function DetailsView(props){
    const [heartImgSrc, setHeartImgSrc] = useState('fa-regular fa-heart');

    // function showDetailsACB(){
    //     props.pokemonFunction()
    // }

    function handleHeartClick(x){
        // const newHeartImg = 'fa-solid fa-heart';
        // setHeartImgSrc(newHeartImg);
        // x.classList.toggle("fa-solid fa-heart");
        props.addToFavoriteListACB(props.pokemon);

    }

    return (
        <div>
            <div class="details_part1">
                <img class="details_part1_img1" src={props.pokemon.sprites.front_default}></img>
                <img class="details_part1_img1" src={props.pokemon.sprites.front_shiny}></img>
                <div class="details_part1_name">{props.pokemon.name}</div>
                <button onClick={handleHeartClick} className="details_part1_button-img2">
                    <i class="fa-regular fa-heart"></i>
                    {/* <img class="details_part1_img2" src={heartImgSrc}></img> */}
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