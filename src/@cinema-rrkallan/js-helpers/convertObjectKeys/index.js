import getType from "../getType";
import { camelCase } from "../convertString";
import { validations } from "../validations";

const convertObjectKeys = async ({ dataObject, convertType = "camelCase" }) => {
    if (validations.isEmpty(dataObject) || !["object", "array"].includes(getType(dataObject))) return dataObject;

    if (getType(dataObject) === "object") {
        const dataKeys = Object.keys(dataObject) || [];
        const newData = await dataKeys.reduce(async (data, key) => {
            const tempData = await data;
            const value = dataObject[key];
            const valueIsType = getType(value);
            let keyConverted = key;

            if (convertType === "camelCase") keyConverted = camelCase(key);
            if (convertType === "lowerCase") keyConverted = key.toLowerCase();

            if (["string"].includes(valueIsType) && validations.number(value, true)) {
                const splittedValue = value.split(".");
                const hasDecimals = splittedValue.length === 2;
                const isLastDigitZero = hasDecimals ? splittedValue[1][splittedValue[1].length - 1] === "0" : false;

                if (hasDecimals && isLastDigitZero) {
                    tempData[keyConverted] = value;
                    return tempData;
                }

                if (hasDecimals) {
                    tempData[keyConverted] = parseFloat(value);
                    return tempData;
                }

                tempData[keyConverted] = parseInt(value, 10);
                return tempData;
            }

            if (["string"].includes(valueIsType)) {
                tempData[keyConverted] =
                    validations.isJSONString(value) && !["content", "text", "title"].includes(keyConverted) ? JSON.parse(value) : value;
                return tempData;
            }

            if (["object", "array"].includes(valueIsType)) {
                tempData[keyConverted] = await convertObjectKeys({ dataObject: value, convertType });
                return tempData;
            }

            tempData[keyConverted] = value;

            return tempData;
        }, Promise.resolve({}));

        return newData;
    }

    if (getType(dataObject) === "array") {
        const newDataArray = await dataObject.reduce(async (data, item) => {
            const tempData = await data;
            const dataArrayValue = await convertObjectKeys({ dataObject: item, convertType });
            tempData.push(dataArrayValue);
            return tempData;
        }, Promise.resolve([]));

        return newDataArray;
    }

    return dataObject;
};

export default convertObjectKeys;
