import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "Store/types";
import { CounterState } from "./types";

const counterState = ({ counter }: RootState): CounterState => counter;
const selectCount = createSelector(counterState, (counter) => counter.value);

export { counterState, selectCount };
