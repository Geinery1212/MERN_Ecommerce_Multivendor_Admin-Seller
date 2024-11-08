import React, { forwardRef, useEffect, useState } from 'react'
import { FaDollarSign } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { get_seller_payment_details, messageClear, send_withdrawal_request } from '../../store/Reducers/paymentReducer';
import { FadeLoader } from 'react-spinners';
import MyMoney from '../../utils/MyMoney';
import toast from 'react-hot-toast';
import moment from 'moment/moment';
function handleOnWheel({ deltaY }) {
    console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
));
const Payments = () => {
    const dispatch = useDispatch();
    const formatter = new MyMoney();
    const [amount, setAmount] = useState(0);
    const { loader, pendingWithdraws, successWithdraws, totalAmount, amountWithdrawn, pendingAmount, availableAmount, successMessage, errorMessage } = useSelector(state => state.payment);

    const sendRequest = (e) => {
        e.preventDefault()
        if (amount > 0) {
            if ((availableAmount - amount) > 0) {
                dispatch(send_withdrawal_request({ amount }))
                setAmount(0)
            } else {
                toast.error('Insufficient Balance')
            }
        }
    }

    useEffect(() => {
        dispatch(get_seller_payment_details());
    }, []);

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successMessage, errorMessage]);

    const Row = ({ index, style }) => {
        return (<>
            <div style={style} className='flex justify-center items-center text-sm text-white font-normal' key={index}>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{formatter.centsToFomattedCurrency(pendingWithdraws[index]?.amount)}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'><span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>{pendingWithdraws[index]?.status}</span></div>
                {pendingWithdraws[index]?.createdAt && <div className='w-[25%] p-2 whitespace-nowrap'>{moment(pendingWithdraws[index]?.createdAt).format('LL')}</div>}
            </div>
        </>
        )
    }

    const Row2 = ({ index, style }) => {
        return (<>
            <div style={style} className='flex justify-center items-center text-sm text-white font-normal' key={index}>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{formatter.centsToFomattedCurrency(successWithdraws[index]?.amount)}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'><span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>{successWithdraws[index]?.status}</span></div>
                {successWithdraws[index]?.createdAt && <div className='w-[25%] p-2 whitespace-nowrap'>{moment(successWithdraws[index]?.createdAt).format('LL')}</div>}
            </div>
        </>
        )
    }
    return (
        <>
            {loader && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 md:px-7 py-5'>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5'>
                    <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
                        <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                            <h2 className='text-3xl font-bold'>{formatter.centsToFomattedCurrency(totalAmount)}</h2>
                            <span>Total Sales</span>
                        </div>
                        <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#fa0305]'>
                            <span className='text-white'><FaDollarSign /></span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
                        <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                            <h2 className='text-3xl font-bold'>{formatter.centsToFomattedCurrency(availableAmount)}</h2>
                            <span>Available Amount</span>
                        </div>
                        <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#760077]'>
                            <span className='text-white'><FaDollarSign />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
                        <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                            <h2 className='text-3xl font-bold'>{formatter.centsToFomattedCurrency(amountWithdrawn)}</h2>
                            <span>Amount Withdrawn</span>
                        </div>
                        <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#038000]'>
                            <span className='text-white'><FaDollarSign />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3'>
                        <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                            <h2 className='text-3xl font-bold'>{formatter.centsToFomattedCurrency(pendingAmount)}</h2>
                            <span>Pending Amount</span>
                        </div>
                        <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#0200f8]'>
                            <span className='text-white'><FaDollarSign /></span>
                        </div>
                    </div>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4'>
                    {/* table peding request */}
                    <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                        <h2 className='text-lg'>Send Request</h2>
                        {/* amount */}
                        <div className='pt-5 mb-5'>
                            <form onSubmit={sendRequest}>
                                <div className='flex gap-3 flex-wrap'>
                                    <input type="number" name='amount' value={amount / 100} onChange={(e) => setAmount(parseInt(e.target.value) * 100)} min="0" className='px-3 py-2 md:w-[75%]
            focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-indigo-700
            rounded-md text-[#d0d2d6]' />
                                    <button className='bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>Submit</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h2 className='text-lg pb-4'>Pending Request</h2>
                            <div className='w-full'>
                                <div className='w-full overflow-x-auto'>
                                    <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-lg'>
                                        <div className='w-[25%] p-2'>No</div>
                                        <div className='w-[25%] p-2'>Amount</div>
                                        <div className='w-[25%] p-2'>Status</div>
                                        <div className='w-[25%] p-2'>Date</div>
                                    </div>
                                    {
                                        <List style={{ minWith: '340px' }} className='List' height={350} itemCount={pendingWithdraws.length} itemSize={35} outerElementType={outerElementType}>
                                            {Row}
                                        </List>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* table success withdrawal */}
                    <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                        <div>
                            <h2 className='text-lg pb-4'>Success Withdrawal</h2>
                            <div className='w-full'>
                                <div className='w-full overflow-x-auto'>
                                    <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-lg'>
                                        <div className='w-[25%] p-2'>No</div>
                                        <div className='w-[25%] p-2'>Amount</div>
                                        <div className='w-[25%] p-2'>Status</div>
                                        <div className='w-[25%] p-2'>Date</div>
                                    </div>
                                    {
                                        <List style={{ minWith: '340px' }} className='List' height={350} itemCount={successWithdraws.length} itemSize={35} outerElementType={outerElementType}>
                                            {Row2}
                                        </List>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payments