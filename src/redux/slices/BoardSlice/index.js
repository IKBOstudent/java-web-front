import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axiosConfig';

export const board_status = {
    loading: 0,
    success: 1,
    error: 2,
};

// async actions
export const getBoardById = createAsyncThunk(
    'board/getBoardById',
    async ({ boardId, userId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.get('/boards', { boardId, userId });
            dispatch(setBoard(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export const postList = createAsyncThunk(
    'board/postBoard',
    async ({ boardId, listName }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.post('/lists', { boardId, listName });
            dispatch(addList(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export const postCard = createAsyncThunk(
    'board/postBoard',
    async ({ listId, cardName }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.post('/cards', { listId, cardName });
            dispatch(addCard(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export const deleteListById = createAsyncThunk(
    'board/deleteListById',
    async ({ listId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const boardId = getState().BoardReducer.data.id;
            const response = await axios.delete('/lists', { boardId, listId });
            dispatch(deleteList(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export const deleteCardById = createAsyncThunk(
    'board/deleteCardById',
    async ({ listId, cardId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.delete('/cards', { listId, cardId });
            dispatch(deleteCard(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

// common reducers
const pendingReducerBoard = (state) => {
    state.status = board_status.loading;
};
const rejectedReducerBoard = (state, action) => {
    console.warn(action.payload);
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
        setBoard: (state, action) => {
            state.data = action.payload;
            state.status = board_status.success;
        },
        addList: (state, action) => {
            state.data.lists.push(action.payload);
            state.status = board_status.success;
            console.log(current(state));
        },

        deleteList: (state, action) => {
            const { listId } = action.payload;
            state.data.lists = state.data.lists.filter((item) => item.listId !== listId);
            state.status = board_status.success;
            console.log(current(state));
        },

        addCard: (state, action) => {
            const list = state.data.lists.find((obj) => obj.listId === action.payload.listId);
            list.cards.push(action.payload.newCard);
            state.status = board_status.success;
            console.log(current(state));
        },
        deleteCard: (state, action) => {
            const { listId, cardId } = action.payload;
            const list = state.data.lists.find((obj) => obj.listId === listId);
            list.cards = list.cards.filter((item) => item.cardId !== cardId);
            state.status = board_status.success;
            console.log(current(state));
        },
    },
    extraReducers: {
        [getBoardById.pending]: pendingReducerBoard,
        [getBoardById.rejected]: rejectedReducerBoard,

        [postList.pending]: pendingReducerBoard,
        [postList.rejected]: rejectedReducerBoard,

        [deleteListById.pending]: pendingReducerBoard,
        [deleteListById.rejected]: rejectedReducerBoard,

        [postCard.pending]: pendingReducerBoard,
        [postCard.rejected]: rejectedReducerBoard,

        [deleteCardById.pending]: pendingReducerBoard,
        [deleteCardById.rejected]: rejectedReducerBoard,
    },
});

export const { setBoard, addList, deleteList, addCard, deleteCard } = BoardSlice.actions;

export const BoardReducer = BoardSlice.reducer;
