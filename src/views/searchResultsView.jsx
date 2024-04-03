import "../style.css"
export function SearchResultsView(props){
    console.log("props",props);
    return (
        <div className="searchResultsView">
            <div className="resultCard">
                    {props.searchResults.name}
                    <br></br>
                    <img src={props.searchResults.sprites.front_default}></img>
                    <button>Learn More</button>
            </div>
        </div>
    );
}