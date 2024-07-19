import React from 'react'
import Demo from '../../images/demo.jpg'
const SellerDetails = () => {
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[20px] font-bold mb-3'>Sellers Request</h1>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <div className='w-full flex flex-wrap text-[#d0d2d6]'>
                    <div className='w-3/12 flex justify-center items-center py-3'>
                        <div>
                            <img className='w-full h-[230px]' src={Demo} alt="" />
                        </div>
                    </div>
                    <div className='w-4/12'>
                        <div className='px-0 md:px-5 py-2'>
                            <div className='py-2 text-lg'>
                                <h2>Basic Info</h2>
                            </div>
                            <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>Name: </span>
                                    <span>Ervin Díaz </span>
                                </div>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>Email: </span>
                                    <span>ervin.dia@gmail.com </span>
                                </div>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>Role: </span>
                                    <span>Seller </span>
                                </div>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>Status: </span>
                                    <span>Active </span>
                                </div>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>Payment Status: </span>
                                    <span>Active </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-4/12'>
                        <div className='px-0 md:px-5 py-2'>
                            <div className='py-2 text-lg'>
                                <h2>Address</h2>
                            </div>
                            <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md'>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>Shop Name: </span>
                                    <span>Easy Shop </span>
                                </div>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>State: </span>
                                    <span>California </span>
                                </div>
                                <div className='flex gap-2 font-bold text-black'>
                                    <span>District: </span>
                                    <span>San Diego </span>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <form action="">
                        <div className='flex gap-4 py-3'>
                            <select name="" id="" className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'>
                                <option value="">--Select Status--</option>
                                <option value="">Active</option>
                                <option value="">Deactive</option>
                            </select>
                            <button className='bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerDetails