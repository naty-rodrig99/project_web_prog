import { signOutWithGoogle } from "../firebaseModel.js"

export function SignOutView(props){

    return (
        <div className="signInOutArea">
                <button className="signInOutButton" onClick={signOutWithGoogle}>Sign Out </button>
        </div>
    )
}