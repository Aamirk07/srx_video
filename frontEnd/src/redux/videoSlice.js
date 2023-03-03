import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentVideo: null,
    loading: false,
    error: false,
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
            state.currentVideo = null;
            state.error = false;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload;
            state.error = false;

        },
        fetchFaliure: (state) => {
            state.loading = false;
            state.currentVideo = null;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload)
                state.currentVideo.disLikes.splice(state.currentVideo.disLikes.findIndex(userId => userId === action.payload), 1)
            }
        },
        disLike: (state, action) => {
            if (!state.currentVideo.disLikes.includes(action.payload)) {
                state.currentVideo.disLikes.push(action.payload)
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex(userId => userId === action.payload), 1)
            }
        }
    },
})


export const { fetchStart, fetchSuccess, fetchFaliure, like, disLike } = videoSlice.actions

export default videoSlice.reducer
