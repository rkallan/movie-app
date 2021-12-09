import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypeFetchCount, TypeCounterThunkProps } from "./types";

const incrementAsync = createAsyncThunk("counter/fetchCount", async ({ amount }: TypeCounterThunkProps) => {
    const response: TypeFetchCount = await new Promise((resolve) => setTimeout(() => resolve({ data: amount }), 500));

    return response.data;
});

export default incrementAsync;
