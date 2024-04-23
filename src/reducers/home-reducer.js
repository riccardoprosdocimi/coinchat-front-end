import {createSlice} from "@reduxjs/toolkit";
import {getTrendingCoinsThunk} from "../services/home-thunk";

const HomeReducer = createSlice({
    name: "coins",
    initialState: [],
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getTrendingCoinsThunk.fulfilled, (state, action) => {
                return action.payload;
            });
    }
});

export default HomeReducer.reducer;