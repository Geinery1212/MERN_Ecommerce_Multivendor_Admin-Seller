import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import Pagination from '../Pagination';
const Sellers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
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
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-[#d0d3d6]'>
                        <thead className='uppercase border-b border-slate-700 text-[#d0d3d6]'>
                            <tr>
                                <th scope='col' className='py-1 px-4'>No</th>
                                <th scope='col' className='py-1 px-4'>Image</th>
                                <th scope='col' className='py-1 px-4'>Name</th>
                                <th scope='col' className='py-1 px-4'>Shop Name</th>
                                <th scope='col' className='py-1 px-4'>Payment Status</th>
                                <th scope='col' className='py-1 px-4'>Email</th>
                                <th scope='col' className='py-1 px-4'>Division</th>
                                <th scope='col' className='py-1 px-4'>District</th>
                                <th scope='col' className='py-1 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                [1, 2, 3, 4, 5].map((element, index) => {
                                    return <tr key={index}>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>{element}</td>
                                        <td className='py-1 px-4 flex justify-center items-center'>
                                            <img src={require(`../../images/category/${index + 1}.jpg`)} alt={`${index + 1}.jpg`} className='w-[45px] h-[45px]' />
                                        </td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>Ervin Diaz</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>Easy Shop</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>Pending</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>ervin.diaz@gmail.com</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>San Diego</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>California</td>
                                        <td className='py-1 px-4 font-medium whitespace-nowrap'>
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

export default Sellers