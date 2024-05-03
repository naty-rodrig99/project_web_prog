import { signOutWithGoogle } from "../firebaseModel.js"

export function SignOutView(props){

    // const logoutGoogleUser = async () => {
    //     const response = await signOutWithGoogle();
    //     props.logoutUser(null);
    //     console.log(response);
    // }
    //console.log("!!!!!!!!current.user: ", props.currentUser);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div><button onClick={signOutWithGoogle}>logout </button></div>
        </div>
    )
}