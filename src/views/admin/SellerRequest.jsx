import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { get_pending_sellers } from '../../store/Reducers/sellerReducer';
import Search from '../components/Search';
import { FadeLoader } from 'react-spinners';
const SellerRequest = () => {
    const dispatch = useDispatch();
    let { loader2, totalSellers, sellers } = useSelector(state => state.seller);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);
    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_pending_sellers(obj));
    }, [perPage, currentPage, searchValue, dispatch]);

    useEffect(() => {
        const obj = {
            perPage: parseInt(perPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_pending_sellers(obj));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {loader2 && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 lg:px-7 pt-5'>
                <h1 className='text-[20px] font-bold mb-3'>Sellers Request</h1>
                <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                    <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-[#d0d3d6]'>
                            <thead className='uppercase border-b border-slate-700 text-[#d0d3d6]'>
                                <tr>
                                    <th scope='col' className='py-1 px-4'>No</th>
                                    <th scope='col' className='py-1 px-4'>Name</th>
                                    <th scope='col' className='py-1 px-4'>Email</th>
                                    <th scope='col' className='py-1 px-4'>Payment Status</th>
                                    <th scope='col' className='py-1 px-4'>Status</th>
                                    <th scope='col' className='py-1 px-4'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    (totalSellers > 0) && sellers.map((element, index) => {
                                        return <tr key={index}>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap'>{element.name}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap'>{element.email}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap'>{element.payment}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap'>{element.status}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <div className='flex justify-center items-center gap-4'>
                                                    <Link to={`/admin/dashboard/seller/details/${element._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye />
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
                        {totalSellers > 0 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalSellers} perPage={perPage} showItem={Math.floor(totalSellers / perPage)} />}
                    </div>
                </div>
            </div>
        </>

    )
}

export default SellerRequest