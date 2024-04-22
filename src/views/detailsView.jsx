import React, { useState } from 'react';

export function DetailsView(props){
    const [heartImgSrc, setHeartImgSrc] = useState('fa-regular fa-heart');

    // function showDetailsACB(){
    //     props.pokemonFunction()
    // }

    function handleHeartClick(x){
        // const newHeartImg = 'fa-solid fa-heart';
        // setHeartImgSrc(newHeartImg);
        var items = document.getElementsByClassName("details_part1_button-img2");
        items.classList.toggle("fa-solid fa-heart");
        props.addToFavoriteListACB(props.pokemon);

    }
    function backtoHomePage(evt){
        window.location.hash="#/main";
    }


    function onChange(e){
        console.log("!!curent e is",e);
        var items = document.getElementsByClassName("detail_selector_item");
        console.log(items);
        for(var i=0;i<items.length;i++){
            if(i == e){
                items[i].style = "color: black;  border-bottom: 5px solid #2e7bc3;";
            }else{
                items[i].style = "color: #9c9c9c; border-bottom: 0.5px solid #9c9c9c;";
            }
            // if(i == 0){
            //     items[i].style = "margin-top: 0;" + items[i].style.cssText;
            // }
            //console.log(i);
        }

        console.log("change!!!  ")
        if(e==0){
            props.setCurrentView("details")
        }
        else if(e==1){
            props.setCurrentView("species")
        }
        else{
            props.setCurrentView("forum")
        }
    }
    function onChange0(){
        onChange(0);
    }
    function onChange1(){
        onChange(1);
    }
    function onChange2(){
        onChange(2);
    }

    const defaultStyle = {
        color: "black",
        'border-bottom': '5px solid #2e7bc3'
      };
      return (
        <div>
            <button className="details_part1_backbutton" onClick={backtoHomePage}>Back</button>
            <div class="details_part1">
                <img class="details_part1_img1" src={props.pokemon.sprites.front_default}></img>
                {/*<img class="details_part1_img1" src={props.pokemon.sprites.front_shiny}></img> */}
                <div class="details_part1_name">{props.pokemon.name}</div>
                <button  className="details_part1_button-img2" disabled={props.isInFavorite} onClick={handleHeartClick}>
                    {/* <button onClick={handleHeartClick} className="details_part1_button-img2"> */}
                    <i class="fa-regular fa-heart"></i>
                    {/* <img class="details_part1_img2" src={heartImgSrc}></img> */}
                </button>
            </div>
            <div className="details_selector">
                <button className="detail_selector_item" style ={defaultStyle} onClick={onChange0}>Details</button>
                <button className="detail_selector_item" onClick={onChange1}>Species</button>
                <button className="detail_selector_item" onClick={onChange2}>Forum</button>
            </div>
        </div>
    )

}