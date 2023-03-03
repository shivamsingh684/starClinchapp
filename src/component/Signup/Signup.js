import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import InputController from "../InputController/InputController";
import{createUserWithEmailAndPassword,updateProfile, GoogleAuthProvider,
    signInWithPopup,} from 'firebase/auth'
import {auth} from '../../firebase'
import '../Login/Login.css'
function Signup() {
    const navigate=useNavigate();
    const [values,setValues]=useState({
        name:'',
        email:'',
        pass:''
    });
    
    const [errorMsg,setErrorMsg]=useState("")
    const [submitButtonDisable,setSubmitButtonDisable]=useState(false)
    const handel=()=>{
        if(!values.name || !values.email ||!values.pass){
            setErrorMsg('*Fill all fields*');
            return;
        }
        setErrorMsg('')
        setSubmitButtonDisable(true)
        createUserWithEmailAndPassword(auth,values.email,values.pass).then(
            (res) => {
                setSubmitButtonDisable(false);
                const user=res.user;
                updateProfile(user,{
                    displayName:values.name
                })
             navigate('/home')
            })
            .catch((err) => {
                setSubmitButtonDisable(false)
                setErrorMsg(err.message)
            })
    }
    // const showAlert = () => {
    //     alert("Failing some issue on Google and Github signup buttons");
    //   }
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

    return (
      <>
         <div className="container">
             <div className="innerbox2">
             <img className="starImg" src="https://starclinch.com/static/images/home/StarClinch-Logo-new.svg"/>
             <div className="heading">
                 <h1 className="h">Welcome to StarClinch</h1>
                
                 </div>
                 <div className="content">
                 <InputController label="" placeholder="Enter your name"
                    onChange={event=>setValues(prev=>({...prev,name:event.target.value}))}
                 />
                 <InputController label="" placeholder="Enter your email address"
                    onChange={event=>setValues(prev=>({...prev,email:event.target.value}))}
                 />
                 <InputController label="" placeholder="Enter Passsword"
                    onChange={event=>setValues(prev=>({...prev,pass:event.target.value}))}
                 />
 
                 <div className="redirect">
                     
                    <p>
                      Already have an account?{" "}
                       <span className="link">
                       <Link style={{textDecoration: 'none',color:'black'}} to ='/'>Login</Link>
                       </span>
                    </p>
                     
                 </div>
                 <b>{errorMsg}</b>
                 <button className="signIn" onClick={handel} disabled={submitButtonDisable}>Create Account</button>
                 <div className="google">
                     <button className="other" onClick={handleGoogleSignIn}><img className="smallImg" src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"/>
                     <span>Sign up in with Google</span>
                    </button>
                   
                     
                 </div>
                 </div>
 
             </div>
         </div>
      </>
    )
    
 }
export default Signup