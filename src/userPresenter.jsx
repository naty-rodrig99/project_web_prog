import { observer } from "mobx-react-lite";

import { UserPageView } from "./views/userPageView";

const UserPage = observer(function UserPageRender(props){
    return (
        <div>
            <UserPageView
            />
        </div>
    )
}
)

export {UserPage}