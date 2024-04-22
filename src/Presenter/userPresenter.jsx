import { observer } from "mobx-react-lite";

import { UserPageView } from "../views/userPageView";

const UserPage = observer(function UserPageRender(props){
    function setResultChosenACB(evt){
        props.model.setcurrentPokemonId(evt);
        console.log("EVT",evt);
      }
    return (
        <div>
            <UserPageView
                favoriteList={props.model.favoriteList}
                promise={props.model.currentPokemonPromiseState}
                detailsChosenACB = {setResultChosenACB}
            />
        </div>
    )
}
)

export {UserPage}