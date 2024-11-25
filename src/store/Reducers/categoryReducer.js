import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
//asynchronous aperations
export const add_category = createAsyncThunk(
    'category/add',
    async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
        try {
            //FormData needed to send images ;v
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);
            const { data } = await api.post('/category-add', formData, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const update_category = createAsyncThunk(
    'category/update',
    async ({ name, image, id }, { rejectWithValue, fulfillWithValue }) => {
        try {
            //FormData needed to send images ;v
            const formData = new FormData();
            formData.append('name', name);
            if (image) {
                formData.append('image', image);
            }
            const { data } = await api.put(`/category-update/${id}`, formData, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_category = createAsyncThunk(
    'category/get_category',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/category-get?page=${page}
                &perPage=${perPage}&searchValue=${searchValue}`, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_category = createAsyncThunk(
    'category/delete_category',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/category-delete/${id}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const categoryReducer = createSlice({
    name: 'category',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        loader2: false,
        categories: [],
        totalCategories: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(add_category.pending, (state, { payload }) => {
            state.loader = true;
        }).addCase(add_category.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        }).addCase(add_category.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.totalCategories = state.totalCategories + 1;
            state.successMessage = payload.message;
        })
            .addCase(get_category.pending, (state, { payload }) => {
                state.loader2 = true;
            })
            .addCase(get_category.rejected, (state, { payload }) => {
                state.loader2 = false;
            })
            .addCase(get_category.fulfilled, (state, { payload }) => {
                state.loader2 = false;
                state.totalCategories = payload.totalCategories;
                state.categories = payload.categories;
            })

            .addCase(update_category.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(update_category.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(update_category.fulfilled, (state, { payload }) => {
                const index = state.categories.findIndex((cat) => cat._id === payload.category._id);
                if (index !== -1) {
                    state.categories[index] = payload.category;
                }
                state.loader = false;
                state.successMessage = payload.message;

            })

            .addCase(delete_category.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(delete_category.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(delete_category.fulfilled, (state, { payload }) => {
                state.totalCategories = state.totalCategories - 1;
                state.loader = false;
                state.successMessage = payload.message;

            })
    }
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;