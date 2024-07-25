import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { messageClear, seller_register } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
const Register = () => {
    const navigate =useNavigate();    
    const dispatch = useDispatch();

    const { loader, errorMessage, successMessage } =
        useSelector(state => state.auth);

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const inputHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault();
        dispatch(seller_register(data));
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);

    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
            <div className='w-[350px] text-[#ffffff] p-2'>
                <div className='bg-[#6f68d1] p-4 rounded-md'>
                    <h2 className='text-xl mb-3 font-bold'>Welcome to Ecommerce</h2>
                    <p className='text-sm mb-3 font-medium'>Please register your account</p>
                    <form onSubmit={register}>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md' name='name' id='name' placeholder='Name' onChange={inputHandler} value={data.name} required />
                        </div>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md' name='email' id='email' placeholder='Email' onChange={inputHandler} value={data.email} required />
                        </div>
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md' name='password' id='password' placeholder='Password' onChange={inputHandler} value={data.password} required />
                        </div>
                        <div className="flex items-center w-full gap-3 mb-3">
                            <input type="checkbox" id='checkbox' name='checkbox' className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500' required/>
                            <label htmlFor="checkbox">I agree to privacy and terms</label>
                        </div>
                        <button className='bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3' disabled={loader ? true : false}>
                            {
                                loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}></PropagateLoader> : 'Sign Up'
                            }
                        </button>
                        <div className='flex items-center justify-center mb-3 gap-3'>
                            <p>Already have an account? <Link to="/login" className="font-bold">Sign In</Link></p>
                        </div>
                        <div className='w-full flex items-center justify-center mb-3'>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                            <div className='w-[10%] flex justify-center items-center'>
                                <span className='pb-1'>Or</span>
                            </div>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><FaGoogle /></span>
                            </div>
                            <div className='w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><FaFacebookF /></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;
