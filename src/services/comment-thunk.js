import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createNewComment, createNewUCRecord,
    deleteGivenComment, deleteUCRecord, findUCRecordByUserID,
    getCommentsByAuthorID,
    getCommentsByObjectID, updateUCRecord
} from "./comment-service";


export const createNewCommentThunk = createAsyncThunk(
    "createNewComment",
    (newComment) => createNewComment(newComment)
)

export const getCommentsByObjectIDThunk = createAsyncThunk(
    "getCommentsByObjectID",
    (arg) => {
        return getCommentsByObjectID(arg.objID, arg.objType)
    }

)

export const deleteGivenCommentThunk = createAsyncThunk(
    "deleteGivenComment",
    (commentID) => deleteGivenComment(commentID)
)

export const getCommentsByAuthorIDThunk = createAsyncThunk(
    'getCommentsByAuthorID',
    async (uid) => await getCommentsByAuthorID(uid)
)

export const createNewUCRecordThunk = createAsyncThunk(
    "createNewUCRecord",
    async (newUCRecord) => await createNewUCRecord(newUCRecord)
)

export const findUCRecordByUserIDThunk = createAsyncThunk(
    "findUCRecordByUserID",
    async (userID) => await findUCRecordByUserID(userID)
)

export const deleteUCRecordThunk = createAsyncThunk(
    "deleteUCRecord",
    async (targetRecord) => await deleteUCRecord(targetRecord)
)

export const updateUCRecordThunk = createAsyncThunk(
    "updateUCRecord",
    (originalReaction) => updateUCRecord(originalReaction)

)