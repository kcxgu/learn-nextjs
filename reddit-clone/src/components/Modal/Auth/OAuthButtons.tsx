import React from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
    const [signInWithGoogle, _, error] = useSignInWithGoogle(auth);



    return (
        <div>
            <button onClick={() => signInWithGoogle()}>
                <img className="w-2/3 mx-auto" src="/GoogleSignIn.png" alt="sign in with Google" />
            </button>
            {error && (
                <p>
                    {error}
                </p>
            )}
        </div>
    )
}

export default OAuthButtons