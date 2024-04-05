import React from 'react'
import './css/nav.css'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <div className='nav'>
      <div className='nav1'>
        <Link className='link' to="/">Home</Link>
      </div>
      <div className='nav2'>
      <Link className='link' to="/Register">Register</Link>
      <Link className='link' to="/Login">Login</Link>
      </div>
    </div>
  )
}

export default Nav