import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
//asynchronous aperations

export const get_sellers = createAsyncThunk(
    'seller/get_sellers',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/sellers-get?page=${page}
                &perPage=${perPage}&searchValue=${searchValue}`, { withCredentials: true });
            // console.log(data);
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

export const sellerReducer = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
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

            .addCase(get_sellers.fulfilled, (state, { payload }) => {
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
    }
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;