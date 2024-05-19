import { DetailsView } from "../views/detailsView";
import { DetailsViewDetails } from "../views/detailsView_Details"
import { DetailsViewSpecies } from "../views/detialsView_Species";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react"; 
import DetailsViewLocation from "../views/detailsView_Location";


const Details = observer(
    function DetialsRender(props){
        const [currentView, setCurrentView] = useState('details');
        const [commentText, setComments] = useState('');

        function togglePopupExperience() {
            props.model.setShowPopupExperience(!props.model.showPopupExperience);
        }

        function togglePopupCaptureRate() {
            props.model.setShowPopupCaptureRate(!props.model.showPopupCaptureRate);
        }

        function togglePopupHappiness() {
            props.model.setShowPopupHappiness(!props.model.showPopupHappiness);
        }

        function togglePopupGrowthRate() {
            props.model.setShowPopupGrowthRate(!props.model.showPopupGrowthRate);
        }
            
        // function handleSubmitComment() {
        //     debugger
        //     props.model.writeComment(commentText, Date.now());
        // }
    
        function searchAbilityACB(){
            props.model.getAbilities(props.model.currentPokemonId);
        }

        // function saveCommentTextACB(commentText){
        //     setComments(commentText);
        // }

        function searchSpicies(){
            props.model.getSpecies(props.model.currentPokemonId);
            props.model.setPokemon()
        }

        // function searchLocations(){
        //     props.model.getLocations(props.model.currentPokemonId);
        // }

        function addToFavoriteListACB(){
            props.model.addToFavoriteList(props.model.currentPokemonPromiseState.data);
            props.model.addcurrentPokemonLikeNumber();
        }

        function removeFromFavoriteListACB(){
            props.model.removeFromFavoriteList(props.model.currentPokemonPromiseState.data);
            props.model.minuscurrentPokemonLikeNumber();
        }

        // function addCommentACB(comment, pokemon, timestamp){// needed?
        //     console.log("addcomment")
        //     props.model.addComment(comment, pokemon, timestamp);
        // }

        if(!props.model.currentPokemonPromiseState.promise){
            return "no data"
        }
        if(props.model.currentPokemonPromiseState.error){
            return props.model.currentPokemonPromiseState.error
        }
        if(!props.model.currentPokemonPromiseState.data){
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }

        let viewToShow;

        if (currentView === 'details') {
            viewToShow = ( 
                <DetailsViewDetails
                    pokemon = {props.model.currentPokemonPromiseState.data}
                    ability = {props.model.abilitiesPromiseState.data}
                    abilitiesFunction = {searchAbilityACB}
                    species={props.model.speciesPromiseState.data}
                    searchSpecies={searchSpicies}
                    togglePopupExperience={togglePopupExperience}
                    showPopupExperience={props.model.showPopupExperience}
                    
                />
            );
        } else if(currentView === 'species'){
            viewToShow = ( 
                <DetailsViewSpecies
                    species={props.model.speciesPromiseState.data}
                    searchSpecies={searchSpicies}
                    togglePopupCaptureRate={togglePopupCaptureRate}
                    showPopupCaptureRate={props.model.showPopupCaptureRate}
                    togglePopupHappiness={togglePopupHappiness}
                    showPopupHappiness={props.model.showPopupHappiness}
                    togglePopupGrowthRate={togglePopupGrowthRate}
                    showPopupGrowthRate={props.model.showPopupGrowthRate}
                />
            );
        } else if(currentView === 'locations'){
            viewToShow = ( 
                <DetailsViewLocation
                locations={props.model.locationPromiseState.data}
                />
            );
        }

        function isInFavoriteCB(pokemon){
            return pokemon.id===props.model.currentPokemonId;
        }

        return <>
        <DetailsView
            user={props.model.user}
            setCurrentView={setCurrentView}
            isInFavorite={props.model.favoriteList.find(isInFavoriteCB)}
            pokemon = {props.model.currentPokemonPromiseState.data}
            ability = {props.model.abilitiesPromiseState.data}
            abilitiesFunction = {searchAbilityACB}
            addToFavoriteListACB={addToFavoriteListACB}
            removeFromFavoriteListACB={removeFromFavoriteListACB}
            likeNumber={props.model.currentPokemonLikeNumber}
        />
            {viewToShow}
        </>

    }
    )

export {Details}