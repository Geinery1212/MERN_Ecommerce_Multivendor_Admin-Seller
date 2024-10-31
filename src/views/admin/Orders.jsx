import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsArrowBarDown } from "react-icons/bs";
import { BsArrowBarUp } from "react-icons/bs";
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_orders, messageClear } from '../../store/Reducers/ordersReducer';
import MyMoney from '../../utils/MyMoney';
import toast from 'react-hot-toast';

const Orders = () => {
    const formatter = new MyMoney();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const { myOrders, totalOrders, errorMessage, successMessage } = useSelector(state => state.ordersReducer);
    const showSubOrders = (id) => {
        if (selectedOrder.some(e => e === id)) {
            let selectedOrderUpdate = selectedOrder.filter((e) => e !== id);
            setSelectedOrder(selectedOrderUpdate);
        } else {
            setSelectedOrder([...selectedOrder, id]);

        }
    }
    useEffect(() => {
        dispatch(get_admin_orders({
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
    }, [successMessage, errorMessage]);
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <div className='flex justify-between items-center'>
                    <select onClick={(e) => setPerPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} type="text" placeholder='search' className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' />
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
                        {myOrders && myOrders.map((order, index) => {
                            return <div key={index}>
                                <div className='flex justify-between items-start border-b border-slate-700'>
                                    <div className='py-3 w-[25%] font-medium whitespace-nowrap'>#{order._id}</div>
                                    <div className='py-3 w-[13%] font-medium '>{formatter.centsToFomattedCurrency(order.price)}</div>
                                    <div className='py-3 w-[18%] font-medium '>{order.payment_status}</div>
                                    <div className='py-3 w-[18%] font-medium '>{order.delivery_status}</div>
                                    <div className='py-3 w-[18%] font-medium '><Link to={`/admin/dashboard/orders/details/${order._id}`}>View</Link></div>
                                    <div className='py-3 w-[8%] font-medium ' onClick={(e) => showSubOrders(order._id)}>{(selectedOrder.some(e => e === order._id)) ? <BsArrowBarUp /> : <BsArrowBarDown />}
                                    </div>
                                </div>
                                <div className={selectedOrder.some(e => e === order._id) ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden'}>
                                    {
                                        order.suborders && order.suborders.map((suborder, index) => {
                                            return <div key={index} className='flex justify-start items-start border-b border-slate-700'>
                                                <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>#{suborder._id}</div>
                                                <div className='py-3 w-[13%] font-medium '>{formatter.centsToFomattedCurrency(suborder.price)}</div>
                                                <div className='py-3 w-[18%] font-medium '>{order.payment_status}</div>
                                                <div className='py-3 w-[18%] font-medium '>{order.delivery_status}</div>
                                            </div>
                                        })
                                    }
                                </div></div>
                        })}
                    </div>
                </div>
                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    {(totalOrders > perPage) && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalOrders} perPage={perPage} showItem={Math.floor(totalOrders / perPage)} />}
                </div>
            </div>
        </div>
    )
}

export default Orders