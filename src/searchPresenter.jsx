import{SearchFormView} from "./views/searchFormView.jsx"
import{SearchResultsView} from "./views/searchResultsView.jsx"
import { observer } from "mobx-react-lite";

const Search = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function SearchRender(props){

        function setSearchNameACB(evt){
            props.model.setSearchName(evt);
        }

        function searchNowACB(){
            console.log("search");
            props.model.doSearch(props.model.searchParams);
        }

        function setSearchTypeACB(evt){
            props.model.setSearchType(evt);
        }


        function conditionalRenderingResult(promiseState){
            if(!promiseState.promise){
                return "no data"
            }
            if(promiseState.error){
                return props.model.searchResultsPromiseState.error
            }
            if(!promiseState.data){
                return <img src="https://brfenergi.se/iprog/loading.gif"></img>
            }
            return <SearchResultsView
            //resultChosenACB = {setResultChosenACB}
            searchResults={props.model.searchResultsPromiseState.data}
            />
        }

        return <div>
        <SearchFormView 
        dishTypeOptions= {[""]}
        name={props.model.searchParams.name}
        searchTypeCB={setSearchNameACB}
        searchNowACB={searchNowACB}
        setsearchTypeCB={setSearchTypeACB}
        />
        {conditionalRenderingResult(props.model.searchResultsPromiseState)}
        </div>
    }
);

export { Search };
