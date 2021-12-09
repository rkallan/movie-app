const convertSentence = (sentence = ""): string => {
    const tempSentence = sentence
        .replace(/[^A-Za-z]+/g, " ")
        .toLowerCase()
        .trim();

    return tempSentence;
};

const getWordsFromSentence = (sentence = ""): Array<string> => {
    const tempSentence = convertSentence(sentence);

    if (!tempSentence.length) return [];

    const words = tempSentence.split(" ");

    return words;
};

export { convertSentence, getWordsFromSentence };
