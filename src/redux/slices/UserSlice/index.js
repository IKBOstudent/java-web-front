import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axiosConfig';

export const user_status = {
    loading: 0,
    success: 1,
    error: 2,
};

// async actions
export const getUserById = createAsyncThunk('user/getUserById', async (userId) => {
    const response = await axios.get('/users/' + userId);
    return response.data;
});

// common reducers
const pendingReducer = (state) => {
    state.data = null;
    state.status = user_status.loading;
};
const rejectedReducer = (state) => {
    state.data = null;
    state.status = user_status.error;
};

// data format: {id, username, boards: [{ boardId, boardName ]}
const initialState = {
    data: null,
    status: user_status.loading,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addBoard: (state, action) => {
            const prev = state.data.boards;
            state.data.boards = [...prev, { boardId: prev.length + 1, boardName: action.payload }];
        },
    },
    extraReducers: {
        [getUserById.pending]: pendingReducer,
        [getUserById.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = user_status.success;
        },
        [getUserById.rejected]: rejectedReducer,
    },
});

export const { addBoard } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;
