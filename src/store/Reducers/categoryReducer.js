import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
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

export const get_category = createAsyncThunk(
    'category/get_category',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/category-get?page=${page}
                &perPage=${perPage}&searchValue=${searchValue}`, { withCredentials: true });
            console.log(data);
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
            state.successMessage = payload.message;
            state.categories = [...state.categories, payload.category]
        })

            .addCase(get_category.fulfilled, (state, { payload }) => {
                state.totalCategories = payload.totalCategories;
                state.categories = payload.categories;
            })
    }
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;