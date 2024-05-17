import { DetailsView } from "../views/detailsView";
import { DetailsViewDetails } from "../views/detailsView_Details"
import { DetailsViewSpecies } from "../views/detialsView_Species";
import { DetailsViewForum } from "../views/detailsView_Forum";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react"; 
import { readCommentsFromFirebase } from '../firebaseModel';


const Details = observer(
    function DetialsRender(props){
        const [currentView, setCurrentView] = useState('details');
        const [comments, setComments] = useState(props.model.fetchComments());
        //const [newCommentText, setNewCommentText] = useState(props.model.writeComment(props.writeComment));
        //const fetchedComments = props.model.fetchComments();

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

        useEffect(() => {
            if (currentView === 'forum' && props.model.currentPokemonId && props.model.user) {
                //console.log('useEffectFunction ' + props.model.currentPokemonId, props.model.user)
                readCommentsFromFirebase(props.model.user, props.model.currentPokemonId)
                    .then(fetchedComments => {
                        setComments(fetchedComments);
                        //console.log(props.model.commentList);  // Update state with the fetched comments
                    })
                    .catch(error => {
                        console.error('Error fetching comments:', error);
                    });
            }
        }, [currentView, props.model.currentPokemonId, props.model.user]);
            
        function handleSubmitComment() {
            if (newCommentText.trim() !== '') {
                props.model.writeComment(props.model.user.id, props.model.currentPokemonId, newCommentText)
                    .then(() => {
                        // Optionally, fetch comments again to include the new comment
                        readCommentsFromFirebase(props.model.user.id, props.model.currentPokemonId)
                            .then(fetchedComments => {
                                setComments(fetchedComments);
                            })
                            .catch(error => {
                                console.error('Error fetching comments:', error);
                            });
    
                        // Clear the new comment text
                        setNewCommentText('');
                    })
                    .catch(error => {
                        console.error('Error writing comment:', error);
                    });
            }
        }
    
        function searchAbilityACB(){
            props.model.getAbilities(props.model.currentPokemonId);
        }

        function searchSpicies(){
            props.model.getSpecies(props.model.currentPokemonId);
            props.model.setPokemon()
        }

        function addToFavoriteListACB(){
            props.model.addToFavoriteList(props.model.currentPokemonPromiseState.data);
            props.model.addcurrentPokemonLikeNumber();
        }

        function removeFromFavoriteListACB(){
            props.model.removeFromFavoriteList(props.model.currentPokemonPromiseState.data);
            props.model.minuscurrentPokemonLikeNumber();
        }

        function addCommentACB(comment, pokemon, timestamp){// needed?
            console.log("addcomment")
            props.model.addComment(comment, pokemon, timestamp);
        }

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
        } else if(currentView === 'forum'){
            if (props.model.user===null){
                window.location.hash="#/user";
            }
            viewToShow = ( 
                <DetailsViewForum
                user={props.user}
                addComment={handleSubmitComment}
                pokemon = {props.model.currentPokemonPromiseState.data}
                comments={comments}
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