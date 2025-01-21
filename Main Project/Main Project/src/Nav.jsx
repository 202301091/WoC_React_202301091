import React from 'react'
import './Nav.css';
const Nav = () => {
  return (
    <div>
    <div className='nav'>
        <img className='navimg' src="image/Logo.png" alt="" />
      
    
        <button className='bg bg1 '> <span><img src="image/user.png" alt="" /></span>Log In</button>
        <button className='bg'> <span><img src="image/explore.png" alt="" /></span>Explore</button>
    </div>
    <hr />
   </div>
  )
}

export default Nav
