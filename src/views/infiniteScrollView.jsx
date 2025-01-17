import "../style.css"
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";



export function InfiniteScrollView(props){
    window.addEventListener('scroll', handleScroll)
        function handleScroll(e){
        if (document.body.scrollTop + window.innerHeight + 500 >= e.target.documentElement.scrollHeight){
            props.setOffset(props.offset + 10);
        }
    }

    function highlightPokemonACB(evt){
        props.detailsChosenACB(evt.target.value)
        props.searchTextACB(evt.target.name)
        if (evt.target.name !== props.currentSearchName){
            props.searchNowACB()
        }
        scrollToTopACB();
    }

    function scrollToTopACB(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function cardMakerCB(pokemon, i){
        return <span key={i}>
                    <div className="resultCard">
                        <img src={pokemon.img}/>
                        <ul>
                            <li className="resultCardName">{i+1}. {pokemon.name}</li>
                            <li><button value={i+1} name={pokemon.name.toString()} onClick={highlightPokemonACB}>Search</button></li>
                        </ul>
                    </div>
                </span>;
    }
    
    return(
        <div>
            <div class="inifinite_subtitle">Other Pokémon Suggestions</div>
            <div className="favoriteList">
                <MasonryInfiniteGrid className="favoriteListContainer" gap={3}>
                    {props.pokemonData.map(cardMakerCB)}
                </MasonryInfiniteGrid>;
            </div>
        </div>     
    )
}