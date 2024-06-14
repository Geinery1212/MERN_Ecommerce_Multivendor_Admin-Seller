import React, { useState } from 'react'
import logo from '../../images/logo.png'
const AdminLogin = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const inputHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        console.log(data);
    }
    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>
                    <div className='h-[70px] flex justify-center items-center'>
                        <div className='w-[180px] h-[50px]'>
                            <img src={logo} alt="Logo" className='w-full h-full'/>
                        </div>
                    </div>
                    <form onSubmit={login}>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md' name='email' id='email' placeholder='Email' onChange={inputHandler} value={inputHandler.email} required />
                        </div>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md' name='password' id='password' placeholder='Password' onChange={inputHandler} value={inputHandler.password} required />
                        </div>
                        <button className='bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminLogin;
