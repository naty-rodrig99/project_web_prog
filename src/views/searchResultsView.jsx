//import {dishTypeOptions, text, type} from "/src/utilities.js";

export function SearchResultsView(props){
    //used for array rendering
    console.log("props",props);
    return (
        <div className="searchResultsView">
            <div>
                        {props.searchResults.name}
                        {props.searchResults.result}
            </div>
        </div>
    );
}