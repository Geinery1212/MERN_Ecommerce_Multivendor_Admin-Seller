import React, { useEffect, useState } from 'react'
import { FaImages, FaRegEdit } from "react-icons/fa";
import { FadeLoader, PropagateLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { add_shop_data, get_user_info, messageClear, profile_image_upload } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { overrideStyle } from '../../utils/utils';
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';
const Profile = () => {

    const dispatch = useDispatch();
    const { userInfo, loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const {loader2} = useSelector(state => state.seller);

    const [formData, setFormData] = useState({
        shopName: '',
        state: '',
        district: '',
        subdistrict: ''
    });
    const inputHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const add_image = (e) => {
        if (e.target.files.length > 0) {
            // console.log(e.target.files[0]);
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            dispatch(profile_image_upload(formData));
        }
    }
    //add shop data
    const add = (e) => {
        e.preventDefault();
        dispatch(add_shop_data(formData));
    }
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);
    useEffect(() => {
        dispatch(get_user_info());
    }, []);

    return (
        <>
            {loader2 && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 lg:px-7 py-5'>
                <div className='w-full flex flex-wrap'>
                    <div className='w-full md:w-6/12'>
                        <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
                            {/* profile image */}
                            <div className='flex justify-center items-center py-3'>
                                {
                                    (userInfo && userInfo.image.length > 0) ? <label className='h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden' htmlFor='img'>
                                        <img src={userInfo.image} alt="" />
                                        {
                                            loader &&
                                            <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70
                    flex justify-center items-center z-20'>
                                                <span>
                                                    <FadeLoader />
                                                </span>
                                            </div>

                                        }
                                    </label> : <label htmlFor="img" className='flex justify-center items-center
                                flex-col h-[150px] w-[200px] cursor-pointer border border-dashed
                                hover:border-red-500 border-[#d0d2d6] relative'>
                                        <span><FaImages /></span>
                                        <span>Select Image</span>
                                        {
                                            loader &&
                                            <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70
                    flex justify-center items-center z-20'>
                                                <span>
                                                    <FadeLoader />
                                                </span>
                                            </div>

                                        }
                                    </label>
                                }
                                <input type="file" className='hidden' name='img' id='img'
                                    onChange={add_image} />
                            </div>
                            {/* info */}
                            <div className='px-0 md:px-5 py-2'>
                                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800
                            rounded-md relative'>
                                    <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg
                        hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'>
                                        <FaRegEdit />
                                    </span>
                                    <div className='flex gap-2'>
                                        <span>Name: </span>
                                        <span>{userInfo.name}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Email: </span>
                                        <span>{userInfo.email}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Role: </span>
                                        <span>{userInfo.role}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Status: </span>
                                        <span>{userInfo.status}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Payment Account: </span>
                                        <p>
                                            {
                                                userInfo.payment === 'active' ? <span className='bg-green-500 text-white
                                            text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>{userInfo.payment}</span> : <span onClick={() => dispatch(create_stripe_connect_account())} className='bg-blue-500 text-white
                                            text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded'>Click Active</span>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='px-0 md:px-5 py-2'>
                                {
                                    (!userInfo.shopInfo || !userInfo.shopInfo.length > 3) ?
                                        /* edit info */
                                        <form onSubmit={add}>
                                            <div className='flex flex-col w-full gap-1 mb-2'>
                                                <label htmlFor="shopName">Shop Name:</label>
                                                <input type="text" name="shopName" id="shopName" placeholder='Shop Name'
                                                    onChange={inputHandler} value={formData.shopName} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                                            </div>
                                            <div className='flex flex-col w-full gap-1 mb-2'>
                                                <label htmlFor="state">State Name:</label>
                                                <input type="text" name="state" id="state" placeholder='State Name'
                                                    onChange={inputHandler} value={formData.state} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                                            </div>
                                            <div className='flex flex-col w-full gap-1 mb-2'>
                                                <label htmlFor="district">District Name:</label>
                                                <input type="text" name="district" id="district" placeholder='District Name'
                                                    onChange={inputHandler} value={formData.district} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                                            </div>
                                            <div className='flex flex-col w-full gap-1 mb-2'>
                                                <label htmlFor="subdistrict">Sub District Name:</label>
                                                <input type="text" name="subdistrict" id="subdistrict" placeholder='Sub District Name'
                                                    onChange={inputHandler} value={formData.subdistrict} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                                            </div>
                                            <button className='bg-red-500 w-[200px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 mb-3' disabled={loader ? true : false}>
                                                {
                                                    loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}></PropagateLoader> : 'Save Changes'
                                                }
                                            </button>
                                        </form> :
                                        /* info */
                                        <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800
                            rounded-md relative'>
                                            <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg
                        hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'>
                                                <FaRegEdit />
                                            </span>
                                            <div className='flex gap-2'>
                                                <span>Shop Name: </span>
                                                <span>{userInfo.shopInfo?.shopName}</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <span>State: </span>
                                                <span>{userInfo.shopInfo?.state}</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <span>District: </span>
                                                <span>{userInfo.shopInfo?.district}</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <span>Sub District: </span>
                                                <span>{userInfo.shopInfo?.subdistrict}</span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-6/12'>
                        <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
                            <div className='bg-[#6a5fdf]
                    rounded-md text-[#d0d2d6] p-4'>
                                <h2 className='text-lg mb-3 font-semibold'>Change Password</h2>
                                <form>
                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="email">Email:</label>
                                        <input type="text" name="email" id="email" placeholder='Email'
                                            onChange={inputHandler} value={formData.email} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                                    </div>
                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="o_password">Old Password:</label>
                                        <input type="password" name="o_password" id="o_password" placeholder='Old Password'
                                            onChange={inputHandler} value={formData.o_password} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                                    </div>
                                    <div className='flex flex-col w-full gap-1 mb-2'>
                                        <label htmlFor="n_password">New Password:</label>
                                        <input type="password" name="n_password" id="n_password" placeholder='New Password'
                                            onChange={inputHandler} value={formData.n_password} className='px-4 py-2 focus:border-indigo-500 outline-none
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'/>
                                    </div>
                                    <button className='bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile