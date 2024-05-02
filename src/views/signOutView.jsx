import { signOutWithGoogle } from "../firebaseConfig.js"

export function SignOutView(props){

    const logoutGoogleUser = async () => {
        const response = await signOutWithGoogle();
        props.logoutUser(null);
        console.log(response);
    }
    console.log("!!!!!!!!current.user: ", props.currentUser);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div><button onClick={logoutGoogleUser}>logout </button></div>
        </div>
    )
}