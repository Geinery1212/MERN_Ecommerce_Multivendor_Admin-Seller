import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BsArrowBarDown } from "react-icons/bs";
import { BsArrowBarUp } from "react-icons/bs";
import Pagination from '../Pagination';


const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [show, setShow] = useState(false);
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <div className='flex justify-between items-center'>
                    <select onClick={(e) => setPerPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input type="text" placeholder='search' className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' />
                </div>
                {/* table */}
                <div className='relative overflow-x-auto mt-5'>
                    {/* header table */}
                    <div className='w-full text-sm text-left text-[#d0d2d6]'>
                        <div className='uppercase border-b border-slate-700'>
                            <div className='flex justify-between items-center'>
                                <div className='py-3 w-[25%] font-bold'>Order Id</div>
                                <div className='py-3 w-[13%] font-bold'>Price</div>
                                <div className='py-3 w-[18%] font-bold'>Payment Status</div>
                                <div className='py-3 w-[18%] font-bold'>Order Status</div>
                                <div className='py-3 w-[18%] font-bold'>Action</div>
                                <div className='py-3 w-[8%] font-bold'><BsArrowBarDown />

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* body table */}
                    <div className='text-[#d0d2d6]'>
                        <div className='flex justify-between items-start border-b border-slate-700'>
                            <div className='py-3 w-[25%] font-medium whitespace-nowrap'>#4534857</div>
                            <div className='py-3 w-[13%] font-medium '>$563</div>
                            <div className='py-3 w-[18%] font-medium '>Pending</div>
                            <div className='py-3 w-[18%] font-medium '>Pending</div>
                            <div className='py-3 w-[18%] font-medium '><Link>View</Link></div>
                            <div className='py-3 w-[8%] font-medium ' onClick={(e) => setShow(!show)}>{show ? <BsArrowBarUp /> : <BsArrowBarDown />}
                            </div>
                        </div>
                        <div className={show ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden'}>
                            <div className='flex justify-start items-start border-b border-slate-700'>
                                <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>#2342543</div>
                                <div className='py-3 w-[13%] font-medium '>$342</div>
                                <div className='py-3 w-[18%] font-medium '>Pending</div>
                                <div className='py-3 w-[18%] font-medium '>Pending</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={50} perPage={perPage} showItem={3} />
                </div>
            </div>
        </div>
    )
}

export default Orders