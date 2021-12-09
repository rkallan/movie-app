import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStorageItem, validations } from "rkallan-javascript-helpers";
import { setAuthJwt } from "features/authentication/authenticationSlice";
import { logout } from "../index";
import { isLoggedIn, hasAuthenticationError } from "../authenticationSelector";

const useAuthProvider = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isLoggedIn);
    const authenticationError = useSelector(hasAuthenticationError);
    const [tokensFromStorage, setTokensFromStorage] = useState(getStorageItem("token"));
    const [state, setState] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const { jwt, publicJwt } = tokensFromStorage || {};

    useEffect(() => {
        if (validations.isNotEmpty(jwt, true) && validations.isNotEmpty(publicJwt, true) && !isDataFetched) {
            dispatch(setAuthJwt({ jwt, publicJwt, login: true }));

            setState(true);
            setIsDataFetched(true);
        }
    }, [dispatch, isDataFetched, jwt, publicJwt]);

    useEffect(() => {
        const tokens = getStorageItem("token");
        setTokensFromStorage(tokens);

        setState(isAuth === !!tokens ? isAuth : !!tokens);
    }, [isAuth]);

    useEffect(() => {
        if ((!isAuth && (validations.isEmpty(jwt) || validations.isEmpty(publicJwt))) || authenticationError) {
            logout();
            setState(false);
            setIsDataFetched(false);
        }
    }, [authenticationError, isAuth, jwt, publicJwt]);

    return state;
};

export default useAuthProvider;
