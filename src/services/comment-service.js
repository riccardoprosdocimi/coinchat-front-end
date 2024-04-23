import axios from "axios";
import {Comment_API, User_API} from "../util/global-variables";

export const createNewComment = async (newComment) => {
     await axios.post(Comment_API, newComment).then().catch(
         err => console.log(err)
     )
}


export const getCommentsByObjectID = async (objID, objType) => {
    if (objID.length === 0) {
        console.log("getComment receive empty object id");
        return {}
    }
    const requestBody = {
        objID: objID,
        objType: objType
    }

    const response = await axios.get(`${Comment_API}/object`, {params: requestBody})
    return response.data;
}

// @Gino create function
export const getCommentsByAuthorID = async (uid) => {
    const response = await axios.get(`${User_API}/${uid}/comments`)
    return response.data

}

export const deleteGivenComment = async (commentID) => {
    if (commentID.length === 0) {
        console.log("deleteGivenComment receive empty comment id");
        return {}
    }

    const requestBody = {
        commentID
    }
    return (await axios.delete(Comment_API, {params: requestBody})).data
}


/*---------- All reaction related services --------------------*/

export const createNewUCRecord = async (newUCRecord) => {
    return (await axios.post(`${Comment_API}/react`, newUCRecord)).data
}

export const findUCRecordByUserID = async (userID) => {
    const requestBody = {
        userID
    }

    const response = await axios.get(`${Comment_API}/react/uid`, {params: requestBody})
    return response.data;
}

export const deleteUCRecord = async (targetRecord) => {
    const response = await axios.delete(`${Comment_API}/react`, {params: targetRecord})
    return response.data;
}

export const updateUCRecord = async (originalReaction) => {
    return (await axios.put(`${Comment_API}/react`, originalReaction)).data;
}