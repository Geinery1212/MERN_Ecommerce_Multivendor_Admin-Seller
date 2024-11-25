import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import Pagination from '../Pagination';
import Search from '../components/Search';
import { get_seller_orders, messageClear } from '../../store/Reducers/ordersReducer';
import toast from 'react-hot-toast';
import MyMoney from '../../utils/MyMoney';
import { useDispatch, useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
const Orders = () => {
    const formatter = new MyMoney();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);
    const { myOrders, totalOrders, errorMessage, successMessage, loader } = useSelector(state => state.ordersReducer);

    useEffect(() => {
        dispatch(get_seller_orders({
            perPage, 'page': currentPage, searchValue
        }));
    }, [currentPage, dispatch, perPage, searchValue]);

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);
    return (
        <>
            {loader && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
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
                                    myOrders?.map((order, index) => {
                                        return <tr key={index}>
                                            <td className='py-1 px- font-medium whitespace-nowrap text-center'>{order._id}</td>
                                            <td className='py-1 px- font-medium whitespace-nowrap text-center'>{formatter.centsToFomattedCurrency(order.price)}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{order.payment_status}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>{order.delivery_status}</td>
                                            <td className='py-1 px-4 font-medium whitespace-nowrap text-center'>
                                                <div className='flex justify-center items-center gap-4'>
                                                    <Link to={`/seller/dashboard/order/details/${order._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye />
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
                        {totalOrders > perPage && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalOrders} perPage={perPage} showItem={Math.floor(totalOrders / perPage)} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders