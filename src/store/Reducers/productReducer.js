import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
//asynchronous aperations
export const add_product = createAsyncThunk(
    'product/add',
    async (product, { rejectWithValue, fulfillWithValue }) => {
        try {
            // Using for...of loop to log all key-value pairs
            // for (let pair of product.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
            const { data } = await api.post('/product-add', product, { withCredentials: true });
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_products = createAsyncThunk(
    'product/get_products',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(page);
            const { data } = await api.get(`/products-get?page=${page}&perPage=${perPage}&searchValue=${searchValue}`,
                { withCredentials: true });

            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const productReducer = createSlice({
    name: 'product',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        products: [],
        totalProducts: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(add_product.pending, (state, { payload }) => {
            state.loader = true;
        }).addCase(add_product.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        }).addCase(add_product.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
        })
            .addCase(get_products.fulfilled, (state, { payload }) => {
                state.totalProducts = payload.totalProducts;
                state.products = payload.products;
            })
    }
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;