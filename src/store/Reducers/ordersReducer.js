import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
//asynchronous aperations
export const get_admin_orders = createAsyncThunk(
    'orders/get_admin_orders',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_orders = createAsyncThunk(
    'orders/get_seller_orders',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/seller/orders?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, { withCredentials: true })
            console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_admin_order_detail = createAsyncThunk(
    'orders/get_admin_order_detail',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/order/${id}`, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const get_seller_order_detail = createAsyncThunk(
    'orders/get_seller_order_detail',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/seller/order/${id}`, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const update_order_status_admin = createAsyncThunk(
    'orders/update_order_status_admin',
    async ({ id, status }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/admin/order/${id}`, { status }, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const update_order_status_seller = createAsyncThunk(
    'orders/update_order_status_seller',
    async ({ id, status }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/seller/order/${id}`, { status }, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const ordersReducer = createSlice({
    name: 'order',
    initialState: {
        loader: false,
        loader2: false,
        successMessage: '',
        errorMessage: '',
        totalOrders: 0,
        order: {},
        myOrders: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(get_admin_orders.pending, (state) => {
            state.loader = true;
        }).addCase(get_admin_orders.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader = false;
        }).addCase(get_admin_orders.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
            state.myOrders = payload.orders;
            state.totalOrders = payload.totalOrders;
            state.loader = false;
        })

            .addCase(get_seller_orders.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_seller_orders.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            }).addCase(get_seller_orders.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.myOrders = payload.orders;
                state.totalOrders = payload.totalOrders;
                state.loader = false;
            })

            .addCase(get_admin_order_detail.pending, (state) => {
                state.loader2 = true;
            }).addCase(get_admin_order_detail.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader2 = false;
            }).addCase(get_admin_order_detail.fulfilled, (state, { payload }) => {
                state.loader2 = false;
                state.successMessage = payload.message;
                state.order = payload.order;
            })

            .addCase(get_seller_order_detail.pending, (state) => {
                state.loader2 = true;
            }).addCase(get_seller_order_detail.rejected, (state, { payload }) => {
                state.loader2 = false;
                state.errorMessage = payload.error;
            }).addCase(get_seller_order_detail.fulfilled, (state, { payload }) => {
                state.loader2 = false;
                state.successMessage = payload.message;
                state.order = payload.order;
            })

            .addCase(update_order_status_admin.pending, (state) => {
                state.loader2 = true;
            }).addCase(update_order_status_admin.rejected, (state, { payload }) => {
                state.loader2 = false;
                state.errorMessage = payload.error;
            }).addCase(update_order_status_admin.fulfilled, (state, { payload }) => {
                state.loader2 = false;
                state.successMessage = payload.message;
                state.order = payload.order;
            })

            .addCase(update_order_status_seller.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(update_order_status_seller.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(update_order_status_seller.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.order = payload.order;
            })
    }
});
export const { messageClear } = ordersReducer.actions;
export default ordersReducer.reducer;