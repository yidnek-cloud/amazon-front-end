import React, { useState,useContext } from 'react'
import classes from './SignUp.module.css'
import {Link, useNavigate, useLocation} from "react-router-dom"
import { auth } from '../../Utility/firebase' 
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/action.type';
import {ClipLoader} from "react-spinners"

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
  })

        /*dataContext */
const  [{user},dispatch] = useContext(DataContext)
const navigate = useNavigate()

const navStateData = useLocation()
console.log(navStateData);



// console.log(user);
const authHandler = async(e)=>{
      e.preventDefault()
      console.log(e.target.name);
      if(e.target.name == "signin"){
//firebase auth//
    setLoading({...loading, signIn:true});
    signInWithEmailAndPassword(auth, email, password)
    .then((userInfo)=>{
    dispatch({
         type:Type.SET_USER,
         user:userInfo.user
      });
      setLoading({...loading, signIn:false})
      navigate(navStateData?.state?.redirect  || "/")
    })
      .catch((err)=> {
      setError(err.message)
      setLoading({...loading, signIn:false})
      // navigate("/");
    })
}else{
      setLoading({...loading, signUp:true})
      createUserWithEmailAndPassword(auth,email, password).then((userInfo)=>{
        console.log(user);
        dispatch({
        type:Type.SET_USER,
        user:userInfo.user
          })
          setLoading({...loading, signUp:false})
        }).catch((err)=>{  
          setError(err.message)
          setLoading({...loading, signUp:false})
          // navigate("/")
          navigate(navStateData?.state?.redirect  || "/")
        })
     }     
  }
  // console.log(password, email); 
  return (
    <section className={classes.login}>
      {/*logo */}
      <Link>
      
      <img 
      src="https://xwiki.com/en/download/company/references/amazon/amazon.jpg"
      alt=""
      />
      </Link>
      {/*form*/}
      <div className={classes.login__container}>
        
       
        <h1>sign In</h1>
        {
          navStateData?.state?.msg && (
            <small
            style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
            }}
            >
           {navStateData?.state?.msg}
         </small>
          ) }
        <form action="">
          <div>
            <lable htmlFor="email">Email</lable>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
             type="email" id="email" />
          </div>
          <div>
            <lable htmlFor="password">Password</lable>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button type="submit"
           onClick={authHandler} 
           name="signin"
           className={classes.login__signInButton}> 
          {loading.signIn ? (
  <ClipLoader color="" size={15} />
) : (
  "Sign In"
)}
           
         </button>
        </form>
        {/*agreement */}
        <p>
          By the sign-in you agree to the AMAZON FAKE CLONE condition of Use & Sale. please see Privecy Notice, our Cookies Notice and our Interest Ads Notice.
        </p>
        {/*sign up account*/}
        <button 
        type="submit" 
        onClick={authHandler} 
        name="signup"
        className={classes.login__registerButton}
        >
          
          {loading.signUp ? (
  <ClipLoader color=" red" size={25} />
) : (
  " Create your Amazon Account"
)} 
          
         </button>
        {error && <small style={{paddingTop:"5px", color:"red"}}>{error}</small>}
      </div>
        </section>
     
  ) 
}

export default Auth;