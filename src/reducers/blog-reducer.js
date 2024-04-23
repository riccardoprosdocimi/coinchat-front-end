import {createSlice} from "@reduxjs/toolkit";
import {
    createNewBlogThunk, deleteABlogThunk,
    findAllBlogsThunk,
    findBlogByAuthorIDThunk, findBlogByBlogIDThunk,
    findBlogByCoinIDThunk, updateABlogThunk
} from "../services/blog-thunk";

const initialState = {
    blogList:[],
    curBlog: null,
    fetching: true,
    updateFlag: true
}


const BlogsReducer = createSlice({
     name: "BlogsReducer",
     initialState,
     reducers: {},
     extraReducers(builder) {
         builder
             .addCase(createNewBlogThunk.rejected, () => {
                 console.log("createNewBlogThunk is rejected");
             })
             .addCase(createNewBlogThunk.fulfilled, (state) => {
                 state.updateFlag = !state.updateFlag;
             })
             .addCase(findAllBlogsThunk.rejected, () => {
                 console.log("findAllBlogsThunk is rejected");
             })
             .addCase(findAllBlogsThunk.pending, (state) => {
                 state.fetching = true;
             })
             .addCase(findAllBlogsThunk.fulfilled, (state, { payload }) => {
                 state.fetching = false;
                 state.blogList = payload;
             })
             .addCase(findBlogByAuthorIDThunk.rejected, () => {
                 console.log("findBlogByAuthorIDThunk is rejected");
             })
             .addCase(findBlogByAuthorIDThunk.pending, (state) => {
                 state.fetching = true;
             })
             .addCase(findBlogByAuthorIDThunk.fulfilled, (state, { payload }) => {
                 state.fetching = false;
                 state.blogList = payload;
             })
             .addCase(findBlogByCoinIDThunk.rejected, () => {
                 console.log("findBlogByCoinIDThunk is rejected");
             })
             .addCase(findBlogByCoinIDThunk.pending, (state) => {
                 state.fetching = true;
             })
             .addCase(findBlogByCoinIDThunk.fulfilled, (state, { payload }) => {
                 state.fetching = false;
                 state.blogList = payload;
             })
             .addCase(findBlogByBlogIDThunk.rejected, () => {
                 console.log("findBlogByBlogIDThunk is rejected");
             })
             .addCase(findBlogByBlogIDThunk.pending, (state) => {
                 state.fetching = true;
             })
             .addCase(findBlogByBlogIDThunk.fulfilled, (state, { payload }) => {
                 state.fetching = false;
                 state.curBlog = payload;
             })
             .addCase(updateABlogThunk.rejected, () => {
                 console.log("updateABlogThunk is rejected");
             })
             .addCase(updateABlogThunk.fulfilled, (state) => {
                 state.updateFlag = !state.updateFlag;
             })
             .addCase(deleteABlogThunk.rejected, () => {
                 console.log("deleteABlogThunk is rejected");
             })
             .addCase(deleteABlogThunk.fulfilled, (state) => {
                 state.updateFlag = !state.updateFlag;
             });
     }
 });

export default BlogsReducer.reducer;