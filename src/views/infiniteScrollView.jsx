import "../style.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";



export function InfiniteScrollView(props){
    let offset = 0;
    const [pokemonData, setPokemonData] = useState([]);
    function loadMorePokemon(){
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
            .then(({data}) => {
                const newPokemon = data.results.map(pokemon => pokemon.name);
                setPokemonData(oldData => [
                    ...oldData,
                    ...newPokemon.map(name => ({
                        name: name,
                        img: null
                    }))
                ]);
                Promise.all(data.results.map(({name}) => loadImage(name)));
            })
            offset += 10;
    }

    function handleScroll(e){
        if (document.body.scrollTop + window.innerHeight >= e.target.documentElement.scrollHeight){
            loadMorePokemon()
        }
    }

    async function loadImage(name){
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemonData(oldData => {
                const newData = [...oldData];
                const index = newData.findIndex(pokemon => pokemon.name === name);
                if (index !== -1){
                    newData[index].img = data.sprites.front_default
                }
                return newData
            })
            
    }

    useEffect(() => {
        loadMorePokemon();
        window.addEventListener('scroll', handleScroll)
    }, [])

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
                    {pokemonData.map(cardMakerCB)}
                </MasonryInfiniteGrid>;
            </div>
        </div>     
    )
}