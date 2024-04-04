import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Home from "./home";

function SignIn() {
    const [value, setValue] = useState('');

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
        });
    };

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            {value ? <Home /> :
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}>
                <button onClick={handleClick} style={{
                    padding: '10px 20px',
                    borderRadius: '20px',
                    border: 'none',
                    background: 'blue',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>Sign in With Google</button>
            </div>
            }
        </div>
    );
}

export default SignIn;
