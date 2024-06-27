import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./users-service";

export const createUserThunk = createAsyncThunk(
    'users/createUser',
    async user => await service.createUser(user)
);

export const registerThunk = createAsyncThunk(
    'users/register',
    async (user) => {
        return await service.register(user);
    }
);

export const findAllUsersThunk = createAsyncThunk(
    'users/findAllUsers',
    async () => await service.findAllUsers()
);

export const deleteUserThunk = createAsyncThunk(
    'users/deleteUser',
    async uid => {
        await service.deleteUser(uid);
        return uid;
    }
);

export const updateUserThunk = createAsyncThunk(
    'users/updateUser',
    async user => await service.updateUser(user)
);

export const loginThunk = createAsyncThunk(
    'users/login',
    async user => await service.login(user)
);

export const logoutThunk = createAsyncThunk(
    'users/logout',
    async () => await service.logout()
);

export const profileThunk = createAsyncThunk(
    'users/profile',
    async () => await service.profile()
);

export const findUserByIdThunk = createAsyncThunk(
    'users/findUserById',
    async (uid) => await service.findUserById(uid)
);