import { useEffect, useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './Home'
import Home_body from './Home_body'
import SignUpForm from './sign_up';
import LoginForm from './log_in';
import { ToastContainer } from 'react-toastify';
import { auth } from './firebase';
import Ai from './AI';
import IDE from './IDE';

function App() {
  /* If page already Login then direct open that page */
  const [User, setUser] = useState();
  useEffect(() => {
   auth.onAuthStateChanged(user=>{
    setUser(user);
   })
  }, [])
  
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={User?<Navigate to="/ai"/> :<div><Home /><Home_body /></div>} />
        <Route path="/sign_up" element={<SignUpForm />} />
        <Route path="/log_in" element={<LoginForm />} />
         <Route path="/ai"  element={<Ai/>}/>
         <Route path='/ide' element={<IDE/>}/>
      </Routes>
       <ToastContainer/>
    </Router>

    </>
  )
}

export default App
