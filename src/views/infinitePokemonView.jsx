import "../style.css"

export function InfinitePokemonView(props){
    return(
        <div>Container Div
            <div>Infinite Scroll</div>
            {props.searchPaginationACB()}
            <button onClick={testPaginationSearch}>X</button>
        </div>        
    )
    function testPaginationSearch(){
        //props.searchPaginationACB()
        console.log("paginationPromiseState", props.paginationResults)
        console.log("Object.keys", Object.keys(props.paginationResults))
        console.log(".data.results", props.paginationResults.data.results[0].name)
    }
}