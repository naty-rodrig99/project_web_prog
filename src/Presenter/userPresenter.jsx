import { observer } from "mobx-react-lite";
import SignIn from "../googleSignIn/signIn";

import { UserPageView } from "../views/userPageView";

const UserPage = observer(function UserPageRender(props){
    function setResultChosenACB(evt){
        props.model.setcurrentPokemonId(evt);
        console.log("EVT",evt);
      }
    return (
        <div>
            <SignIn onSignIn={props.SignIn} />
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