import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: undefined,
    error: undefined,
};

const movies = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            const newState = state;
            const { search, error } = action.payload;

            newState.list = search;
            newState.error = error;

            return newState;
        },
        resetMovies: () => {
            return initialState;
        },
    },
});

const { setMovies, resetMovies } = movies.actions;
const moviesReducer = movies.reducer;

export { moviesReducer, setMovies, resetMovies };
