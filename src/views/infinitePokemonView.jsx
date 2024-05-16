import "../style.css"
import { useEffect, useState } from "react";

export function InfinitePokemonView(props){
    const offSet = 20;
    const limit = 20;
    props.searchPaginationACB(offSet, limit)
    const [pokemon, setPokemon] = useState([]);
    let promiseState = {};

    const handleScroll = (e) => {
        //console.log("top:", document.body.scrollTop)
        //console.log("win:", window.innerHeight)
        //console.log("Height:", e.target.documentElement.scrollHeight)
        //console.log("sum", window.innerHeight + document.body.scrollTop)
    }
    useEffect(() => {
        //window.addEventListener("scroll", handleScroll);
    }, [])
    return(
        <div>Container Div
            <div>Infinite Scroll</div>
            <button onClick={testPaginationSearchACB}>X</button>
            <button onClick={testFunctionACB}>Y</button>

            {pokemon.map((pokemon, i) => {
            return <div key={i}>{pokemon.name}</div>
        })}
        </div>        
    )

    function renderPokemons(){
        pokemon.map((pokemon, i) => {
            let prms = {};
            prms = props.getImage(pokemon.name)
            return <div key={i}>{pokemon.name}{conditionalRender(prms)}</div>
        })
    }
    function conditionalRender(promiseState) {
        function promiseNoData(promiseState) {
          if (promiseState == null || promiseState.promise == null) {
            return <div>No data</div>;
          } else if (promiseState.error == null) {
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>;
          } else {
            return <div>{String(promiseState.error)}</div>;
          }
        }
        function promiseHasData(promiseState) {
          if (promiseState.data != null) {
            return (
                <img src={promisteState.data.sprites.front_default}/>
            );
          }
        }
        return promiseHasData(promiseState) || promiseNoData(promiseState);
      }

    function testFunctionACB(){
        const newPokemon = []
        props.paginationPromiseState.data.results.forEach((pokemon) => newPokemon.push(pokemon))
        setPokemon(newPokemon)
        //console.log("pokemon", pokemon)
        //console.log("promiseState.data.sprites.front_default", promiseState.data.sprites.front_default);
        //console.log("model.pokemons", props.test)
    }

    function testPaginationSearchACB(){
        props.paginationPromiseState.data.results.forEach( (pokemon) => console.log("props.paginationPromiseState.data.results", pokemon.name))
    }
}