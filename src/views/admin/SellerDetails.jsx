/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { get_seller, messageClear, update_status_seller } from '../../store/Reducers/sellerReducer';
import { FadeLoader, PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
const SellerDetails = () => {
    const { sellerId } = useParams();
    const dispatch = useDispatch();
    const { seller, loader, errorMessage, successMessage, loader3 } = useSelector(state => state.seller);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setStatus(e.target.value);
    };
    const updateStatus = (e) => {
        e.preventDefault();
        if (status !== '') {
            let obj = {
                status,
                sellerId
            }
            dispatch(update_status_seller(obj));
        }
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
    }, [successMessage, errorMessage]);

    useEffect(() => {
        if (sellerId.length > 0) {
            dispatch(get_seller(sellerId));
        }
    }, [sellerId]);
    return (
        <>
            {loader3 && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 lg:px-7 pt-5'>
                <h1 className='text-[20px] font-bold mb-3'>Sellers Request</h1>
                <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                    <div className='w-full flex flex-wrap text-[#d0d2d6]'>
                        {/* Image Profile */}
                        <div className='w-3/12 flex justify-center items-center py-3'>
                            <div>
                                {
                                    (seller?.image) ? <img className='w-full h-[230px]' src={seller.image} alt="" />
                                        : <span>Image Not Uploaded</span>
                                }

                            </div>
                        </div>
                        {/* Basic Info */}
                        <div className='w-4/12'>
                            <div className='px-0 md:px-5 py-2'>
                                <div className='py-2 text-lg'>
                                    <h2>Basic Info</h2>
                                </div>
                                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>Name: </span>
                                        <span>{seller?.name}</span>
                                    </div>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>Email: </span>
                                        <span>{seller?.email}</span>
                                    </div>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>Role: </span>
                                        <span>{seller?.role}</span>
                                    </div>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>Status: </span>
                                        <span>{seller?.status}</span>
                                    </div>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>Payment Status: </span>
                                        <span>{seller?.payment}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Address */}
                        <div className='w-4/12'>
                            <div className='px-0 md:px-5 py-2'>
                                <div className='py-2 text-lg'>
                                    <h2>Address</h2>
                                </div>
                                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>Shop Name: </span>
                                        <span>{seller?.shopInfo?.shopName}</span>
                                    </div>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>State: </span>
                                        <span>{seller?.shopInfo?.state}</span>
                                    </div>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>District: </span>
                                        <span>{seller?.shopInfo?.district}</span>
                                    </div>
                                    <div className='flex gap-2 font-bold text-black'>
                                        <span>District: </span>
                                        <span>{seller?.shopInfo?.subdistrict}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={updateStatus}>
                            <div className='flex gap-4 py-3'>
                                <select onChange={handleChange} name="status" id="status" value={seller?.status} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'>
                                    <option value="">--Select Status--</option>
                                    <option value="active">Active</option>
                                    <option value="deactive">Deactive</option>
                                </select>
                                <button className='bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7' disabled={loader ? true : false}>
                                    {
                                        loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle}></PropagateLoader> : 'Update'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerDetails