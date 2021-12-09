import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false,
};

const authentication = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setAuthJwt: (state, action) => {
            const newState = state;
            const { jwt, publicJwt, login } = action.payload;

            newState.jwt = jwt;
            newState.publicJwt = publicJwt;
            newState.login = login;
            newState.error = undefined;

            return newState;
        },
        setAuthError: (state, action) => {
            const newState = state;
            newState.error = action.payload;
            return newState;
        },
        externalAuth: (state, action) => {
            const newState = {
                ...state,
                ...action.payload,
            };
            return newState;
        },
        resetAuth: (state) => {
            const { error } = state;
            const newState = {
                ...initialState,
                error,
            };

            return newState;
        },
    },
});

const { setAuthJwt, setAuthError, resetAuth, externalAuth } = authentication.actions;
const authenticationReducer = authentication.reducer;

export { authenticationReducer, setAuthJwt, setAuthError, resetAuth, externalAuth };
