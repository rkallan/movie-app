// import { validations } from "rkallan-javascript-helpers";
import { InterfaceWordFrequency, TypeWordFrequencyProps, TypeSentenceAsArray } from "./types";

const getSentence = (sentence: string): string => {
    const tempSentence = sentence
        .replace(/[^A-Za-z]+/g, " ")
        .replace(/^\s*[\r\n]/gm, "")
        .trim()
        .toLowerCase();

    return tempSentence;
};

const getSentenceAsArray = (sentence: string): TypeSentenceAsArray => {
    const tempSentence = getSentence(sentence);
    const sentenceAsArray = tempSentence.trim().length ? tempSentence.split(" ") : [];

    return sentenceAsArray;
};

const getUniqueWords = (sentence: string): TypeSentenceAsArray => {
    const sentenceAsArray = getSentenceAsArray(sentence);
    const uniqueWordsArray = Array.from(new Set(sentenceAsArray));

    return uniqueWordsArray;
};

const getFrequencyForWord = ({ word, sentence }: TypeWordFrequencyProps): number => {
    const words = getSentenceAsArray(sentence);
    const frequency = words.filter((currentWord) => currentWord === word.toLowerCase()).length;

    return frequency;
};

const getWordFrequency = ({ word, sentence }: TypeWordFrequencyProps): InterfaceWordFrequency => {
    const frequency = getFrequencyForWord({ word, sentence });

    return {
        word,
        frequency,
    };
};

const getWordsWithFrequency = (sentence: string): Array<InterfaceWordFrequency> => {
    const words = getUniqueWords(sentence);
    const wordsFrequency = words.map((word) => getWordFrequency({ word, sentence })) || [];

    const wordsFrequencySort = wordsFrequency.sort((current, previous) => {
        if (current.frequency === previous.frequency) return current.word < previous.word ? -1 : 1;

        return current.frequency < previous.frequency ? 1 : -1;
    });

    return wordsFrequencySort;
};

export { getSentence, getWordsWithFrequency };
