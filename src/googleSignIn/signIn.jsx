import { signInWithGooglePopup, signOutWithGoogle } from "../firebaseConfig.js"
import { GoogleButton } from 'react-google-button';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    const logoutGoogleUser = async () => {
        const response = await signOutWithGoogle();
        console.log(response);
    }
    console.log("!!!!!!!!current.user: ", props.currentUser);
    if(auth.currentUser!==undefined){
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div><button onClick={logoutGoogleUser}>logout </button></div>
            </div>
        )
    }
    else{
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div>
                 <button onClick={logGoogleUser}>login</button>
            </div>
        </div>
            )
    }
    // return (
    //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    //     <div>

    //         {/* { auth.currentUser? <GoogleButton>logout </GoogleButton> : <GoogleButton onClick={logGoogleUser}>login</GoogleButton>} */}
            
    //     </div>
    // </div>
    //     )
    }
    export default SignIn;