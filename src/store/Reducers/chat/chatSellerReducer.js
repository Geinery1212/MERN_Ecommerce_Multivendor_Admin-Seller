import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../connection/api";
//asynchronous aperations
export const get_customer_friends = createAsyncThunk(
    'chat/get_customer_friends',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { sellerId, customerId } = obj;
            const url = customerId
                ? `/chat/seller/get-customer-friends/${sellerId}/${customerId}`
                : `/chat/seller/get-customer-friends/${sellerId}`;

            const { data } = await api.get(url, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    }
);


export const send_message_to_customer = createAsyncThunk(
    'chat/send_message_to_customer',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(obj);
            const { data } = await api.post(`/chat/seller/send-message-seller-to-customer`, obj, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const chatSellerReducer = createSlice({
    name: 'chat',
    initialState: {
        chatLoader: false,
        chatSuccessMessage: '',
        chatErrorMessage: '',
        myFriends: [],
        friendMessages: [],
        currentFriend: ''



    },
    reducers: {
        chatMessageClear: (state, _) => {
            state.chatErrorMessage = '';
            state.chatSuccessMessage = '';
        },
        addNewMessage: (state, { payload }) => {
            state.friendMessages = [...state.friendMessages, payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_customer_friends.pending, (state, { payload }) => {
                state.chatLoader = true;
            }).addCase(get_customer_friends.rejected, (state, { payload }) => {
                state.chatLoader = false;
            }).addCase(get_customer_friends.fulfilled, (state, { payload }) => {
                state.chatLoader = false;
                state.myFriends = payload.myFriends;
                state.friendMessages = payload.messages;
                state.currentFriend = payload.currentFriend;
            })
            .addCase(send_message_to_customer.fulfilled, (state, { payload }) => {
                state.myFriends = payload.myFriends;
                state.friendMessages = [...state.friendMessages, payload.message];
                state.chatSuccessMessage = 'Message sended successfully';
            })

    }
});
export const { chatMessageClear, addNewMessage } = chatSellerReducer.actions;
export default chatSellerReducer.reducer;