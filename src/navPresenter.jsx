import { NavbarView } from "./views/navbarView.jsx";
import { observer } from "mobx-react-lite";

const Navigator = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function NavbarRender(props){

        return <NavbarView/>;
    }
);

export { Navigator };