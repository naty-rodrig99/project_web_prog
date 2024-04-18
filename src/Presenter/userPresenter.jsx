import { observer } from "mobx-react-lite";

import { UserPageView } from "../views/userPageView";

const UserPage = observer(function UserPageRender(props){
    return (
        <div>
            <UserPageView
                favoriteList={props.model.favoriteList}
                promise={props.model.currentPokemonPromiseState}
            />
        </div>
    )
}
)

export {UserPage}