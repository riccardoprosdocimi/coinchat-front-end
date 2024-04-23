import {createSlice} from "@reduxjs/toolkit";
import {
    createNewCommentThunk, createNewUCRecordThunk,
    deleteGivenCommentThunk, deleteUCRecordThunk, findUCRecordByUserIDThunk,
    getCommentsByAuthorIDThunk,
    getCommentsByObjectIDThunk, updateUCRecordThunk
} from "../services/comment-thunk";


const initialState = {
    comments:[],
    userReactions: [],
    fetching: true,
    updateFlag: true
}

const GeneralCommentsReducer = createSlice({
   name: "GeneralCommentsReducer",
   initialState,
   reducers: {},
   extraReducers(builder) {
       builder
           .addCase(createNewCommentThunk.pending, (state) => {})
           .addCase(createNewCommentThunk.rejected, () => {
               console.log("createNewCommentThunk is rejected");
           })
           .addCase(createNewCommentThunk.fulfilled, (state) => {
               state.updateFlag = !state.updateFlag;
           })
           .addCase(getCommentsByObjectIDThunk.pending, (state) => {
               state.fetching = true;
           })
           .addCase(getCommentsByObjectIDThunk.rejected, (state) => {
               console.log("getCommentsByObjectIDThunk is rejected");
               state.fetching = true;
           })
           .addCase(getCommentsByObjectIDThunk.fulfilled, (state, { payload }) => {
               state.fetching = false;
               state.comments = payload;
           })
           .addCase(deleteGivenCommentThunk.rejected, (state, { payload }) => {
               console.log("deleteGivenCommentThunk is rejected");
               console.log(payload);
           })
           .addCase(deleteGivenCommentThunk.fulfilled, (state) => {
               state.updateFlag = !state.updateFlag;
           })
           .addCase(getCommentsByAuthorIDThunk.pending, (state) => {
               state.fetching = true;
           })
           .addCase(getCommentsByAuthorIDThunk.fulfilled, (state, { payload }) => {
               state.fetching = false;
               state.comments = payload;
           })
           .addCase(createNewUCRecordThunk.rejected, () => {
               console.log("createNewCommentThunk is rejected");
           })
           .addCase(createNewUCRecordThunk.fulfilled, (state) => {
               state.updateFlag = !state.updateFlag;
           })
           .addCase(findUCRecordByUserIDThunk.rejected, () => {
               console.log("findUCRecordByUserIDThunk is rejected");
           })
           .addCase(findUCRecordByUserIDThunk.fulfilled, (state, { payload }) => {
               state.userReactions = payload;
               state.fetching = false;
           })
           .addCase(deleteUCRecordThunk.rejected, () => {
               console.log("deleteUCRecordThunk is rejected");
           })
           .addCase(deleteUCRecordThunk.fulfilled, (state) => {
               state.updateFlag = !state.updateFlag;
           })
           .addCase(updateUCRecordThunk.rejected, () => {
               console.log("updateUCRecordThunk is rejected");
           })
           .addCase(updateUCRecordThunk.fulfilled, (state) => {
               state.updateFlag = !state.updateFlag;
           });
   }
});

export default GeneralCommentsReducer.reducer;