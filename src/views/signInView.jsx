import { signInWithGooglePopup} from "../firebaseModel.js"

export function SignInView(props){
    function backtoLastPage(evt){
        history.back();
    }

    // const logGoogleUser = async () => {
    //     const response = await signInWithGooglePopup();
    //     //props.loginUser(response.user.uid);

    //     //console.log(response);
    // }
    // // onAuthStateChanged(auth, loginOrOutACB);
    // // function loginOrOutACB(user){
    // // // demo render:
    // // //appDiv.innerHTML="user "+(user?" ID "+user.uid:user);
    // // //appDiv.innerHTML= auth.currentUser;  // should be undefined
    // //     model.user= user
    // //     console.log("firebase,, have user", model.user)
    // // // readFromFirebase
    // // }
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