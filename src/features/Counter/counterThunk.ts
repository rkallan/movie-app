import { AppThunk } from "Store/types";
import { incrementByAmount } from "./counterSlice";
import { selectCount } from "./counterSelector";
import { TypeCounterThunkProps } from "./types";

const incrementIfOdd =
    ({ amount }: TypeCounterThunkProps): AppThunk =>
    (dispatch, getState) => {
        const currentValue = selectCount(getState());
        if (currentValue % 2 === 1) {
            dispatch(incrementByAmount(amount));
        }
    };

const decrementIfOdd =
    ({ amount }: TypeCounterThunkProps): AppThunk =>
    (dispatch, getState) => {
        const currentValue = selectCount(getState());
        if (currentValue % 2 === 1) {
            dispatch(incrementByAmount(-amount));
        }
    };

export { incrementIfOdd, decrementIfOdd };
