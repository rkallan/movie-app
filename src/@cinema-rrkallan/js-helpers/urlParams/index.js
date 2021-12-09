import { camelCase } from "../convertString";
import { validations } from "../validations";
import getType from "../getType";

const urlParamsAsObject = (url = window.location.href, keyAsCamelCase = false) => {
    if (getType(url) !== "string" || !url) return undefined;

    const urlWithParams = url.split("#").shift();
    const paramsAsString = urlWithParams.split("?").pop();
    const urlParams = new URLSearchParams(paramsAsString);

    const paramsAsObject = {};
    urlParams.forEach((value, key) => {
        const keyName = keyAsCamelCase ? camelCase(key) : key;
        const valueConverted = validations.isJSONString(value) ? JSON.parse(value) : value;

        paramsAsObject[keyName] = valueConverted;
    });

    return paramsAsObject;
};

const objectAsUrlParams = (data, addQuestionMark = true) => {
    if (getType(data) !== "object" || !Object.keys(data).length) return undefined;

    const urlParams = new URLSearchParams();

    Object.keys(data).forEach((key) => {
        urlParams.append(key, data[key]);
    });
    urlParams.sort();

    const url = `${addQuestionMark ? "?" : ""}${urlParams.toString()}`;

    return decodeURIComponent(url);
};

export { urlParamsAsObject, objectAsUrlParams };
