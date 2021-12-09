import { createSelector } from "@reduxjs/toolkit";
import { validations } from "rkallan-javascript-helpers";
import { RootState } from "Store/types";
import { InterfaceCountingWords, InterfaceWordFrequency } from "./types";

const countingWordsState = ({ countingWords }: RootState): InterfaceCountingWords => countingWords;
const getSentence = createSelector(countingWordsState, (countingWords) => countingWords.entities.sentence);
const getSentenceForWordCounting = createSelector(countingWordsState, (countingWords) => countingWords.entities.sentenceForWordCounting);
const getWordsFrequency = createSelector(countingWordsState, (countingWords) => countingWords.entities.wordsFrequency);
const getTotalWords = createSelector(getSentenceForWordCounting, (sentenceForWordCounting) =>
    validations.isNotEmpty(sentenceForWordCounting, true) ? sentenceForWordCounting.split(" ").length : 0
);
const getTotalUniqueWords = createSelector(getWordsFrequency, (wordsFrequency) => wordsFrequency.length);
const getHighestFrequency = createSelector(getWordsFrequency, (wordsFrequency) => {
    const highestWordFrequency: InterfaceWordFrequency = wordsFrequency.slice(0, 1)[0] || {};
    const highestFrequency = highestWordFrequency?.frequency || 0;

    return highestFrequency;
});

export { countingWordsState, getSentence, getWordsFrequency, getTotalWords, getTotalUniqueWords, getHighestFrequency };
