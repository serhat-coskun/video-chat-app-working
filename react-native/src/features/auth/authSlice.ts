import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken, clearToken, storeToken } from "@services/secureStorageService";
import * as endpoints from "@services/httpApi";
import axios from "axios";

interface AuthState {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | null;
}

interface SignupCredentials {
    username: string;
    password: string;
    email: string;
}

interface SigninCredentials {
    username: string;
    password: string;
}

const initialState: AuthState = {
    isLoading: true,
    isSignout: false,
    userToken: null as string | null,
};

export const restoreToken = createAsyncThunk<string | null>('auth/restoreToken', async () => {
    const userToken = await getToken();
    try {
        if (userToken) {
            const response = await endpoints.validateToken(userToken);
            
            if (endpoints.isValidTokenResponse(response)) {
                console.log(response);
                
                if (response.alive) {
                    return userToken;
                }
            }else {
                console.log(response);
                
                await clearToken();
            }
        }
    } catch (error) {
        console.log(error);
        
    }
    
    return null; // Return null if there is no token or the token is invalid
});


export const signup = createAsyncThunk(
    "auth/signup",
    async (credentials: SignupCredentials, thunkAPI) => {
        try {
            const response = await endpoints.signup(credentials.username, credentials.email, credentials.password);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: SigninCredentials, thunkAPI) => {
        try {
            
            console.log(credentials);
            
            const response = await endpoints.signin(credentials.username, credentials.password);
            console.log("Response is:");
            
            console.log(response);
            if (endpoints.isSigninSuccessResponse(response)) {
                await storeToken(response.token);
            }
            return response;
        } catch (err) {
            
            console.log("There is some error");
            
            console.log(err);
            
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);


export const logout = createAsyncThunk("auth/logout", async () => {
    await clearToken();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(restoreToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userToken = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
              })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(signup.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                if (endpoints.isSigninSuccessResponse(action.payload)) {
                    state.userToken = action.payload.token;
                }
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isSignout = true;
                state.userToken = null;
            });
    },
});


export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectIsSignout = (state: { auth: AuthState }) => state.auth.isSignout;
export const selectUserToken = (state: { auth: AuthState }) => state.auth.userToken;

export default authSlice.reducer;



