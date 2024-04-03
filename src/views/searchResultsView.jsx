import "../style.css"
export function SearchResultsView(props){
    return (
        <div className="searchResultsView">
            <div className="resultCard">
                {spriteDefaultOrShinyACB()}
                <ul>
                    <li className="resultCardName">{props.searchResults.name}</li>
                    <li><button>Learn More</button></li>
                </ul>
            </div>
        </div>
    );
    function spriteDefaultOrShinyACB(){
        if (props.queryParams.defaultOrShiny == "Shiny"){
            return <img src={props.searchResults.sprites.front_shiny}/>
        }
        else{
            return <img src={props.searchResults.sprites.front_default}/>
        }
    }
}