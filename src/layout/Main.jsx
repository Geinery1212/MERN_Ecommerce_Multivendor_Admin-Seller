import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Sidebar } from './Sidebar'

const Main = () => {
    return (
        <div className='bg-[#cdcae9] w-full min-h-screen'>
            <Header />
            <Sidebar />
            <div className='ml-0 lg:ml-[260px] pt-95px transition-all'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Main