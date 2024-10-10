import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../connection/api";
//asynchronous aperations
export const send_message_seller_to_admin = createAsyncThunk(
    'chat/send_message_seller_to_admin',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(obj);
            const { data } = await api.post(`/chat/seller/send-message-seller-to-admin`, obj, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_messages_seller_to_admin = createAsyncThunk(
    'chat/get_messages_seller_to_admin',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/seller/get-messages-seller-to-admin`, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const chatSellerToAdminReducer = createSlice({
    name: 'chatSellerToAdmin',
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
            .addCase(get_messages_seller_to_admin.pending, (state, { payload }) => {
                state.chatLoader = true;
            }).addCase(get_messages_seller_to_admin.rejected, (state, { payload }) => {
                state.chatLoader = false;
            }).addCase(get_messages_seller_to_admin.fulfilled, (state, { payload }) => {
                state.chatLoader = false;
                state.friendMessages = payload.messages;
                state.currentFriend = payload.currentFriend;
            })
            .addCase(send_message_seller_to_admin.fulfilled, (state, { payload }) => {
                state.friendMessages = [...state.friendMessages, payload.message];
                state.chatSuccessMessage = 'Message sended successfully';
            })

    }
});
export const { chatMessageClear, addNewMessage } = chatSellerToAdminReducer.actions;
export default chatSellerToAdminReducer.reducer;