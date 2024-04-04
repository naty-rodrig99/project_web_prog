import { observer } from "mobx-react-lite";

import { SearchResultsView } from "./views/searchResultsView";
import { SearchFormView } from "./views/searchFormView";

const Main = observer(function MainRender(props){
    return (
        <div>
            <SearchFormView
                queryParams = {props.model.queryParams}
                searchOptions = {["Default", "Shiny"]}
                setDefaultOrShiny = {setDefaultOrShinyACB}
                text={props.model.searchParams.name}
                searchTextACB = {setSearchTextACB}
                searchNowACB = {searchACB}
                detailsChosenACB = {setResultChosenACB}
            />
            {conditionalRender(props.model.searchResultsPromiseState)}
        </div>
    )
    function setResultChosenACB(evt){
        props.model.setcurrentPokemonId(evt);
        console.log("EVT",evt);
      }
    function setDefaultOrShinyACB(evt){
        props.model.setQueryTypeDefaultOrShiny(evt)
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