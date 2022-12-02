import { configureStore } from '@reduxjs/toolkit';
import { BoardReducer } from './slices/BoardSlice';
import { UserReducer } from './slices/UserSlice';

const store = configureStore({
    reducer: {
        BoardReducer,
        UserReducer,
    },
});

export default store;
