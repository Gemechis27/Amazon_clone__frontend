import React,{useState, useContext} from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/images/amazon_PNG7.png'
import { Link, useNavigate } from 'react-router-dom'
import classes from './Auth.module.css'
import { auth } from '../../Utility/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword}  from 'firebase/auth'
import { DataContext }  from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type';
import {ClipLoader } from 'react-spinners'





function Auth () {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
});


  const [{user}, dispatch]=useContext(DataContext)
  console.log(user);
  const navigate =useNavigate();
  const navStateData=useLocation();
  console.log(navStateData);
  
 const authHandle= async (e)=>{
 e.preventDefault();
  console.log(e.target.name);
  
 if (e.target.name=='signin'){
  setLoading({...loading, signin:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
       dispatch ({

           type: Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading, signIn:false})
        navigate( navStateData?.state?.redirect || "/");
      }).catch((err)=>{
        setError(err.message);
        setLoading({...loading, signIn:false})
              })

 }else {
  setLoading({...loading, signUp:false})
  navigate()
   createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
    dispatch ({

           type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading, signUp:false})
         navigate( navStateData?.state?.redirect || "/");

     
   }).catch((err)=>{
   setError(err.message);
   setLoading({...loading, signUp:false})
    
    
   })
 }
 
 };



  return (

       <section className={classes.login}>
        <Link to="/">
         <img src={logo} alt=''/>
        </Link>
         
   
      <div className={classes.login_container}>
         <h1>Sign-in</h1>
         {
          navStateData?.state?.msg && (
            <small
              style={{
                padding:"5px",
                textAlign:"center",
                color:"red",
                fontWeight:"bold"
              }}
              >
                {navStateData?.state?.msg}
            </small>
          )
         }
        <form action="#">
          <div>

          <label htmlFor="email">Email</label> <br/>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" required />

          </div>
          
          <div>

           <label htmlFor="password" >Password</label> <br/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' id='password' placeholder='enter your password'/> 
 

          </div>

          {/* <button  
           type='submit'
           name='signin'
           onClick={authHandle} 
           className={classes.signIn_button}>
            {
            loading.signIn ? ( ClipLoader color="#2ac85c", size={15}</ClipLoader>):("Sign-In")
           }
            
          </button> */}
          

<button  
  type='submit'
  name='signin'
  onClick={authHandle} 
  className={classes.signIn_button}
>
  {
    loading.signIn 
      ?<ClipLoader   color="#fff" size={50} ></ClipLoader> 
      : ("Sign-In")
  }
</button>

          
         
        </form>
               {/* Agrements */}
               
                <p>
                  By signing in you agree to the AMAZON FAKE CLONE condition of use &
                  sale.Please see our privicy Notice, our cookies Notice and our 
                  Intrest-Based Ads Notice
                </p>
                <button 
                type='submit'
                name='signup' 
                onClick={authHandle} className={classes.signIn_create_Button}>
                 
                   {
            loading.signIn ? ( <ClipLoader> color="#000", size={15}</ClipLoader>):(" Create Your Amazon Account")
           }
                  
                
                </button>
                {
                  error && <small style={{ paddingTop:"50px",color:"red"}}>
                    {error}
                  </small>
                }
               
      </div>
       
       
       </section>
   
  )
}

export default Auth