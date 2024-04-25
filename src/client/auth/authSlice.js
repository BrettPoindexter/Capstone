import { createSlice } from "@reduxjs/toolkit";
import { api } from '../app/api';

//Session Storage Key
const TOKEN = "token";

/**
 * API Endpoints
 */
const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        me: builder.query({
            query: () => "auth/me",
            providesTags: ["Me"],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/api/login",
                method: "POST",
                body: credentials,
            }),
            invalidatedTags: ["Me"],
        }),
        ghLogin: builder.mutation({
            query: () => ({
                url: "auth/login/github",
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/api/register",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["Me"],
        }),
        logout: builder.mutation({
            queryFn: () => ({ data: {} }),
            invalidatesTags: ["Me"],
        })
    })
});

/**
 * Stores payload's token in both state and session storage
 */
function storeToken(state, { payload }) {
    state.token = payload.token;
    window.sessionStorage.setItem(TOKEN, payload.token);
}

/**
 * Stores token whenever login or register succeeds
 */
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: window.sessionStorage.getItem(TOKEN),
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
        builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
        builder.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
            state.token = null;
            window.sessionStorage.removeItem(TOKEN);
        });
    }
});

export default authSlice.reducer;

export const {
    useMeQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGhLoginMutation
} = authApi;