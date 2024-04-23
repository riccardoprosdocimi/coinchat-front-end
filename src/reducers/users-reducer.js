import {createSlice} from "@reduxjs/toolkit";
import {
    findAllUsersThunk,
    loginThunk,
    logoutThunk,
    registerThunk,
    profileThunk,
    deleteUserThunk,
    updateUserThunk,
    createUserThunk,
    findUserByIdThunk
} from "../services/users-thunks";

const initialState = {
    loading: false,
    users: [],
    currentUser: null,
    publicProfile: {},
    error: null
}

const UsersReducer = createSlice({
     name: 'users',
     initialState,
     reducers: {},
     extraReducers(builder) {
         builder
             .addCase(createUserThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.users.push(action.payload);
             })
             .addCase(registerThunk.pending, (state) => {
                 state.loading = true;
                 state.currentUser = null;
             })
             .addCase(registerThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.users.push(action.payload);
                 state.currentUser = action.payload;
             })
             .addCase(registerThunk.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.error.message;
                 state.currentUser = null;
             })
             .addCase(findAllUsersThunk.pending, (state) => {
                 state.loading = true;
                 state.users = [];
             })
             .addCase(findAllUsersThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.users = action.payload;
             })
             .addCase(findAllUsersThunk.rejected, (state) => {
                 state.loading = false;
             })
             .addCase(deleteUserThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.users = state.users.filter(user => user._id !== action.payload);
             })
             .addCase(updateUserThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.currentUser = action.payload;
             })
             .addCase(loginThunk.pending, (state) => {
                 state.loading = true;
                 state.currentUser = null;
                 state.error = null;
             })
             .addCase(loginThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.currentUser = action.payload;
                 state.error = null;
             })
             .addCase(loginThunk.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.payload;
                 state.currentUser = null;
             })
             .addCase(logoutThunk.fulfilled, (state) => {
                 state.loading = false;
                 state.currentUser = null;
             })
             .addCase(profileThunk.rejected, (state, action) => {
                 state.loading = false;
                 state.error = action.payload;
                 state.currentUser = null;
             })
             .addCase(profileThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.currentUser = action.payload;
                 state.error = null;
             })
             .addCase(findUserByIdThunk.fulfilled, (state, action) => {
                 state.loading = false;
                 state.publicProfile = action.payload;
             });
     }
});

export default UsersReducer.reducer;