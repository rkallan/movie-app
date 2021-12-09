import { counterReducer, increment, decrement, incrementByAmount } from "./counterSlice";
import { CounterState } from "./types";

describe("counter reducer", () => {
    const initialState: CounterState = {
        value: 3,
        loading: true,
    };
    it("should handle initial state", () => {
        expect(counterReducer(undefined, { type: "unknown" })).toEqual({
            value: 0,
            loading: false,
        });
    });

    it("should handle increment", () => {
        const actual = counterReducer(initialState, increment());
        expect(actual.value).toEqual(4);
    });

    it("should handle decrement", () => {
        const actual = counterReducer(initialState, decrement());
        expect(actual.value).toEqual(2);
    });

    it("should handle incrementByAmount", () => {
        const actual = counterReducer(initialState, incrementByAmount(2));
        expect(actual.value).toEqual(5);
    });
});
