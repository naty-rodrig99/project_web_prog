
import "../style.css"
import "https://kit.fontawesome.com/6af1e368ac.js"
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";

export function UserPageView(props){

    //used for array rendering
    function favoriteListCB(pokemon){
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
            <div className="team_view1_title">My Favorite Pokemons</div>
            <div className="team_Msg">You can create teams with your favorite pokemons</div>
            <div className="favoriteList">
            <MasonryInfiniteGrid
            className="favoriteListContainer"
            gap={3}
            >
                {props.favoriteList.map(favoriteListCB)}
            </MasonryInfiniteGrid>;
            {/* <ul>
            {props.favoriteList.map(favoriteListCB)}
            </ul> */}
            </div>
            
            
        </div>
    );
}