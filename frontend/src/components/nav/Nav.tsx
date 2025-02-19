import React from 'react'
import logo from "../../assets/logo.png"

const Nav: React.FC<{}> = () => {
    return (
        <nav className="bg-white drop-shadow-md container mx-auto flex justify-between items-center">
            <a href='#'>
                <img src={logo} alt='' className='w-20'/>
            </a>
            
        </nav>
    )
}

export default Nav;