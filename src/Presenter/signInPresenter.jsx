import SignIn from "../googleSignIn/signIn";
import { auth } from "../firebaseConfig.js"

const UserPage = observer(function UserPageRender(props){
    console.log("###########current.user: ", props.user);
    return (
        <div>
            <SignIn onSignIn={props.SignIn} />
        </div>
    )
}
)

export {UserPage}