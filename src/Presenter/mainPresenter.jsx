import { observer } from "mobx-react-lite";

import { SearchResultsView } from "../views/searchResultsView";
import { SearchFormView } from "../views/searchFormView";
import { InfiniteScrollView } from "../views/infiniteScrollView";
import { useState, useEffect } from "react";

const Main = observer(function MainRender(props){
    const [pokemonData, setPokemonData] = useState([]);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
      loadPokemonACB(offset, setPokemonData)
  }, [offset])

    return (
        <div>
            <SearchFormView
                queryParams = {props.model.queryParams}
                searchOptions = {{spriteOptions: ["Default", "Shiny"], 
                  generationOptions: ["generation-i", "generation-ii", "generation-iii", "generation-iv", "generation-v", "generation-vi", "generation-vii", "generation-viii"],
                  generationGames: [
                    /*
                    {
                      optionGroup: "Filter By Generation",
                      options: ["Default Generation"]
                    },
                    */
                    {
                      optionGroup: "generation-i",
                      options: ["red-blue", "yellow"]
                    },
                    {
                      optionGroup: "generation-ii",
                      options: ["crystal", "gold", "silver"]
                    },
                    {
                      optionGroup: "generation-iii",
                      options: ["emerald", "firered-leafgreen", "ruby-sapphire"]
                    },
                    {
                      optionGroup: "generation-iv",
                      options: ["diamond-pearl", "heartgold-soulsilver", "platinum"]
                    },
                    {
                      optionGroup: "generation-v",
                      options: ["black-white"]
                    },
                    {
                      optionGroup: "generation-vi",
                      options: ["omegaruby-alphasapphire", "x-y"]
                    },
                    {
                      optionGroup: "generation-vii",
                      options: ["ultra-sun-ultra-moon"]
                    }
                  ]
                  }
                }
                setDefaultOrShiny = {setDefaultOrShinyACB}
                setGameVersion = {setGameVersionACB}
                text={props.model.searchParams.name}
                searchTextACB = {setSearchTextACB}
                searchNowACB = {searchACB}
                detailsChosenACB = {setResultChosenACB}
            />
            {conditionalRender(props.model.searchResultsPromiseState)}
            <InfiniteScrollView
              detailsChosenACB = {setDetailsChosenACB}
              searchTextACB = {setSearchTextACB}
              searchNowACB = {searchACB}
              currentSearchName = {props.model.searchParams.name}
              loadMorePokemon = {loadPokemonACB}
              reset = {resetOffsetCB}
              pokemonData = {pokemonData}
              setPokemonData = {setPokemonData}
              offset = {offset}
              setOffset = {setOffsetACB}
            />
        </div>
    )

    function setOffsetACB(value){
      setOffset(value)
    }

    function resetOffsetCB(){
      props.model.resetOffset()
    }

    function loadPokemonACB(offset, setPokemonData){
      props.model.loadMorePokemon(offset, setPokemonData)
    }

    function setResultChosenACB(evt){
        props.model.setcurrentPokemonId(evt);
        console.log("EVT",evt);
      }
    function setDefaultOrShinyACB(evt){
        props.model.setQueryTypeDefaultOrShiny(evt)
    }
    function setGameVersionACB(evt){
      props.model.setQueryPokemonGameVersion(evt)
    }
    function setSearchTextACB(evt){
        props.model.setSearchText(evt);
    }
    function searchACB(){
        props.model.doSearch(props.model.searchParams.name);
    }
    function setDetailsChosenACB(evt){
      props.model.setcurrentPokemonId(evt)
      }

    function conditionalRender(promiseState) {
        function promiseNoData(promiseState) {
          if (promiseState == null || promiseState.promise == null) {
            return <div>No Pokémon that matches your search string was found. <br/> Try using the full Pokémon name or its pokedex number.</div>;
          } else if (promiseState.error == null) {
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>;
          } else {
            return <div>{String(promiseState.error)}</div>;
          }
        }
        function promiseHasData(promiseState) {
          if (promiseState.data != null) {
            return (
              <SearchResultsView
                searchResults={promiseState.data}
                queryParams = {props.model.queryParams}
                detailsChosenACB = {setDetailsChosenACB}
              />
            );
          }
        }
        return promiseHasData(promiseState) || promiseNoData(promiseState);
      }
}
)

export {Main}