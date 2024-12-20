import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import demoImage from '../../images/admin.jpg';
import { FaList } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage, chatMessageClear, get_seller_friends, send_message_admin_to_seller } from '../../store/Reducers/chat/chatAdminToSellerReducer';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { socket_connection } from '../../connection/global';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
const ChatSeller = () => {
    const [show, setShow] = useState(false);
    const [newMessageText, setNewMessageText] = useState('');
    const [newMessageReceived, setNewMessageReceived] = useState({});
    const [allSellersActive, setAllSellersActive] = useState([]);
    const { userInfo } = useSelector(state => state.auth);
    const { myFriends, friendMessages, chatSuccessMessage, currentFriend, chatLoader } = useSelector(state => state.chatAdminToSellerReducer);
    const dispatch = useDispatch();
    const { sellerId } = useParams();


    const socketRef = useRef(null);
    const scrollRef = useRef();

    useEffect(() => {
        socketRef.current = io(socket_connection); // Initialize socket only once        

        if (userInfo) {
            socketRef.current.emit('add_admin', userInfo); // Emit event when userInfo is available
        }

        socketRef.current.on('seller_message', msg => {
            setNewMessageReceived(msg); // Handle seller messages
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('Connection error:', err);
            toast.error('Connection failed. Please try again later.');
        });

        socketRef.current.on('activeSellers', allCustomers => {
            setAllSellersActive(allCustomers);
        });

        return () => {
            socketRef.current.disconnect(); // Clean up socket on component unmount
        };
    }, [userInfo]);

    useEffect(() => {
        if (chatSuccessMessage !== '' && friendMessages.length > 0) {
            const lastMessage = friendMessages[friendMessages.length - 1];
            socketRef.current.emit('send_admin_message', lastMessage); // Emit message to client
            dispatch(chatMessageClear());
        }
    }, [chatSuccessMessage, friendMessages, dispatch]);

    const send = (e) => {
        e.preventDefault();
        if (newMessageText) {
            dispatch(send_message_admin_to_seller({
                sellerId,
                'adminId': userInfo._id,
                newMessageText,
                'name': userInfo.name
            }));
            setNewMessageText('');
        }
    };
    useEffect(() => {
        if (userInfo) {
            dispatch(get_seller_friends({
                adminId: userInfo._id,
                sellerId
            }));
        }
    }, [dispatch, sellerId, userInfo]);

    useEffect(() => {
        if (newMessageReceived && newMessageReceived.senderName) {
            if (newMessageReceived.senderId === sellerId && newMessageReceived.receiverId === userInfo._id) {
                dispatch(addNewMessage(newMessageReceived)); // Add new message to chat
            } else {
                toast.success(`${newMessageReceived.senderName} sent a message`);
                dispatch(chatMessageClear());
            }
        }
    }, [newMessageReceived, sellerId, userInfo, dispatch]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [friendMessages]);

    return (
        <>
            {chatLoader && <div className='w-screen h-screen flex justify-center
            items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                <FadeLoader />
            </div>}
            <div className='px-2 lg:px-7 py-5'>
                <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
                    <div className='flex w-full h-full relative'>
                        <div className={`w-[280px] h-full absolute z-10 ${show ? '-left-[16px]' : '-left-[320px]'} md:left-0 md:relative transition-all`}>
                            <div className='w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto'>
                                <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white'>
                                    <h2>Sellers</h2>
                                    <span className='block cursor-pointer md:hidden' onClick={() => setShow(!show)}><IoClose /></span>
                                </div>
                                {myFriends && myFriends.map(friend => <Link key={friend.fdId} to={'/admin/dashboard/chat-seller/' + friend.fdId} className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer ${(currentFriend && friend.fdId === currentFriend.fdId) && 'bg-[#8288ed]'}`}>
                                    <div className='relative'>
                                        <img src={friend.image ? friend.image : demoImage} alt="" className='w-[38px] h-[38px] max-w-[38px] border-white border-2 p-[2px] rounded-full' />
                                        {allSellersActive.some(e => e.sellerId === friend.fdId) && <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>}
                                    </div>
                                    <div className='flex justify-center items-start flex-col w-full'>
                                        <div className='flex justify-between items-center w-full'>
                                            <h2 className='text-base font-semibold'>{friend.name}</h2>
                                        </div>
                                    </div>
                                </Link>)}
                            </div>
                        </div>
                        <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
                            {currentFriend && <div className='flex justify-between items-center'>
                                <div className='flex justify-start items-center gap-3'>
                                    <div className='relative'>
                                        <img src={currentFriend.image ? currentFriend.image : demoImage} alt="" className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full' />
                                        {allSellersActive.some(e => e.sellerId === currentFriend.fdId) && <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>}
                                    </div>
                                </div>
                                <div className='w-[35px] flex md:hidden h-[35px] rounded-md bg-blue-500 
                            shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white' onClick={() => setShow(!show)}>
                                    <span><FaList /></span>
                                </div>
                            </div>}
                            <div className='py-4'>
                                <div className='bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
                                    {(currentFriend && friendMessages) ? friendMessages.map((msg, i) => {
                                        if (msg.receiverId === userInfo._id) {
                                            return <div ref={scrollRef} className='w-full flex justify-start items-center'>
                                                <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                    <img src={currentFriend.image ? currentFriend.image : demoImage} alt="" className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' />
                                                    <div className='flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white
                                    py-1 px-2 rounded-md'>
                                                        {msg.message}
                                                    </div>
                                                </div>
                                            </div>
                                        } else {
                                            return <div ref={scrollRef} className='w-full flex justify-end items-center'>
                                                <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                    <div className='flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white
                                        py-1 px-2 rounded-md'>
                                                        {msg.message}
                                                    </div>
                                                    <img src={userInfo.image ? userInfo.image : demoImage} alt="" className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' />

                                                </div>
                                            </div>
                                        }
                                    }) : <p className="text-white flex justify-center items-center h-[calc(100vh-290px)] ">Select a seller</p>}
                                </div>
                            </div>
                            {currentFriend && <form className='flex gap-3' onSubmit={send}>
                                <input value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)} type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500
                            rounded-md outline-none bg-transparent text-[#d0d2d6]' placeholder='Input Your Message' />
                                <button className='shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px]
                            rounded-md text-white flex justify-center items-center'>Send</button>
                            </form>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatSeller