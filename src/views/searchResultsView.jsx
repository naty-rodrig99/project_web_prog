import "../style.css"
export function SearchResultsView(props){
    return (
        <div className="searchResultsView">
            <div className="resultCard">
                    {props.searchResults.name}
                    <br></br>
                    {spriteDefaultOrShinyACB()}
                    <button>Learn More</button>
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