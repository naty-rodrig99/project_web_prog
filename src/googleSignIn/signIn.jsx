import { signInWithGooglePopup } from "../firebaseConfig.js"
import { GoogleButton } from 'react-google-button';

const SignIn = () => {
    const logGoogleUser = async () => {
            const response = await signInWithGooglePopup();
            console.log(response);
        }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div>
            <GoogleButton onClick={logGoogleUser}>Sign In With Google</GoogleButton>
        </div>
    </div>
        )
    }
    export default SignIn;