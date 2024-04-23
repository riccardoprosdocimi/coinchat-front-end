import axios from "axios";
import {Blog_API} from "../util/global-variables";

export const createNewBlog = async (newBlog) => {
    await axios.post(Blog_API, newBlog).then().catch(
        err => console.log(err)
    )
}

export const findAllBlogs = async () => {
    return (await axios.get(`${Blog_API}/all`)).data
}

export const findBlogByAuthorID = async (authorID) => {
    const requestBody = {
        authorID
    }
    return (await axios.get(`${Blog_API}/author`, {params: requestBody})).data
}

export const findBlogByCoinID = async (coinID) => {
    const requestBody = {
        coinID
    }
    return (await axios.get(`${Blog_API}/coin`, {params: requestBody})).data
}


export const updateABlog = async (blogID, blogData) => {
    const requestBody = {
        blogID
    }
    console.log(blogID)
    console.log(blogData)
    return (await axios.put(Blog_API, blogData, {params: requestBody})).data
}

export const deleteABlog = async (blogID) => {
    const requestBody = {
        blogID
    }
    return (await axios.delete(Blog_API, {params: requestBody}))
}

export const findBlogByBlogID = async (blogID) => {
    const requestBody = {
        blogID
    }
    const response = await axios.get(`${Blog_API}/one`, {params: requestBody})
    return response.data
}