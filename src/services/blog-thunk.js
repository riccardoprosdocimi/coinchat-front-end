import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createNewBlog,
    deleteABlog,
    findAllBlogs,
    findBlogByAuthorID,
    findBlogByBlogID,
    findBlogByCoinID,
    updateABlog
} from "./blog-service";


export const createNewBlogThunk = createAsyncThunk(
    "createNewBlog",
    (newBlog) => createNewBlog(newBlog)
)

export const findAllBlogsThunk = createAsyncThunk(
    "findAllBlogs",
    () => findAllBlogs()
)

export const findBlogByAuthorIDThunk = createAsyncThunk(
    "findBlogByAuthorID",
    (authorID) => findBlogByAuthorID(authorID)
)

export const findBlogByCoinIDThunk = createAsyncThunk(
    "findBlogByCoinID",
    (coinID) => findBlogByCoinID(coinID)
)

export const updateABlogThunk = createAsyncThunk(
    "updateABlog",
    (arg) => updateABlog(arg.blogID, arg.blogData)
)

export const deleteABlogThunk = createAsyncThunk(
    "deleteABlog",
    (blogID) => deleteABlog(blogID)
)


export const findBlogByBlogIDThunk = createAsyncThunk(
    "findBlogByBlogID",
    (blogID) => {
        return findBlogByBlogID(blogID)
    }
)