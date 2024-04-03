export function SearchFormView(props){
    //console.log("form",props);
    function setSearchTextACB(evt){
        props.searchTextACB(evt.target.value);
    }

    function sendSearchNowACB(evt){
        props.searchNowACB();
    }

    //used for array rendering
    function dishTypeOptionsCB(dishType){
        return <option key={dishType} value={dishType}>{dishType}</option>;
    }

    return (
        <div className="searchFormView">
            <td>Search for a pokémon:</td>

            <input type="text" value={props.text || ""} onChange={setSearchTextACB}/>
            <button onClick={sendSearchNowACB}>Search!</button>
          
        </div>
    );
}