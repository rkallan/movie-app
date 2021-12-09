import { getWordsFromSentence } from "./helpers";
import WordFrequency from "./WordFrequency";
import { InterfaceWordFrequency, InterfaceWordFrequencyAnalyzer } from "./types";

class WordFrequencyAnalyzer implements InterfaceWordFrequencyAnalyzer {
    #sentence: string;

    constructor() {
        this.#sentence = "";
    }

    #getSentenceAsArray = (): Array<string> => {
        const sentenceAsArray = getWordsFromSentence(this.#sentence);

        return sentenceAsArray;
    };

    #getUniqueWords = (): Array<string> => {
        const sentenceAsArray = this.#getSentenceAsArray();
        const uniqueWords = Array.from(new Set(sentenceAsArray));

        return uniqueWords;
    };

    #getWordsWithFrequency = (): Array<InterfaceWordFrequency> => {
        const words = this.#getUniqueWords();
        const wordsWithFrequency = words.map((word) => {
            const wordFrequency = new WordFrequency(this.#sentence, word);

            return wordFrequency;
        });

        return wordsWithFrequency;
    };

    #getWordsWithFrequencySorted = (): Array<InterfaceWordFrequency> => {
        const wordsWithFrequency = this.#getWordsWithFrequency();
        const wordsWithFrequencySorted = wordsWithFrequency.sort((current, previous) => {
            if (current.getFrequency() === previous.getFrequency()) return current.getWord() < previous.getWord() ? -1 : 1;

            return current.getFrequency() < previous.getFrequency() ? 1 : -1;
        });

        return wordsWithFrequencySorted;
    };

    calculateHighestFrequency = (sentence = ""): number => {
        const word = this.calculateMostFrequentNWords(sentence, 1)[0];
        const frequency = word?.getFrequency() ?? 0;

        return frequency;
    };

    calculateFrequencyForWord = (sentence = "", word = ""): number => {
        const wordFrequency = new WordFrequency(sentence, word);
        const frequency = wordFrequency?.getFrequency() ?? 0;

        return frequency;
    };

    calculateMostFrequentNWords = (sentence = "", number = 1): Array<InterfaceWordFrequency> => {
        this.#sentence = sentence;
        const maxLength = number || 1;
        const wordsWithFrequency = this.#getWordsWithFrequencySorted();
        const mostFrequentWords = wordsWithFrequency.slice(0, maxLength);

        return mostFrequentWords;
    };
}

export default WordFrequencyAnalyzer;
