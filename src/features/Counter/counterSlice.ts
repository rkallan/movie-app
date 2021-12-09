import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import incrementAsync from "./counterAsync";
import { CounterState } from "./types";

const initialState: CounterState = {
    value: 0,
    loading: false,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            const newState = state;
            newState.value += 1;
        },
        decrement: (state) => {
            const newState = state;
            newState.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            const newState = state;
            newState.value += action.payload;
        },
    },
    extraReducers: {
        [incrementAsync.pending.type]: (state) => {
            const newState = state;
            newState.loading = true;
        },
        [incrementAsync.fulfilled.type]: (state, action: PayloadAction<number>) => {
            const newState = state;
            newState.loading = false;
            newState.value += action.payload;
        },
    },
});

const { increment, decrement, incrementByAmount } = counterSlice.actions;
const counterReducer = counterSlice.reducer;

export { counterReducer, increment, decrement, incrementByAmount };
