import WordFrequency from "./WordFrequency";

describe("WordFrequency Class", () => {
    it("should handle WordFrequency Class", () => {
        const sentence = "hoi hoi hoi kklll ravi Ravi rAvi ravI";
        const word = "Ravi";
        const wordFrequency = new WordFrequency(sentence, word);

        expect(wordFrequency.getWord()).toEqual("ravi");
        expect(wordFrequency.getFrequency()).toEqual(4);
    });
});
