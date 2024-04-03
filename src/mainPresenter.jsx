import { observer } from "mobx-react-lite";

import { MainView } from "./views/mainView";
import { SearchResultsView } from "./views/searchResultsView";
import { SearchFormView } from "./views/searchFormView";

const Main = observer(function MainRender(props){
    return (
        <div>
            {/* <MainView
                test = {setTestACB}
                search = {searchACB}
            /> */}
            <SearchFormView
                text={props.model.searchParams}
                searchTextACB = {setSearchTextACB}
                searchNowACB = {searchACB}
            />
            {conditionalRender(props.model.searchResultsPromiseState)}
        </div>
    )
    function setSearchTextACB(evt){
        //console.log("props,model", props.model);
        props.model.setSearchText(evt);
    }
    function searchACB(evt){
      props.model.doSearch(props.model.searchParams);
    }
    function conditionalRender(promiseState) {
        function promiseNoData(promiseState) {
          if (promiseState == null || promiseState.promise == null) {
            return <div>No data</div>;
          } else if (promiseState.error == null) {
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>;
          } else {
            return <div>{String(promiseState.error)}</div>;
          }
        }
        function promiseHasData(promiseState) {
          if (promiseState.data != null) {
            return (
              <SearchResultsView
                searchResults={promiseState.data}
                //userSearchDish={userSearchDish}
              />
            );
          }
        }
        return promiseHasData(promiseState) || promiseNoData(promiseState);
      }
}
)

export {Main}