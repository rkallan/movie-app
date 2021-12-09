interface InterfaceCountingWords {
    loading: boolean;
    entities: {
        sentence: string;
        sentenceForWordCounting: string;
        wordsFrequency: [];
    };
    currentRequestId: number | undefined;
    error: string | undefined;
}

interface InterfaceWordFrequency {
    word: string;
    frequency: number;
}

type TypeSentenceAsArray = Array<string>;

type TypeWordFrequencyProps = {
    word: string;
    sentence: string;
};

export type { InterfaceCountingWords, InterfaceWordFrequency, TypeWordFrequencyProps, TypeSentenceAsArray };
