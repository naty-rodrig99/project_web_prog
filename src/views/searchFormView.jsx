import "../style.css"
import "https://kit.fontawesome.com/6af1e368ac.js"

export function SearchFormView(props){
    //console.log("form",props);
    function setSearchTextACB(evt){
        props.searchTextACB(evt.target.value);
    }

    function sendSearchNowACB(evt){
        props.searchNowACB();
    }

    function setsearchTypeCB(evt){
        props.searchTypeCB(evt.target.value)
    }

    //used for array rendering
    function dishTypeOptionsCB(dishType){
        return <option key={dishType} value={dishType}>{dishType}</option>;
    }

    return (
        <div className="searchFormView">
            <div className="searchBar">
                <input type="text" value={props.text || ""} onChange={setSearchTextACB}/>
                <button onClick={sendSearchNowACB}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="searchFilter">
                <select className="versionTypeSelect" value={props.type || ""}>
                    <option value="">Choose version:</option>
                    {/* {props.dishTypeOptions.map(dishTypeOptionsCB)} */}
                </select>
                <select className="genderTypeSelect" value={props.type || ""}>
                    <option value="">Choose gender:</option>
                    {/* {props.dishTypeOptions.map(dishTypeOptionsCB)} */}
                </select>
            </div>
            
          
        </div>
    );
}