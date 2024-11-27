import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
import { jwtDecode } from 'jwt-decode';
//asynchronous aperations
export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        // console.log(info);
        try {
            const { data } = await api.post('/admin-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(info);
            const { data } = await api.post('/seller-register', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        // console.log(info);
        try {
            const { data } = await api.post('/seller-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/get-info', { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(productId);
            const { data } = await api.post(`/profile-image-update`, formData,
                { withCredentials: true });

            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const add_shop_data = createAsyncThunk(
    'auth/add_shop_data',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(info);
            const { data } = await api.post('/add-shop-data', info, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/dashboard/logout', { withCredentials: true });
            if (role === 'admin') {
                navigate('/admin/login');
            } else {
                navigate('/login');
            }
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const change_password = createAsyncThunk(
    'auth/change_password',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put('/dashboard/change-password', obj, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
const returnRole = (token) => {
    if (token) {
        const decodeToken = jwtDecode(token);
        const expireTime = new Date(decodeToken.exp * 1000);
        if (new Date() > expireTime) {
            localStorage.removeItem('accessToken');
        } else {
            return decodeToken.role;
        }
    } else {
        return '';
    }
}
export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        loaderLogOut: false,
        loaderChangePasword: false,
        userInfo: '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(admin_login.pending, (state, { payload }) => {
            state.loader = true;
        }).addCase(admin_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        }).addCase(admin_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.token = payload.token;
            state.role = returnRole(payload.token);
        })

            .addCase(seller_register.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(seller_register.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(seller_register.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })

            .addCase(seller_login.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(seller_login.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(seller_login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })

            .addCase(get_user_info.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.userInfo = payload.userInfo;
            })

            .addCase(profile_image_upload.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(profile_image_upload.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(profile_image_upload.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.userInfo = payload.userInfo;
            })

        builder.addCase(add_shop_data.pending, (state, { payload }) => {
            state.loader = true;
        }).addCase(add_shop_data.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        }).addCase(add_shop_data.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.userInfo = payload.userInfo;
        })

            .addCase(logout.pending, (state) => {
                state.loaderLogOut = true;
            })
            .addCase(logout.rejected, (state) => {
                state.loaderLogOut = false;
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.loaderLogOut = false;
                localStorage.removeItem('accessToken');
            })

            .addCase(change_password.pending, (state) => {
                state.loaderChangePasword = true;
            })
            .addCase(change_password.rejected, (state, {payload}) => {
                state.loaderChangePasword = false;
                state.errorMessage = payload.error;
            })
            .addCase(change_password.fulfilled, (state, { payload }) => {
                state.loaderChangePasword = false;
                state.successMessage = payload.message;                
            })
    }
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;