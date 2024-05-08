import { signOutWithGoogle } from "../firebaseModel.js"

export function SignOutView(props){

    // const logoutGoogleUser = async () => {
    //     const response = await signOutWithGoogle();
    //     props.logoutUser(null);
    //     console.log(response);
    // }
    //console.log("!!!!!!!!current.user: ", props.currentUser);

    return (
        <div className="signInOutArea">
                <button className="signInOutButton" onClick={signOutWithGoogle}>Sign Out </button>
        </div>
    )
}