import {createSlice} from "@reduxjs/toolkit";
import {
    findFollowIdThunk,
    findUsersFollowedByUserThunk,
    findUsersFollowingUserThunk,
    userFollowsUserThunk,
    userUnfollowsUserThunk
} from "../services/follow-thunks";

const initialState = {
    following: [],
    followers: [],
    followId: null
}

const followReducer = createSlice(
    {
        name: 'follow',
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(userFollowsUserThunk.fulfilled, (state, { payload }) => {
                    state.following.push(payload);
                })
                .addCase(userUnfollowsUserThunk.fulfilled, (state, { payload }) => {
                    state.following = state.following.filter(user => user._id !== payload);
                })
                .addCase(findUsersFollowingUserThunk.fulfilled, (state, { payload }) => {
                    state.followers = payload;
                })
                .addCase(findUsersFollowedByUserThunk.fulfilled, (state, { payload }) => {
                    state.following = payload;
                })
                .addCase(findFollowIdThunk.fulfilled, (state, { payload }) => {
                    state.followId = payload._id;
                });
        }
    });

export default followReducer.reducer