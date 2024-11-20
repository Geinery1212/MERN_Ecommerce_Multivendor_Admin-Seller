import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
export const get_admin_dashboard_data = createAsyncThunk(
    'dashboard/get_admin_dashboard_data',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/admin/get-dashboard-data', { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_seller_dashboard_data = createAsyncThunk(
    'dashboard/get_seller_dashboard_data',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/seller/get-dashboard-data', { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
        loader: false,
        totalSales: 0,
        totalProducts: 0,
        totalSellers: 0,
        totalOrders: 0,
        totalPendingOrders: 0,
        recentOrders: [],
        recentMessages: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(get_admin_dashboard_data.pending, (state, { payload }) => {
            state.loader = true;            
        })
        .addCase(get_admin_dashboard_data.rejected, (state, { payload }) => {
            state.loader = false;                
        })
        .addCase(get_admin_dashboard_data.fulfilled, (state, { payload }) => {
            state.loader = false;            
            state.totalSales = payload.totalSales;
            state.totalProducts = payload.totalProducts;
            state.totalSellers = payload.totalSellers;
            state.totalOrders = payload.totalOrders;            
            state.recentOrders = payload.recentOrders;
            state.recentMessages = payload.recentMessages;      
        })

        .addCase(get_seller_dashboard_data.pending, (state, { payload }) => {
            state.loader = true;            
        })
        .addCase(get_seller_dashboard_data.rejected, (state, { payload }) => {
            state.loader = false;                
        })
        .addCase(get_seller_dashboard_data.fulfilled, (state, { payload }) => {
            state.loader = false;            
            state.totalSales = payload.totalSales;
            state.totalProducts = payload.totalProducts;            
            state.totalOrders = payload.totalOrders;            
            state.recentOrders = payload.recentOrders;
            state.recentMessages = payload.recentMessages;    
            state.totalPendingOrders = payload.totalPendingOrders;  
        })

    }
})
export const { messageClear } = dashboardReducer.actions
export default dashboardReducer.reducer