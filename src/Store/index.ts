/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { authenticationReducer } from "features/authentication/authenticationSlice";
import { counterReducer } from "features/Counter/counterSlice";
import { countingWordsReducer } from "features/CountingWords/countingWordsSlice";
import { moviesReducer } from "features/Movies/moviesSlice";

const reducer = combineReducers({
    auth: authenticationReducer,
    counter: counterReducer,
    countingWords: countingWordsReducer,
    movies: moviesReducer,
});

const rootReducer = (state: any, action: PayloadAction) => {
    if (action.type === "authentication/resetAuth") return reducer(undefined, action);

    return reducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
            thunk: true,
        }),
    devTools: process.env.NODE_ENV === "development",
});

export default store;
