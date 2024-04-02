//import {dishTypeOptions, text, type} from "/src/utilities.js";

export function SearchResultsView(props){
    //used for array rendering
    console.log("props",props);
    function searchResultsCB(dishes){
        // function clickSpanACB(evt){ 
        //     props.resultChosenACB(dishes);
        //     window.location.hash="#/details";
        // }
        // function clickImgACB(evt){ 
        //     props.resultChosenACB(dishes);
        //     window.location.hash="#/details";
        // }
        // function clickTitleACB(evt){ 
        //     props.resultChosenACB(dishes);
        //     window.location.hash="#/details";
        // }

        return <span>
                    <div>
                        {dishes.kingdom}
                        {dishes.family}
                    </div>

                </span>;
    }
    return (
        <div className="searchResultsView">
            <div>
                        {props.searchResults.result[0].kingdom}
                        {props.searchResults.name}
                    </div>
            {/* {props.searchResults.map(searchResultsCB)} */}
        </div>
    );
}