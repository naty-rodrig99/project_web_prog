import { MainView } from "./views/mainView";
import { NavbarView } from "./views/navbarView";
import { observer } from "mobx-react-lite";

const Main = observer(function MainRender(props){
    console.log(props);
    return (
    <div>
        <NavbarView/>
        <MainView
            test = {props.model.animals}
            search = {props.model.doSearch}
        />
    </div>
    )
}
)

export {Main}