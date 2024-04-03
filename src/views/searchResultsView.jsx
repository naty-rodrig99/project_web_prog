export function SearchResultsView(props){
    console.log("props",props);
    return (
        <div className="searchResultsView">
            <div>
                        {props.searchResults.name}
                        <br></br>
                        <img src={props.searchResults.sprites.front_default}></img>
            </div>
        </div>
    );
}