import React from 'react'
import { Link } from 'react-router-dom';
import './Nav.css';
const Nav = () => {
  return (
    <div>
    <div className='nav'>
        <img className='navimg' src="image/Logo.png" alt="" />
      
    
        <Link to="/sign_up"><button className='bg bg1 '> <span><img src="image/user.png" alt="" /></span>Log In</button></Link>
        <button className='bg'> <span><img src="image/explore.png" alt="" /></span>Explore</button>
    </div>
    <hr />
   </div>
  )
}

export default Nav
