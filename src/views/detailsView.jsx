import React, { useState } from 'react';

export function DetailsView(props){
    function handleHeartClick(x){
        if(props.user===null){
            window.location.hash="#/user";
        }
        else{
            if(!props.isInFavorite){
                props.addToFavoriteListACB(props.pokemon);
            }
            else{
                props.removeFromFavoriteListACB(props.pokemon);
            }
        }
        
    }
    function backtoHomePage(evt){
        history.back();
    }

    //used to show the animation between tab selection
    function onChange(e){
        var items = document.getElementsByClassName("detail_selector_item");
        for(var i=0;i<items.length;i++){
            if(i == e){
                items[i].style = "color: black;  border-bottom: 5px solid #2e7bc3;";
            }else{
                items[i].style = "color: #9c9c9c; border-bottom: 0.5px solid #9c9c9c;";
            }
        }
        if(e==0){
            props.setCurrentView("details")
        }
        else if(e==1){
            props.setCurrentView("species")
        }
        else{
            props.setCurrentView("locations")
        }
    }
    //choose details tab
    function onChange0(){
        onChange(0);
    }
    //choose species tab
    function onChange1(){
        onChange(1);
    }
    //choose forum tab
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
                <div class="details_part1_name">{props.pokemon.name}</div>
                <button  className="details_part1_button-img2"onClick={handleHeartClick}>
                    <i class={props.isInFavorite ? 'fa-solid fa-heart': 'fa-regular fa-heart'}></i>
                </button>
                <div>{props.user? props.likeNumber+" user(s) like it": "You need to login first to check the like number"}</div>
            </div>
            <div className="details_selector">
                <button className="detail_selector_item" style ={defaultStyle} onClick={onChange0}>Details</button>
                <button className="detail_selector_item" onClick={onChange1}>Species</button>
                <button className="detail_selector_item" onClick={onChange2}>Locations</button>
            </div>
        </div>
    )

}