import React from 'react'
import './Header.css'
import fcclogo from './img/freeCodeCamp.jpg'

const Header = () =>{
    return(
        <div className="header">
            <img className="logo" src={fcclogo} alt="freecodecamp logo" />
            <p className="hfont0">John Conway</p>
            <p className="hfont1">Game of Life</p>
            <p className="hfont2">4th React Challenge</p>
        </div>
    )
}

export default Header
  