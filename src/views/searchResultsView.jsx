import "../style.css"
export function SearchResultsView(props){

    function changeToDetails(evt){
        props.detailsChosenACB(props.searchResults.id);
        window.location.hash="#/details";
    }

    return (
        <div className="searchResultsView">
            <div className="resultCard">
                {showSprite()}
                <ul>
                    <li className="resultCardName">{props.searchResults.name}</li>
                    <li><button onClick={changeToDetails}>Learn More</button></li>
                </ul>
            </div>
        </div>
    );
    function showSprite(){
        var gameName = props.queryParams.gameVersion
        //console.log("gameName", gameName)
        if (gameName === undefined || gameName === "Default Generation"){
            return shinyOrDefault(props.searchResults.sprites)
        }
        else{
            if (gameName == "red-blue"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-i"]["red-blue"])
            }
            else if (gameName == "yellow"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-i"]["yellow"])
            }
            else if (gameName == "crystal"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-ii"]["crystal"])
            }
            else if (gameName == "gold"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-ii"]["gold"])
            }
            else if (gameName == "silver"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-ii"]["silver"])
            }
            else if (gameName == "emerald"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-iii"]["emerald"])
            }
            else if (gameName == "firered-leafgreen"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-iii"]["firered-leafgreen"])
            }
            else if (gameName == "ruby-sapphire"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-iii"]["ruby-sapphire"])
            }
            else if (gameName == "diamond-pearl"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-iv"]["diamond-pearl"])
            }
            else if (gameName == "heartgold-soulsilver"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-iv"]["heartgold-soulsilver"])
            }
            else if (gameName == "platinum"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-iv"]["platinum"])
            }
            else if (gameName == "black-white"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-v"]["black-white"])
            }
            else if (gameName == "omegaruby-alphasapphire"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-vi"]["omegaruby-alphasapphire"])
            }
            else if (gameName == "x-y"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-vi"]["x-y"])
            }
            else if (gameName == "ultra-sun-ultra-moon"){
                return shinyOrDefault(props.searchResults.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"])
            }
        }
    }
    function shinyOrDefault(object){
        if (props.queryParams.defaultOrShiny == "Shiny"){
            return object.front_shiny?<img src={object.front_shiny}/>:<img className="whiteImage" alt="No available image for this pokemon"/>
        }
        else{
            return object.front_default?<img src={object.front_default}/>:<img className="whiteImage" alt="No available image for this pokemon"/>
        }
    }
}