import React, { forwardRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { confirm_payment_request, get_payment_requests, messageClear } from '../../store/Reducers/paymentReducer';
import MyMoney from '../../utils/MyMoney';
import moment from 'moment';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';
function handleOnWheel({ deltaY }) {
    console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
));
const PaymentRequest = () => {
    const dispatch = useDispatch();    
    const { pendingWithdraws, loader, errorMessage, successMessage } = useSelector(state => state.payment);
    const formatter = new MyMoney();
    const confirm = (id) => {
        dispatch(confirm_payment_request(id));
    }
    useEffect(() => {
        dispatch(get_payment_requests());
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
        return (
            <div style={style} className='flex text-sm text-white font-normal' key={index}>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{pendingWithdraws[index]?.amount && formatter.centsToFomattedCurrency(pendingWithdraws[index]?.amount)}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'><span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>{pendingWithdraws[index]?.status}</span></div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{pendingWithdraws[index]?.createdAt && moment(pendingWithdraws[index]?.createdAt).format('LL')}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'><button onClick={() => confirm(pendingWithdraws[index]?._id)} className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm'>Confirm</button> </div>
            </div>
        )
    }
    
    return (
        <>
            {loader && <div className='w-screen h-screen flex justify-center
                items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 lg:px-7 pt-5'>
                <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                    <h2 className='text-xl font-medium pb-5 text-[#d0d2d6]'>Withdraw Request</h2>
                    <div className='w-full'>
                        <div className='w-full overflow-x-auto'>
                            <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-lg'>
                                <div className='w-[25%] p-2'>No</div>
                                <div className='w-[25%] p-2'>Amount</div>
                                <div className='w-[25%] p-2'>Status</div>
                                <div className='w-[25%] p-2'>Date</div>
                                <div className='w-[25%] p-2'>Action</div>
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
        </>
    )
}

export default PaymentRequest