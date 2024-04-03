//import {dishTypeOptions, text, type} from "/src/utilities.js";

export function SearchFormView(props){
    //console.log("form",props);
    function sendSearchTextACB(evt){
        props.searchTextACB(evt.target.value);
    }

    function sendsearchNowACB(evt){
        props.searchNowACB();
    }

    //used for array rendering
    function dishTypeOptionsCB(dishType){
        return <option key={dishType} value={dishType}>{dishType}</option>;
    }

    return (
        <div className="searchFormView">
            <td>Search for a pokenmon:</td>

            <input type="text" value={props.text || ""} onChange={sendSearchTextACB}/>
            <button onClick={sendsearchNowACB}>Search!</button>
          
        </div>
    );
}