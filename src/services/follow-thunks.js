import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    findFollowId,
    findUsersFollowedByUser,
    findUsersFollowingUser,
    userFollowsUser,
    userUnfollowsUser
} from "./follow-service"

export const userFollowsUserThunk = createAsyncThunk(
    'userFollowsUser',
    async (follow) =>
        await userFollowsUser(follow)
)

export const userUnfollowsUserThunk = createAsyncThunk(
    'userUnfollowsUser',
    async (fid) =>
        await userUnfollowsUser(fid)
)

export const findUsersFollowingUserThunk = createAsyncThunk(
    'findUsersFollowingUser',
    async (uid) =>
        await findUsersFollowingUser(uid)
)

export const findUsersFollowedByUserThunk = createAsyncThunk(
    'findUsersFollowedByUser',
    async (uid) =>
        await findUsersFollowedByUser(uid)
)
export const findFollowIdThunk = createAsyncThunk(
    'findFollowId',
    async (ouid) =>
        await findFollowId(ouid)
)