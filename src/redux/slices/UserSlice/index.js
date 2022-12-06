import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import axios from "axiosConfig";

export const user_status = {
    loading: 0,
    success: 1,
    error: 2,
};

// async actions
export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (userId, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.get(`/users/${userId}`);
            // console.log("get response", response);
            dispatch(setUser(response.data));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const postBoard = createAsyncThunk(
    "user/postBoard",
    async ({ userId, boardName }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.post(`/users/${userId}/boards`, { name: boardName });
            // console.log("post response:", response);
            dispatch(addBoard(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const deleteBoardById = createAsyncThunk(
    "user/deleteBoardById",
    async ({ userId, boardId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.delete(`/users/${userId}/boards/${boardId}`);
            // console.log("delete response:", response);
            dispatch(deleteBoard({ boardId }));
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

// common reducers
const pendingReducerUser = state => {
    state.status = user_status.loading;
};
const rejectedReducerUser = (state, action) => {
    console.log(action.payload);
    state.status = user_status.error;
};

// data format: {id, username, boards: [{ id, name ]}
const initialState = {
    data: {},
    status: user_status.loading,
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
            state.status = user_status.success;
            console.log(current(state));
        },
        addBoard: (state, action) => {
            state.data.boards.push(action.payload);
            state.status = user_status.success;
            console.log(current(state));
        },
        deleteBoard: (state, action) => {
            const { boardId } = action.payload;
            state.data.boards = state.data.boards.filter(item => item.id !== boardId);
            state.status = user_status.success;
            console.log(current(state));
        },
    },
    extraReducers: {
        [getUserById.pending]: pendingReducerUser,
        [getUserById.rejected]: rejectedReducerUser,

        [postBoard.pending]: pendingReducerUser,
        [postBoard.rejected]: rejectedReducerUser,

        [deleteBoardById.pending]: pendingReducerUser,
        [deleteBoardById.rejected]: rejectedReducerUser,
    },
});

export const { setUser, addBoard, deleteBoard } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;
