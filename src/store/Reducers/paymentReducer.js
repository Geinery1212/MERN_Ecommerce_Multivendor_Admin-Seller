import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";


export const get_seller_payment_details = createAsyncThunk(
    'payment/get_seller_payment_details',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/payment/seller-payment-details`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const send_withdrawal_request = createAsyncThunk(
    'payment/send_withdrawal_request',
    async ({ amount }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/payment/send-withdrawal-request`, { amount }, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_payment_requests = createAsyncThunk(
    'payment/get_payment_requests',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/payment/get-payment-requests`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const confirm_payment_request = createAsyncThunk(
    'payment/confirm_payment_request',
    async (paymentId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/payment/confirm-payment-request`, { paymentId }, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const paymentReducer = createSlice({
    name: 'payment',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        pendingWithdraws: [],
        successWithdraws: [],
        totalAmount: 0,
        amountWithdrawn: 0,
        pendingAmount: 0,
        availableAmount: 0,
    },
    reducers: {

        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(get_seller_payment_details.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_seller_payment_details.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(get_seller_payment_details.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.pendingWithdraws = payload.pendingWithdraws;
                state.successWithdraws = payload.successWithdraws;
                state.totalAmount = payload.totalAmount;
                state.amountWithdrawn = payload.amountWithdrawn;
                state.pendingAmount = payload.pendingAmount;
                state.availableAmount = payload.availableAmount;
            })

            .addCase(send_withdrawal_request.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(send_withdrawal_request.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(send_withdrawal_request.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.pendingAmount = state.pendingAmount + payload.withdrawal.amount;
                state.availableAmount = state.availableAmount - payload.withdrawal.amount;
                state.pendingWithdraws = [...state.pendingWithdraws, payload.withdrawal];
            })

            .addCase(get_payment_requests.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_payment_requests.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(get_payment_requests.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.pendingWithdraws = payload.pendingWithdraws;
            })


            .addCase(confirm_payment_request.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(confirm_payment_request.rejected, (state, { payload }) => {
                state.loader = false;                
                state.errorMessage = payload.error;
            })
            .addCase(confirm_payment_request.fulfilled, (state, { payload }) => {                
                const temp = state.pendingWithdraws.filter(r => r._id !== payload.payment._id)
                state.loader = false
                state.successMessage = payload.message;
                state.pendingWithdraws = temp
            })
    }

})
export const { messageClear } = paymentReducer.actions
export default paymentReducer.reducer