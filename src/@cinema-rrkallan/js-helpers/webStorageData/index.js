import { validations } from "../validations";
import getType from "../getType";

const isValidStorageType = (storageType) => {
    const storageTypes = ["localStorage", "sessionStorage"];
    return storageTypes.includes(storageType);
};

const getStorageItem = (key, storageType = "localStorage") => {
    if (!key) return undefined;
    if (!isValidStorageType(storageType)) return undefined;

    const value = window[storageType].getItem(key);

    if (!validations.isNotEmpty(value)) return undefined;

    const parseValue = validations.isJSONString(value);

    return parseValue ? JSON.parse(value) : value;
};

const setStorageItem = (key, value, storageType = "localStorage") => {
    if (!key) return undefined;
    if (!isValidStorageType(storageType)) return undefined;

    const valueType = getType(value);
    let valueAsString;

    if (valueType === "string") valueAsString = value;

    if (["array", "object", "number", "boolean"].includes(valueType)) valueAsString = JSON.stringify(value);

    if (valueAsString === undefined) return undefined;

    window[storageType].setItem(key, valueAsString);
    return true;
};

const removeStorageItem = (key, storageType = "localStorage") => {
    if (!key) return undefined;
    if (!isValidStorageType(storageType)) return undefined;

    window[storageType].removeItem(key);

    return true;
};

const clearStorage = (storageType = "localStorage") => {
    if (!isValidStorageType(storageType)) return undefined;

    window[storageType].clear();

    return true;
};

export { getStorageItem, setStorageItem, removeStorageItem, clearStorage };
