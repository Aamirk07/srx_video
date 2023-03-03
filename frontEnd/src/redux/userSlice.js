import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.currentUser = null;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;

        },
        loginFaliure: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = true;
        },
        logout: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = false;
        },
        subscripton: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex(chnnelId => chnnelId === action.payload), 1)
            } else {
                state.currentUser.subscribedUsers.push(action.payload)
            }
        }
    },
})


export const { loginStart, loginSuccess, loginFaliure, logout, subscripton } = userSlice.actions

export default userSlice.reducer
