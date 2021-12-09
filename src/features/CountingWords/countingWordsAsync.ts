/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWordsWithFrequency, getSentence } from "./helpers";

const countingWordsAsync = createAsyncThunk("countingWords/fetchSentence", async (value: string) => {
    const wordsFrequency = getWordsWithFrequency(value);
    const sentenceForWordCounting = getSentence(value);

    const data = {
        sentence: value,
        sentenceForWordCounting,
        wordsFrequency,
    };

    return data;
});

export default countingWordsAsync;
