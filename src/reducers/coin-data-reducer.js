import {createSlice} from "@reduxjs/toolkit";
import coinData from "../data/coin-detail/coin-data";
import {CoinDataThunk} from "../services/detail-thunks";

const initialState = {
    coinData,
    fetching: true,
    error: null
}

const CoinDataReducer = createSlice({
    name: 'CoinDataReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(CoinDataThunk.pending, (state) => {
                state.fetching = true;
                state.error = null;
            })
            .addCase(CoinDataThunk.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.error.message;
            })
            .addCase(CoinDataThunk.fulfilled, (state, action) => {
                state.fetching = false;
                state.coinData = action.payload;
                state.error = null;
            });
    }
});

export default CoinDataReducer.reducer