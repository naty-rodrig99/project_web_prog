import { DetailsView } from "./views/detailsView";
import { observer } from "mobx-react-lite";

const Details = observer(
    function DetialsRender(props){
        return <DetailsView
        pokemon = {props.model.setCurrentAnimalId(10)}
        //pokemon = {props.model.currentAnimalPromiseState.data}
        />

    }
    )

export {Details}