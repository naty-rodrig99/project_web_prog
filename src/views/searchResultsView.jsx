import "../style.css"
export function SearchResultsView(props){

    console.log("props!!!!!!!!!!!", props);
    function changeToDetails(){
        props.detailsChosenACB(props.searchResults.id);
        window.location.hash="#/details";
    }

    return (
        <div className="searchResultsView">
            <div className="resultCard">
                {spriteDefaultOrShinyACB()}
                <ul>
                    <li className="resultCardName">{props.searchResults.name}</li>
                    <li><button onClick={changeToDetails}>Learn More</button></li>
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