import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import InputController from "../InputController/InputController";
import { signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithPopup, } from 'firebase/auth'

import { auth } from '../../firebase'
import './Login.css'




function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email || !values.pass) {
            setErrorMsg("*Fill all fields*");     
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);

                navigate('/home');
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
      }
      const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
          await googleSignIn();
          navigate("/home");
        } catch (error) {
          console.log(error.message);
        }
      };
    
    // const showAlert = () => {
    //       alert("Failing some issue on Google and Github login buttons");
    //     }
    return (
        <>
            <div className="container">
                <div className="innerbox">
                    <img className="starImg" src="https://starclinch.com/static/images/home/StarClinch-Logo-new.svg" />
                    <div className="heading">
                        <h1 className="h" >Welcome to StarClinch</h1>
                        
                    </div>
                    <div className="content">
                        <InputController label="" placeholder="Email Address"
                            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                        />
                        <InputController label="" placeholder="Passsword"
                            onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
                        />

                        <div className="redirect">


                            <span>
                                <Link className="link" to='/signup'>Create Account</Link>
                            </span>
                           


                        </div>
                        <b >{errorMsg}</b>
                        <button className="signIn" disabled={submitButtonDisabled} onClick={handleSubmission}>Sign in</button>
                        <div className="google">
                            <button className="other" onClick={handleGoogleSignIn}><img className="smallImg" src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1" />
                                <span>Sign in with Google</span>
                            </button>
                          

                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}
export default Login