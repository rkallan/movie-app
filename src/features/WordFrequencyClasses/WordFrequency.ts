import { getWordsFromSentence } from "./helpers";
import { InterfaceWordFrequency } from "./types";

class WordFrequency implements InterfaceWordFrequency {
    #frequency: number;

    #words: Array<string>;

    #word: string;

    #sentence: string;

    constructor(sentence = "", word = "") {
        const getFrequencyForWord = (): number => {
            const frequency = this.#words.filter((value) => value === this.#word).length;

            return frequency;
        };

        this.#sentence = sentence;
        this.#words = getWordsFromSentence(this.#sentence);
        this.#word = word.trim().toLowerCase();
        this.#frequency = getFrequencyForWord();
    }

    getWord = (): string => this.#word;

    getFrequency = (): number => this.#frequency;
}

export default WordFrequency;
