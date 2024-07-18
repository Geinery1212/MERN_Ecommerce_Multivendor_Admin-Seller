import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Pagination from '../Pagination';
import Search from '../components/Search';

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[#000] font-semibold text-lg mb-3'>Discount Products</h1>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                <div className='relative overflow-x-auto mt-4'>
                    <table className='w-full text-sm text-[#d0d3d6]'>
                        <thead className='uppercase border-b border-slate-700 text-[#d0d3d6]'>
                            <tr>
                                <th scope='col' className='py-1 px-4'>Order Id</th>
                                <th scope='col' className='py-1 px-4'>Price</th>
                                <th scope='col' className='py-1 px-4'>Payment Status</th>
                                <th scope='col' className='py-1 px-4'>Order Status</th>
                                <th scope='col' className='py-1 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [1, 2, 3, 4, 5].map((element, index) => {
                                    return <tr key={index}>
                                        <td className='py-1 px- font-medium whitespace-nowrap text-center'>{element}</td>
                                        <td className='py-1 px- font-medium whitespace-nowrap text-center'>$123</td>                                       
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>Pending</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>Pending</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap text-center'> 
                                            <div className='flex justify-center items-center gap-4'>                                              
                                                <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye />
                                                </Link>                                                
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={50} perPage={perPage} showItem={3} />
                </div>
            </div>
        </div>
    )
}

export default Orders