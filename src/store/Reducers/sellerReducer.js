import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
//asynchronous aperations

export const get_pending_sellers = createAsyncThunk(
    'seller/get_pending_sellers',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/sellers-get-pending?page=${page}&perPage=${perPage}&searchValue=${searchValue}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_active_sellers = createAsyncThunk(
    'seller/get_active_sellers',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/sellers-get-active?page=${page}&perPage=${perPage}&searchValue=${searchValue}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_deactive_sellers = createAsyncThunk(
    'seller/get_deactive_sellers',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/sellers-get-deactive?page=${page}&perPage=${perPage}&searchValue=${searchValue}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(productId);
            const { data } = await api.get(`/seller-get/${sellerId}`,
                { withCredentials: true });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const update_status_seller = createAsyncThunk(
    'seller/update_status_seller',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/seller-update-status`, obj,
                { withCredentials: true });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const create_stripe_connect_account = createAsyncThunk(
    'seller/create_stripe_connect_account',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data :{url} } = await api.get(`/payment/create-stripe-connect-account`, { withCredentials: true });
            console.log(url)
            window.location.href = url;
            // return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const active_stripe_connect_account = createAsyncThunk(
    'seller/active_stripe_connect_account',
    async(activeCode, {rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`,{},{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error); 
            return rejectWithValue(error.response.data);
        }
    }
);
export const sellerReducer = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        loader2: false,
        sellers: [],
        seller: {},
        totalSellers: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(get_pending_sellers.fulfilled, (state, { payload }) => {
                state.totalSellers = payload.totalSellers;
                state.sellers = payload.sellers;
            })

            .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
                state.totalSellers = payload.totalSellers;
                state.sellers = payload.sellers;
            })

            .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
                state.totalSellers = payload.totalSellers;
                state.sellers = payload.sellers;
            })

            .addCase(get_seller.fulfilled, (state, { payload }) => {
                state.seller = payload.seller;
            })

            .addCase(update_status_seller.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(update_status_seller.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(update_status_seller.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.seller = payload.seller;
            })

            .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(active_stripe_connect_account.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.seller = payload.seller;
            })

            .addCase(create_stripe_connect_account.pending, (state, { payload }) => {
                state.loader2 = true;
            }).addCase(create_stripe_connect_account.rejected, (state, { payload }) => {
                state.loader2 = false;
                state.errorMessage = payload.error;
            }).addCase(create_stripe_connect_account.fulfilled, (state, { payload }) => {                
                    state.loader2 = false;                                                         
            })
    }
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;