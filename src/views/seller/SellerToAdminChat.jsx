import React, { useEffect, useRef, useState } from 'react'
import demoImage from '../../images/admin.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage, chatMessageClear, get_messages_seller_to_admin, send_message_seller_to_admin } from '../../store/Reducers/chat/chatSellerToAdminReducer';
import { socket_connection } from '../../connection/global';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
const SellerToAdminChat = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { currentFriend, friendMessages, chatSuccessMessage } = useSelector(state => state.chatSellerToAdminReducer);
    const [newMessageText, setNewMessageText] = useState('');
    const [newMessageReceived, setNewMessageReceived] = useState({});
    const [allAdminsActive, setAllAdminsActive] = useState([]);

    //socket
    const socketRef = useRef(null);
    const scrollRef = useRef();

    useEffect(() => {
        socketRef.current = io(socket_connection); // Initialize socket only once

        if (userInfo) {
            socketRef.current.emit('add_seller', userInfo); // Emit event when userInfo is available
        }

        socketRef.current.on('admin_message', msg => {
            setNewMessageReceived(msg); // Handle admin messages
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('Connection error:', err);
            toast.error('Connection failed. Please try again later.');
        });

        socketRef.current.on('activeAdmins', allAdmins => {
            setAllAdminsActive(allAdmins);
        });
        return () => {
            socketRef.current.disconnect(); // Clean up socket on component unmount
        };
    }, [userInfo]);
    //--
    useEffect(() => {
        if (chatSuccessMessage !== '' && friendMessages.length > 0) {
            const lastMessage = friendMessages[friendMessages.length - 1];
            socketRef.current.emit('send_seller_message', lastMessage); // Emit message to admin
            dispatch(chatMessageClear());
        }
    }, [chatSuccessMessage, friendMessages, dispatch]);

    const send = (e) => {
        e.preventDefault();
        if (newMessageText) {
            dispatch(send_message_seller_to_admin({
                sellerId: userInfo._id,
                newMessageText,
                name: userInfo.name
            }));
            setNewMessageText('');
        }
    };
    useEffect(() => {
        if (newMessageReceived && newMessageReceived.senderName) {
            dispatch(addNewMessage(newMessageReceived)); // Add new message to chat
            toast.success(`${newMessageReceived.senderName} sent a message`);
        }
    }, [newMessageReceived, userInfo, dispatch]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [friendMessages]);

    useEffect(() => {
        dispatch(get_messages_seller_to_admin());
    }, []);
    return (
        <div className='px-2 lg:px-7 py-5'>
            <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
                <div className='flex w-full h-full relative'>
                    <div className='w-full md:pl-4'>
                        <div className='flex justify-between items-center'>

                            <div className='flex justify-start items-center gap-3'>
                                <div className='relative'>
                                    <img src={(currentFriend && currentFriend.image) ? currentFriend.image : demoImage} alt="" className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full' />
                                    {allAdminsActive.some(e => e.adminId === currentFriend.fdId) && <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>}
                                </div>
                                <h2 className='text-base text-white font-semibold'>Support</h2>
                            </div>

                        </div>
                        <div className='py-4'>
                            <div className='bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
                                {friendMessages ? friendMessages.map((msg, i) => {
                                    if (msg.receiverId === userInfo._id) {
                                        return <div ref={scrollRef} className='w-full flex justify-start items-center'>
                                            <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                <img src={demoImage} alt="" className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' />
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
                                                <img src={(currentFriend && currentFriend.image) ? currentFriend.image: demoImage} alt="" className='w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]' />
                                            </div>
                                        </div>
                                    }
                                }) : <p className="text-white flex justify-center items-center h-[calc(100vh-290px)] ">Select a customer</p>}
                            </div>
                        </div>
                        <form className='flex gap-3' onSubmit={send}>
                            <input value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)} type="text" className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500
                            rounded-md outline-none bg-transparent text-[#d0d2d6]' placeholder='Input Your Message' />
                            <button className='shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px]
                            rounded-md text-white flex justify-center items-center'>Send</button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SellerToAdminChat