import React, { useState } from 'react';
import './sign_up.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth, db } from "./firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Google from './google';
const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName,
          lastName,
        });
      }
      toast.success("Registered Successfully", {
        position: "top-center",
      });
    } catch (error) {
        toast.error(error.message, {
            position: "bottom-center",
          });    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="info height">
        <h4>Sign-Up</h4>

        <div className="ele">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email" 
            placeholder="Enter the Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="ele">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter the Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="ele">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            placeholder="Enter the First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="ele">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            placeholder="Enter the Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit">Submit</button>

        <p>
          You are already <Link to="/log_in"><span>log in</span></Link>
        </p>
        <Google/>
      </div>
    </form>
  );
};

export default SignUpForm;
