import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const board_status = {
    loading: 0,
    success: 1,
    error: 2,
};

// async actions
export const getBoardById = createAsyncThunk(
    "board/getBoardById",
    async ({ boardId, userId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.get(`/boards/${boardId}`);
            console.log("get response", response);
            dispatch(setBoard(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const postList = createAsyncThunk(
    "board/postBoard",
    async ({ boardId, listName }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.post(`/boards/${boardId}/lists`, { name: listName });
            console.log("post response", response);
            dispatch(addList(response.data));
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const postCard = createAsyncThunk(
    "board/postBoard",
    async ({ listId, cardName }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.post(`/lists/${listId}/cards`, { name: cardName });
            console.log("post response", response);
            dispatch(addCard({ listId, newCard: { ...response.data } }));
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const deleteListById = createAsyncThunk(
    "board/deleteListById",
    async ({ listId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const boardId = getState().BoardReducer.data.id;
            const response = await axios.delete(`/boards/${boardId}/lists/${listId}`);
            dispatch(deleteList({ listId }));
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const deleteCardById = createAsyncThunk(
    "board/deleteCardById",
    async ({ listId, cardId }, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await axios.delete(`/lists/${listId}/cards/${cardId}`);
            dispatch(deleteCard({ listId, cardId }));
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

// common reducers
const pendingReducerBoard = state => {
    state.status = board_status.loading;
};
const rejectedReducerBoard = (state, action) => {
    console.warn(action.payload);
    state.status = board_status.error;
};

// data format: {id, name, lists: [{ id, name, cards: [{ id, name }] ]}
const initialState = {
    data: null,
    status: board_status.loading,
};

const BoardSlice = createSlice({
    name: "board",
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
            state.data.lists = state.data.lists.filter(item => item.id !== listId);
            state.status = board_status.success;
            console.log(current(state));
        },

        addCard: (state, action) => {
            console.log(action.payload);
            const list = state.data.lists.find(obj => obj.id === action.payload.listId);
            list.cards.push(action.payload.newCard);
            state.status = board_status.success;
            console.log(current(state));
        },
        deleteCard: (state, action) => {
            const { listId, cardId } = action.payload;
            const list = state.data.lists.find(obj => obj.id === listId);
            list.cards = list.cards.filter(item => item.id !== cardId);
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
