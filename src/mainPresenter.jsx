import { MainView } from "./views/mainView";
import { NavbarView } from "./views/navbarView";
import { observer } from "mobx-react-lite";

const Main = observer(function MainRender(props){
    console.log("props",props);
    return (
        <div>
            <MainView
                test = {setTestACB}
                search = {searchACB}
            />
            {conditionalRenderingResult(props.model.searchResultsPromiseState)}
        </div>
    )
    function setTestACB(evt){
        props.model.animals(evt)
    }
    function searchACB(evt){
        props.model.doSearch(evt);
    }
    function conditionalRenderingResult(promiseState){
        if(!promiseState.promise){
            return "no data"
        }
        if(promiseState.error){
            return props.model.searchResultsPromiseState.error
        }
        if(!promiseState.data){
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }
    }
}
)

export {Main}