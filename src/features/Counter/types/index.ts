interface CounterState {
    value: number;
    loading: boolean;
}

interface InterfaceCalculateCounter {
    [key: string]: () => void;
}

type TypeFetchCount = {
    data: number;
};

type TypeCounterThunkProps = {
    amount: number;
};

export type { CounterState, InterfaceCalculateCounter, TypeFetchCount, TypeCounterThunkProps };
