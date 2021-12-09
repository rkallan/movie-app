import WordFrequencyAnalyzer from "./WordFrequencyAnalyzer";

describe("WordFrequencyAnalyzer Class", () => {
    const wordFrequencyAnalyzer = new WordFrequencyAnalyzer();
    const sentence = "hoi hoi hoi kklll ravi Ravi rAvi ravI";

    it("should handle calculateHighestFrequency", () => {
        const highestFrequency = wordFrequencyAnalyzer.calculateHighestFrequency(sentence);

        expect(highestFrequency).toEqual(4);
    });

    it("should handle calculateHighestFrequency", () => {
        const word = "Ravi";
        const frequency = wordFrequencyAnalyzer.calculateFrequencyForWord(sentence, word);

        expect(frequency).toEqual(4);
    });

    it("should handle calculateMostFrequentNWords", () => {
        const number = 2;
        const mostFrequentWords = wordFrequencyAnalyzer.calculateMostFrequentNWords(sentence, number);
        const firstWord = mostFrequentWords[0].getWord();
        const firstFrequency = mostFrequentWords[0].getFrequency();

        expect(mostFrequentWords.length).toEqual(2);
        expect(firstWord).toEqual("ravi");
        expect(firstFrequency).toEqual(4);
    });
});
