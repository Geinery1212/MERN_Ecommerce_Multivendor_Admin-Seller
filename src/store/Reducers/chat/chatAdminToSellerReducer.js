import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../connection/api";
//asynchronous aperations
export const get_seller_friends = createAsyncThunk(
    'chat/get_seller_friends',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { adminId, sellerId } = obj;
            const url = sellerId
                ? `/chat/admin/get-seller-admin-friends/${adminId}/${sellerId}`
                : `/chat/admin/get-seller-admin-friends/${adminId}`;

            const { data } = await api.get(url, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
        }
    }
);


export const send_message_admin_to_seller = createAsyncThunk(
    'chat/send_message_admin_to_Seller',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/admin/send-message-admin-to-seller`, obj, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const chatAdminToSellerReducer = createSlice({
    name: 'chatAdminToSeller',
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
            .addCase(get_seller_friends.pending, (state, { payload }) => {
                state.chatLoader = true;
            }).addCase(get_seller_friends.rejected, (state, { payload }) => {
                state.chatLoader = false;
            }).addCase(get_seller_friends.fulfilled, (state, { payload }) => {
                state.chatLoader = false;
                state.myFriends = payload.myFriends;
                state.friendMessages = payload.messages;
                state.currentFriend = payload.currentFriend;
            })
            .addCase(send_message_admin_to_seller.fulfilled, (state, { payload }) => {
                state.myFriends = payload.myFriends;
                state.friendMessages = [...state.friendMessages, payload.message];
                state.chatSuccessMessage = 'Message sended successfully';
            })

    }
});
export const { chatMessageClear, addNewMessage } = chatAdminToSellerReducer.actions;
export default chatAdminToSellerReducer.reducer;