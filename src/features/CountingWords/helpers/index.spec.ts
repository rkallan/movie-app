import { getSentence } from "./index";

describe("Counting Words helper functions", () => {
    it("should handle getSentence", () => {
        const value = "hoi hoi, this 123 is a test";
        const returnValue = "hoi hoi this is a test";
        expect(getSentence(value)).toEqual(returnValue);
    });
});
