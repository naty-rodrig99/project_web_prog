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

    // array rendering
    function dropDownACB(evt){
        props.setDefaultOrShiny(evt.target.value)
        props.searchNowACB()
    }

    function renderOptionsCB(optionTypes){
        return <option value={optionTypes}>{optionTypes}</option>
    }

    return (
        <div className="searchFormView">
            {/* <div className="mainPagePic"> <img alt="picture of pokemon" src="https://wallpapers-clan.com/wp-content/uploads/2023/10/cute-pikachu-flowers-pokemon-desktop-wallpaper-cover.jpg"></img></div> */}
            <div className="searchBar">
                <input type="text" value={props.text || ""} onKeyDown={handleEnterACB} onChange={setSearchTextACB}/>
                <button onClick={sendSearchNowACB}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="searchFilter">
                <select className="versionTypeSelect" value={props.queryParams.defaultOrShiny || ""} onChange={dropDownACB}>
                    {props.searchOptions.map(renderOptionsCB)}
                </select>
                <select className="genderTypeSelect" value={props.type || ""}>
                    <option value="">Choose gender:</option>
                </select>
            </div>
        </div>
    );
}