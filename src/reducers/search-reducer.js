import {createSlice} from "@reduxjs/toolkit";
import resList from "../data/search/search-result";
import {SearchCoinThunk} from "../services/search-thunk";

// ready for interaction with database

const initialState = {
    resList,
    Searching: false
}


const SearchReducer = createSlice({
      name: 'SearchReducer',
      initialState,
      reducers: {},
      extraReducers(builder) {
          builder
              .addCase(SearchCoinThunk.fulfilled, (state, action) => {
                  state.resList = action.payload;
              });
      }
});

export default SearchReducer.reducer