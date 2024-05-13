import { NavbarView } from "../views/navbarView.jsx";
import { observer } from "mobx-react-lite";
import React from "react"; 

const Navigator = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function NavbarRender(props){

        console.log("props", props.model.user)
        return <NavbarView
            user={props.model.user}
        />;
    }
);

export { Navigator };