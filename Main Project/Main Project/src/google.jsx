import React from 'react'
import './google.css'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth,db } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify'

const google = () => {

   const google_login= function googlelogin(){
        const provider=new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(async (result)=>{
            if(result.user){
                const user=result.user;
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: user.displayName,
                    photo: user.photoURL,
                    lastName: "",
                  });
                toast.success("Login Successfully", {
                                position: "top-center",
                            });
                window.location.href="/ai";
            }
        })
    }
  return (
    <div>
      <p className='another'>---Or Continue with ---</p>
      <div className="opt" onClick={google_login}>
        <img src="./image/google.png" />
      </div>
    </div>
  )
}

export default google
