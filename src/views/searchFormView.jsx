import "../style.css"
import "https://kit.fontawesome.com/6af1e368ac.js"

export function SearchFormView(props){
    function setSearchTextACB(evt){
        props.searchTextACB(evt.target.value);
    }

    function handleEnterACB(evt){
        if (evt.key === 'Enter'){
            props.searchNowACB()
        }
    }

    function sendSearchNowACB(){
        props.searchNowACB();
    }

    function dropDownDefaultOrShinyACB(evt){
        props.setDefaultOrShiny(evt.target.value)
        props.searchNowACB()
    }
    function dropDownGameVersionACB(evt){
        props.setGameVersion(evt.target.value)
        props.searchNowACB()
    }

    function renderOptionsCB(optionTypes){
        return <option value={optionTypes}>{optionTypes}</option>
    }

    function renderTestCB(object){
        return <optgroup label={object.optionGroup}>
        {object.options.map(renderOptionsCB)}
        </optgroup>
    }

    return (
        <div>
            <div className="main_title_container">
                <span class="main_title">Welcome to </span>
                <span class="main_title2">The Pokémon Encyclopedia!</span>
            </div> 
            <div class="main_subtitle">Discover Pokémon</div>
            <div className="main_text">Explore our extensive database of Pokémon species. With our powerful search feature, finding your favorite Pokémon has never been easier. From classic starters like Pikachu to legendary titans like Arceus, we've got them all!</div>
            <div className="searchFormView">
                <div className="searchBar">
                    <input type="text" value={props.text || ""} onKeyDown={handleEnterACB} onChange={setSearchTextACB}/>
                    <button onClick={sendSearchNowACB}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="searchFilter">
                    {<select className="versionTypeSelect" value={props.queryParams.defaultOrShiny || ""} onChange={dropDownDefaultOrShinyACB}>
                        {props.searchOptions.spriteOptions.map(renderOptionsCB)}
                    </select> }
                    <select value={props.queryParams.gameVersion  || ""} onChange={dropDownGameVersionACB}>
                        {props.searchOptions.generationGames.map(renderTestCB)}
                    </select>
                </div>
            </div>
        </div>
    );
}