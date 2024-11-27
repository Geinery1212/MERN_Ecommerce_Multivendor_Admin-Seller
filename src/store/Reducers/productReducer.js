import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
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
            // console.log(page);
            const { data } = await api.get(`/products-get?page=${page}&perPage=${perPage}&searchValue=${searchValue}`,
                { withCredentials: true });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_products_discount = createAsyncThunk(
    'product/get_products_discount',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(page);
            const { data } = await api.get(`/products-dicount-get?page=${page}&perPage=${perPage}&searchValue=${searchValue}`,
                { withCredentials: true });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_product = createAsyncThunk(
    'product/get_product',
    async ({ productId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(productId);
            const { data } = await api.get(`/product-get/${productId}`,
                { withCredentials: true });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const update_product = createAsyncThunk(
    'product/update_product',
    async (product, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(productId);
            const { data } = await api.post(`/product-update`, product,
                { withCredentials: true });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const product_image_update = createAsyncThunk(
    'product/product_image_update',
    async ({ oldImage, newImage, productId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('oldImage', oldImage);
            formData.append('newImage', newImage);
            formData.append('productId', productId);
            // console.log(productId);
            const { data } = await api.post(`/product-image-update`, formData,
                { withCredentials: true });

            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_product = createAsyncThunk(
    'product/delete_product',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/product-delete/${id}`,
                { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_product_discount = createAsyncThunk(
    'product/delete_product_discount',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/product-delete/${id}`,
                { withCredentials: true });
            // console.log(data);
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
        loader2: false,
        products: [],
        productsDiscount: [],
        product: {},
        totalProducts: 0,
        totalProductsDiscount: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(add_product.pending, (state) => {
            state.loader = true;
        }).addCase(add_product.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        }).addCase(add_product.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
        })

            .addCase(get_products.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_products.rejected, (state) => {
                state.loader = false;
            })
            .addCase(get_products.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.totalProducts = payload.totalProducts;
                state.products = payload.products;
            })

            .addCase(get_products_discount.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_products_discount.rejected, (state) => {
                state.loader = false;
            })
            .addCase(get_products_discount.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.totalProductsDiscount = payload.totalProducts;
                state.productsDiscount = payload.products;
            })


            .addCase(get_product.pending, (state) => {
                state.loader2 = true;
            })
            .addCase(get_product.rejected, (state) => {
                state.loader2 = false;
            })
            .addCase(get_product.fulfilled, (state, { payload }) => {
                state.loader2 = false;
                state.product = payload.product;
            })

            .addCase(update_product.pending, (state) => {
                state.loader = true;
            }).addCase(update_product.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(update_product.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.product = payload.product;
            })

            .addCase(product_image_update.pending, (state) => {
                state.loader = true;
            }).addCase(product_image_update.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(product_image_update.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.product = payload.product;
            })

            .addCase(delete_product.pending, (state) => {
                state.loader = true;
            }).addCase(delete_product.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(delete_product.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.totalProducts = state.totalProducts - 1;
            })

            .addCase(delete_product_discount.pending, (state) => {
                state.loader = true;
            }).addCase(delete_product_discount.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(delete_product_discount.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.totalProductsDiscount = state.totalProductsDiscount - 1;
            })
    }
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;