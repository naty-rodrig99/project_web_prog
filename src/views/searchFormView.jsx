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
        console.log("queryParams.gameVersion:", props.queryParams)
        console.log("dropDownGameVersionACB", evt)
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
        <div className="searchFormView">
            <div className="searchBar">
                <input type="text" value={props.text || ""} onKeyDown={handleEnterACB} onChange={setSearchTextACB}/>
                <button onClick={sendSearchNowACB}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="searchFilter">
                <select className="versionTypeSelect" value={props.queryParams.defaultOrShiny || ""} onChange={dropDownDefaultOrShinyACB}>
                    {props.searchOptions.spriteOptions.map(renderOptionsCB)}
                </select>
                <select value={props.queryParams.gameVersion  || ""} onChange={dropDownGameVersionACB}>
                    {props.searchOptions.generationGames.map(renderTestCB)}
                </select>
            </div>
        </div>
    );
}