
import "../style.css"
import "https://kit.fontawesome.com/6af1e368ac.js"
import { searchPokemon} from '../pokemonSource.js';
import {resolvePromise} from '../resolvePromise.js';

export function UserPageView(props){

    //used for array rendering
    function favoriteListCB(pokemon){
        //pokemon={};
        //resolvePromise(searchPokemon(pokemonID), {});
        //pokemon= pokemon.data;
        //console.log("userPage pokemon: ", pokemon);
        function changeToDetails(evt){
            props.detailsChosenACB(pokemon.id);
            window.location.hash="#/details";
        }

        return <span key={pokemon.id}>
                    <div className="resultCard">
                        <img src={pokemon.sprites.front_default}/>
                        <ul>
                            <li className="resultCardName">{pokemon.name}</li>
                            <li><button onClick={changeToDetails}>Learn More</button></li>
                        </ul>
                    </div>

                </span>;
    }

    return (
        <div>
            <div class="favoriteList">
            <ul>
            {props.favoriteList.map(favoriteListCB)}
            </ul>
            </div>
            
            
        </div>
    );
}