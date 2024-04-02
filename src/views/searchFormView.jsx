//import {dishTypeOptions, text, type} from "/src/utilities.js";

export function SearchFormView(props){
    //console.log("form",props);
    function sendSearchNameACB(evt){
        props.searchNameACB(evt.target.value);
    }

    function sendsearchNowACB(evt){
        props.searchNowACB()
    }

    //used for array rendering
    function dishTypeOptionsCB(dishType){
        return <option key={dishType} value={dishType}>{dishType}</option>;
    }
    function backToSummaryACB(){
        window.location.hash="#/summary"
      }


    return (
        <div className="searchFormView">
            <button onClick={backToSummaryACB}>Back to summary</button>
            <td>Search for a recipe:</td>

            <input type="text" value={props.text || ""} onChange={sendSearchNameACB}/>
            <button onClick={sendsearchNowACB}>Search!</button>
          
        </div>
    );
}