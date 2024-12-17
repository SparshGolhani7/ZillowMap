import React from 'react'
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <ul>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/Dashboard'}>Dashboard</NavLink></li>
            <li><NavLink to={'/MovableIcon'}>MovableIcon</NavLink></li>
          
        </ul>
    </nav>
  )
}

export default Navbar