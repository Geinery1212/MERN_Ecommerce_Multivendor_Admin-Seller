import React, { useEffect } from 'react'
import MyMoney from '../../utils/MyMoney';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { get_seller_order_detail, messageClear, update_order_status_seller } from '../../store/Reducers/ordersReducer';
import { FadeLoader } from 'react-spinners';
const OrderDetails = () => {
    const formatter = new MyMoney();
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order, errorMessage, successMessage, loader2 } = useSelector(state => state.ordersReducer);
    const updateStatus = (e) => {
        dispatch(update_order_status_seller({ 'id': orderId, 'status': e.target.value }));
    }
    useEffect(() => {
        dispatch(get_seller_order_detail(orderId));
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
    }, [successMessage, errorMessage, dispatch]);
    return (
        <>
            {loader2 && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
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
                                        <h2 className='pb-2 font-semibold'>Deliver To: {order?.shippingInfo}</h2>
                                    </div>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h2>Payment Status: </h2>
                                        <span className='text-base'>{order?.payment_status}</span>
                                    </div>
                                    <span>Price: {formatter.centsToFomattedCurrency(order?.price)}</span>
                                    {
                                        order?.products?.map((product, index) => {
                                            return <div className='mt-4 bg-[#8288ed]'>
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
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default OrderDetails