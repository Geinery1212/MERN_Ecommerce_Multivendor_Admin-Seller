import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_order_detail, messageClear, update_order_status_admin } from '../../store/Reducers/ordersReducer';
import MyMoney from '../../utils/MyMoney';
import toast from 'react-hot-toast';
const OrderDetails = () => {
    const formatter = new MyMoney();
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order, errorMessage, successMessage } = useSelector(state => state.ordersReducer);
    const updateStatus = (e) => {
        dispatch(update_order_status_admin({ 'id': orderId, 'status': e.target.value }));
        dispatch(get_admin_order_detail(orderId));
    }
    useEffect(() => {
        dispatch(get_admin_order_detail(orderId));
    }, [dispatch, orderId]);

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
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-xl text-[#d0d2d6]'>Order Details</h2>
                    <select name="status" id="status" onChange={updateStatus} value={order?.delivery_status} className='px-4 py-2 focus:border-indigo-500 outline-none
                    bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="warehouse">warehouse</option>
                        <option value="placed">placed</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div className='p-4'>
                    <div className='flex gap-2 text-lg text-[#d0d2d6]'>
                        <h2>#{order?._id}</h2>
                        <span>{order?.date}</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[30%]'>
                            <div className='pr-3 text-[#d0d2d6] text-lg'>
                                <div className='flex flex-col gap-1'>
                                    {order.customer && <h2 className='pb-2 font-semibold'>Deliver To: {order?.customer[0]?.name}</h2>}
                                    <p><span className='text-sm'>{order?.shippingInfo?.street_address}, {order?.shippingInfo?.city}, {order?.shippingInfo?.state}, {order?.shippingInfo?.zip_code}, {order?.shippingInfo?.country} </span></p>
                                </div>
                                <div className='flex justify-start items-center gap-3'>
                                    <h2>Payment Status: </h2>
                                    <span className='text-base'>{order?.payment_status}</span>
                                </div>
                                <span>Price: {formatter.centsToFomattedCurrency(order?.price)}</span>
                                {
                                    order?.products?.map((product, index) => {
                                        return <div key={index} className='mt-4 bg-[#8288ed]'>
                                            <div className='flex gap-3 text-md'>
                                                <img src={product.images[0]} alt="" className='w-[50px] h-[50px]' />
                                                <div>
                                                    <h2>{product.name}</h2>
                                                    <p>
                                                        <span>Brand: </span>
                                                        <span>{product.brand}</span>
                                                        <span className='text-lg'>Quantity : {product.quantity}</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className='w-[70%]'>
                            <div className='pl-3'>
                                <div className='mt-4 flex flex-col bg-[#8288ed] rounded-md p-4 text-[#d0d2d6]'>
                                    {
                                        order?.suborders?.map((suborder, subI) => {
                                            return <div key={subI}>
                                                <div className='mt-2'>
                                                    <div className='flex justify-start items-center gap-3'>
                                                        <h2>Seller {subI + 1}: </h2>
                                                        <span>{suborder.delivery_status}</span>
                                                    </div>
                                                    {
                                                        suborder?.products?.map((product, pi) => {
                                                            return <div key={pi} className='flex gap-3 text-md mt-2'>
                                                                <img src={product.images[0]} alt="" className='w-[50px] h-[50px]' />
                                                                <div>
                                                                    <h2>{product.name}</h2>
                                                                    <p>
                                                                        <span>Brand: </span>
                                                                        <span>{product.brand}</span>
                                                                        <span className='text-lg'>Quantity : {product.quantity}</span>
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderDetails