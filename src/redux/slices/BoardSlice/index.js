import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axiosConfig';

export const board_status = {
    loading: 0,
    success: 1,
    error: 2,
};

// async actions
export const getBoardById = createAsyncThunk('user/getBoardById', async (boardId) => {
    const response = await axios.get('/boards/' + boardId);
    return response.data;
});

// common reducers
const pendingReducer = (state) => {
    state.data = null;
    state.status = board_status.loading;
};
const rejectedReducer = (state) => {
    state.data = null;
    state.status = board_status.error;
};

// data format: {id, userId, name, lists: [{ listId, listName, cards: [{ cardId, cardName }] ]}
const initialState = {
    data: null,
    status: board_status.loading,
};

const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addList: (state, action) => {
            const prev = state.data.lists;
            state.data.lists = [
                ...prev,
                { listId: prev.length + 1, listName: action.payload, cards: [] },
            ];
        },

        addCard: (state, action) => {
            const prev = state.data.lists;

            const index = prev.findIndex((obj) => obj.listId === action.payload.id);
            prev[index].cards.push({
                cardId: prev[index].cards.length + 1,
                cardName: action.payload.name,
            });
        },
    },
    extraReducers: {
        [getBoardById.pending]: pendingReducer,
        [getBoardById.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = board_status.success;
        },
        [getBoardById.rejected]: rejectedReducer,
    },
});

export const { addList, addCard } = BoardSlice.actions;

export const BoardReducer = BoardSlice.reducer;
