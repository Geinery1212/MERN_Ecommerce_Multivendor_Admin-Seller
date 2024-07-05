import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
export const Sidebar = () => {
    return (
        <div>
            <div>

            </div>
            <div className='w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all'>
                <div className='h-[70px] flex justify-center items-center'>
                    <Link to='/' className='w-[180px] h-[50px]'>
                    <img src={logo} alt="Logo" className='w-full h-full' /></Link>
                </div>
            </div>
        </div>
    )
}
