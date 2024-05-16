import { observer } from "mobx-react-lite";
import React from "react"; 
import { UserPageView } from "../views/userPageView";
import { SignInView } from "../views/signInView";
import { SignOutView } from "../views/signOutView";

const UserPage = observer(function UserPageRender(props){

    function setResultChosenACB(evt){
        props.model.setcurrentPokemonId(evt);
      }

    function setUser(user){
        props.model.setUser(user);
    }


    let viewToShow;
    if(props.model.user===null){
        viewToShow = ( 
            <div className="signInorOutView">
                <SignInView
                loginUser={setUser}
                />
            </div>
        );
    }

    else{
        viewToShow = ( 
            <div className="signInorOutView">
            <SignOutView
                currentUser={props.model.user}
                logoutUser={setUser}
            />
            <UserPageView
                favoriteList={props.model.favoriteList}
                promise={props.model.currentPokemonPromiseState}
                detailsChosenACB = {setResultChosenACB}
            />
            </div>
        );

    }

    return <>
        <div>
            {viewToShow}
        </div>
        </>
}
)

export {UserPage}