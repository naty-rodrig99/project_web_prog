import { signInWithGooglePopup} from "../firebaseModel.js"

export function SignInView(props){
    function backtoLastPage(evt){
        history.back();
    }

    return (
        <div>
             <button className="team_backbutton" onClick={backtoLastPage}>Back</button>
            <div className="signInNotification">
                You have to signin first to use the further functions!
            </div>
        
            <div className="signInOutArea">
                <button className="signInOutButton" onClick={signInWithGooglePopup}>Sign in with Google</button>
            </div>
        </div>
    )

}