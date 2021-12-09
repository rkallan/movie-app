import { useState } from "react";
import { validations, getType } from "rkallan-javascript-helpers";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const value = window.localStorage.getItem(key) || initialValue;

        const parseValue = validations.isJSONString(value);

        return parseValue ? JSON.parse(value) : value;
    });

    const setValue = (value) => {
        const valueToStore = typeof value === "function" ? value(storedValue) : value;

        setStoredValue(valueToStore);

        const valueToLocalStorage = getType(valueToStore) === "string" ? valueToStore : JSON.stringify(valueToStore);
        window.localStorage.setItem(key, valueToLocalStorage);
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
