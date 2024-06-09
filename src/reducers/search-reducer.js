import {createSlice} from "@reduxjs/toolkit";
import resList from "../data/search/search-result";
import {SearchCoinThunk} from "../services/search-thunk";

const initialState = {
    resList,
    loading: false,
    error: null
};

const SearchReducer = createSlice({
      name: 'SearchReducer',
      initialState,
      reducers: {},
      extraReducers(builder) {
          builder
              .addCase(SearchCoinThunk.pending, (state) => {
                  state.loading = true;
                  state.error = null;
              })
              .addCase(SearchCoinThunk.fulfilled, (state, action) => {
                  state.loading = false;
                  state.resList = action.payload;
                  state.error = null;
              })
              .addCase(SearchCoinThunk.rejected, (state, action) => {
                  state.loading = false;
                  state.resList = [];
                  state.error = action.error.message;
              });
      }
  });

export default SearchReducer.reducer;