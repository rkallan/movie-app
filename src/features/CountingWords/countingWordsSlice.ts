import { createSlice } from "@reduxjs/toolkit";
import countingWordsAsync from "./countingWordsAsync";
import { InterfaceCountingWords } from "./types";

const initialState: InterfaceCountingWords = {
    entities: {
        sentence: "",
        sentenceForWordCounting: "",
        wordsFrequency: [],
    },
    loading: false,
    currentRequestId: undefined,
    error: undefined,
};

const countingWordsSlice = createSlice({
    name: "countingWords",
    initialState,
    reducers: {},
    extraReducers: {
        [countingWordsAsync.pending.type]: (state, action) => {
            const { requestId } = action.meta;
            const newState = state;
            newState.loading = true;
            newState.currentRequestId = requestId;
        },
        [countingWordsAsync.fulfilled.type]: (state, action) => {
            const newState = state;
            newState.loading = false;
            newState.entities = action.payload;
            newState.currentRequestId = undefined;
        },
    },
});

const countingWordsReducer = countingWordsSlice.reducer;

export { countingWordsReducer, countingWordsAsync };
