import { useState, MouseEvent } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import { getType } from "rkallan-javascript-helpers";
import { useAppSelector, useAppDispatch } from "Store/hooks";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import { incrementIfOdd, decrementIfOdd } from "./counterThunk";
import { selectCount } from "./counterSelector";
import incrementAsync from "./counterAsync";
import { InterfaceCalculateCounter } from "./types";
import styles from "./resources/styles/counter.module.scss";

const InputfieldText = loadable(
    () => import(/* webpackChunkName: "InputfieldText" */ "@cinema-rrkallan/ui-library/FormElements/InputfieldText"),
    {
        fallback: <Loading />,
    }
);

const Counter = (): JSX.Element => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState(2);
    const [incrementValue, setIncrementValue] = useState(2);

    const onChangeIncrementAmount = (value: number) => {
        setIncrementValue(value);
        setIncrementAmount(value);
    };

    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const calculateCounter: InterfaceCalculateCounter = {
            decrement: () => {
                dispatch(decrement());
            },
            increment: () => {
                dispatch(increment());
            },
            incrementByAmount: () => {
                dispatch(incrementByAmount(incrementAmount));
            },
            incrementAsync: () => {
                dispatch(incrementAsync({ amount: incrementAmount }));
            },
            incrementIfOdd: () => {
                dispatch(incrementIfOdd({ amount: incrementAmount }));
            },
            decrementIfOdd: () => {
                dispatch(decrementIfOdd({ amount: incrementAmount }));
            },
        };
        const { value } = event.currentTarget;

        if (getType(calculateCounter[value]) === "function") calculateCounter[value]();
        event.currentTarget.blur();
    };

    return (
        <div className={styles.container}>
            <div className={styles.unit}>
                <InputfieldText
                    title="Increment amount with"
                    name="increment-amount"
                    type="number"
                    customOnChangeHandler={onChangeIncrementAmount}
                    defaultValue={incrementValue}
                    required
                    validationTypes={{ number: null, numberIsOrBetween: { minimal: 1, maximum: Infinity } }}
                    min={1}
                />

                <output className={styles.output}>{count}</output>
            </div>
            <div className={styles.unit}>
                <button
                    className={styles.button}
                    type="button"
                    aria-label="Decrement value"
                    value="decrement"
                    data-value="decrement"
                    onClick={onClickHandler}
                >
                    -
                </button>
                <output className={styles.output}>{count}</output>
                <button className={styles.button} type="button" aria-label="Increment value" value="increment" onClick={onClickHandler}>
                    +
                </button>
            </div>
            <div className={styles.unit}>
                <button className={styles.button} type="button" value="incrementByAmount" onClick={onClickHandler}>
                    Add Amount
                </button>
                <button className={styles.button} variant="async" type="button" value="incrementAsync" onClick={onClickHandler}>
                    Add Async
                </button>
                <button className={styles.button} type="button" value="incrementIfOdd" onClick={onClickHandler}>
                    Add If Odd
                </button>
                <button className={styles.button} type="button" value="decrementIfOdd" onClick={onClickHandler}>
                    Subtract If Odd
                </button>
            </div>
        </div>
    );
};

export default Counter;
