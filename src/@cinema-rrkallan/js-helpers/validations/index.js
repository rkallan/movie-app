import getType from "../getType";
import { clearEmptyCharsOnBothEnds } from "../convertString";

const inValidCharactersLength = (value, lengthCharacters = 0, isMinimal = true, returnBoolean = false) => {
    const isValidValueType = ["string", "number"].includes(getType(value));

    if (!isValidValueType) return { error: true, message: "value is not a string or number" };

    const validationType = isMinimal ? "minimal" : "maximum";
    const valueLength = value.toString().trim().length;

    const inValid = isMinimal ? valueLength < lengthCharacters : valueLength > lengthCharacters;

    if (returnBoolean) return inValid;

    const errorMessage = inValid && `must have ${validationType} ${lengthCharacters} characters`;
    const message = {
        error: inValid,
        message: errorMessage,
    };

    return message;
};

const validations = {
    email: (value) => {
        const errorMessage = "Is not a valid emailaddress";
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const inValid = !pattern.test(String(value).toLowerCase());

        const message = {
            error: inValid,
            message: inValid ? errorMessage : undefined,
        };

        return message;
    },
    isEmpty: (value) => {
        const valueIsType = getType(value);

        if (valueIsType === "string") return !clearEmptyCharsOnBothEnds(value).length;
        if (valueIsType === "array") return !value.length;
        if (valueIsType === "object") return !Object.keys(value).length;
        if (valueIsType === "number") return Number.isNaN(value);
        if (valueIsType === "boolean") return false;

        return true;
    },
    isNotEmpty: (value, returnBoolean = false) => {
        const inValid = !validations.isEmpty(value);

        if (returnBoolean) return inValid;

        const errorMessage = inValid && "is empty";
        const message = {
            error: inValid,
            message: errorMessage,
        };

        return message;
    },
    hasMinimalCharacters: (value, validateBy = { length: 1 }) => {
        return inValidCharactersLength(value, validateBy.length);
    },
    hasMaximumCharacters: (value, validateBy = { length: 256 }) => {
        return inValidCharactersLength(value, validateBy.length, true);
    },
    hasMinimalAndMaximalCharacters: (value, validateBy = { minCharacters: 1, maxCharacters: 256 }) => {
        const errorMessage = `must have minimum ${validateBy.minCharacters} and maximum ${validateBy.maxCharacters} characters`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) {
            return {
                error: isEmpty,
                message: errorMessage,
            };
        }

        const inValidMinimumLength = inValidCharactersLength(value, validateBy.minCharacters, true, true);
        const inValidMaximumLength = inValidCharactersLength(value, validateBy.maxCharacters, false, true);

        const inValid = inValidMinimumLength || inValidMaximumLength;

        const message = {
            error: inValid,
            message: inValid && errorMessage,
        };

        return message;
    },
    startAndEndsWith: (value, validateBy = { firstCharacter: [], lastCharacter: [] }) => {
        const errorMessage = `must be started with ${validateBy.firstCharacter.join(",")} and ended with ${validateBy.lastCharacter.join(
            ","
        )}`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: isEmpty, message: errorMessage };

        const isValid = validateBy.firstCharacter.includes(value.slice(0, 1)) && validateBy.lastCharacter.includes(value.slice(-1));

        const message = {
            error: !isValid,
            message: !isValid && errorMessage,
        };

        return message;
    },
    notStartedWith: (value, validateBy = { notAllowed: [], caseSensitive: true }) => {
        const caseSensitive =
            validateBy.caseSensitive && validations.isBoolean(validateBy.caseSensitive) ? !!JSON.parse(validateBy.caseSensitive) : true;

        const errorMessage = `can not started with ${validateBy.notAllowed.join(", ")} (is ${!caseSensitive ? "not " : ""}case sensitive)`
            .replace(",  ", ", spaces")
            .replace("  ,", " spaces,");

        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        const notAllowed = validateBy.notAllowed.map((tempValue) => (caseSensitive ? tempValue : tempValue.toLowerCase()));

        const valueAsString = validations.isJSONString(value) ? JSON.stringify(value) : value.trim();
        const firstCharacter = caseSensitive ? valueAsString[0] : valueAsString[0].toLowerCase();
        const inValid = notAllowed.includes(firstCharacter);

        const message = {
            error: inValid,
            message: inValid ? errorMessage : undefined,
        };

        return message;
    },
    containsNot: (value, validateBy = { notAllowed: [], caseSensitive: true }, returnBoolean = false) => {
        const caseSensitive =
            validateBy.caseSensitive && validations.isBoolean(validateBy.caseSensitive) ? !!JSON.parse(validateBy.caseSensitive) : true;
        const errorMessage = `can not contain ${validateBy.notAllowed.join(",")} (is ${!caseSensitive ? "not " : ""}case sensitive)`
            .replace(",  ", ", spaces")
            .replace("  ,", " spaces,");

        const isEmpty = validations.isEmpty(value);

        if (isEmpty) {
            if (returnBoolean) return true;

            return { error: true, message: errorMessage };
        }

        const valueAsString = validations.isJSONString(value) ? JSON.stringify(value) : value.trim();
        const validatedValue = caseSensitive ? valueAsString : valueAsString.toLowerCase();
        let inValid = false;

        validateBy.notAllowed.map((hasNot) => {
            const tempHasNot = caseSensitive ? hasNot : hasNot.toLowerCase();
            if (validatedValue.indexOf(tempHasNot) > -1) inValid = true;
            return inValid;
        });

        if (returnBoolean) return inValid;

        const message = {
            error: inValid,
            message: inValid ? errorMessage : undefined,
        };

        return message;
    },
    isNot: (value, validateBy = { notAllowed: [], caseSensitive: true }) => {
        const caseSensitive =
            validateBy.caseSensitive && validations.isBoolean(validateBy.caseSensitive) ? !!JSON.parse(validateBy.caseSensitive) : true;
        const errorMessage = `is not one off ${validateBy.notAllowed.join(", ")} (is ${!caseSensitive ? "not " : ""}case sensitive)`
            .replace(",  ", ", spaces")
            .replace("  ,", " spaces,");

        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        let validateValue = getType(value) === "string" ? value.trim() : value;

        if (!caseSensitive && getType(validateValue) === "string") {
            validateValue = validateValue.toLowerCase();
        }

        let inValid = false;

        validateBy.notAllowed.map((isNot) => {
            const tempIsNot = !caseSensitive && getType(isNot) === "string" ? isNot.toLowerCase() : isNot;
            if (validateValue === tempIsNot) inValid = true;
            return inValid;
        });

        const message = {
            error: inValid,
            message: inValid ? errorMessage : undefined,
        };

        return message;
    },
    isExact: (value, validateBy = { isExact: [], caseSensitive: true }) => {
        const caseSensitive =
            validateBy.caseSensitive && validations.isBoolean(validateBy.caseSensitive) ? !!JSON.parse(validateBy.caseSensitive) : true;
        const errorMessage = `is not one off ${validateBy.isExact.join(", ")} (is ${!caseSensitive ? "not " : ""}case sensitive)`
            .replace(",  ", ", spaces")
            .replace("  ,", " spaces,");
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        let validateValue = getType(value) === "string" ? value.trim() : value;

        if (!caseSensitive && getType(validateValue) === "string") {
            validateValue = validateValue.toLowerCase();
        }

        const isExact = validateBy.isExact.map((tempValue) => {
            if (!caseSensitive && getType(tempValue) === "string") {
                return tempValue.toLowerCase();
            }
            return tempValue;
        });
        const isValid = isExact.includes(validateValue);

        const message = {
            error: !isValid,
            message: !isValid ? errorMessage : undefined,
        };

        return message;
    },
    number: (value, returnBoolean = false) => {
        const errorMessage = `is not a number`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) {
            if (returnBoolean) return false;
            return { error: true, message: errorMessage };
        }

        if (getType(value) === "number" && !Number.isNaN(value)) {
            if (returnBoolean) return true;
            return { error: false, message: undefined };
        }

        if (getType(value) === "string") {
            if (value.startsWith("00") || value.startsWith("-00")) {
                if (returnBoolean) return false;
                return {
                    error: true,
                    message: errorMessage,
                };
            }

            const pattern = /^[-]?[\d]*[.]?[\d]*([eE][-+]?[\d]+)?$/;
            const isValid = pattern.test(value);

            if (returnBoolean) return isValid;

            return {
                error: !isValid,
                message: !isValid ? errorMessage : undefined,
            };
        }

        if (returnBoolean) return false;

        return {
            error: true,
            message: errorMessage,
        };
    },
    numberIsOrBetween: (value, validateBy = { minimal: -2147483648, maximum: 2147483648 }) => {
        const errorMessage = `number is not between ${validateBy.minimal} and ${validateBy.maximum}`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        const validateValue = getType(value) === "string" ? value.trim() : value;
        if (!validations.number(validateValue)) return { error: true, message: errorMessage };

        const valueAsPointedNumber = parseFloat(validateValue);

        if (valueAsPointedNumber >= validateBy.minimal && valueAsPointedNumber <= validateBy.maximum)
            return { error: false, message: undefined };

        return { error: true, message: errorMessage };
    },
    float: (value, validateBy = { maxDecimals: Infinity }) => {
        let errorMessage = `is not a float number`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        const validateValue = getType(value) === "string" ? value.trim() : value;
        if (!validations.number(validateValue)) return { error: true, message: errorMessage };

        const splittedValue = getType(validateValue) === "string" ? validateValue.split(".") : validateValue.toString().split(".");

        if (splittedValue.length !== 2) return { error: true, message: errorMessage };

        if (getType(validateBy.maxDecimals) === "number") {
            if (validateBy.maxDecimal !== Infinity) errorMessage = `${errorMessage} with maximum ${validateBy.maxDecimal} decimals`;
            const isValid = splittedValue[1].length <= validateBy.maxDecimals;
            return { error: !isValid, message: !isValid ? errorMessage : undefined };
        }

        return { error: true, message: errorMessage };
    },
    alphabetic: (value) => {
        const errorMessage = `is not alphabetic`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        const pattern = /^[a-zA-Z\s]+$/;
        const isValid = pattern.test(value);

        return {
            error: !isValid,
            message: !isValid ? errorMessage : undefined,
        };
    },
    alphanumeric: (value) => {
        const errorMessage = `is not alphanumeric`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        const pattern = /^[\w\s]+$/;
        const isValid = pattern.test(value);

        return {
            error: !isValid,
            message: !isValid ? errorMessage : undefined,
        };
    },
    tel: (value) => {
        const errorMessage = `is not a phonenumber`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        const pattern = /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-/\s.]|\d)+$/;
        const isValid = pattern.test(value);

        return {
            error: !isValid,
            message: !isValid ? errorMessage : undefined,
        };
    },
    isBoolean: (value) => {
        const errorMessage = `is not a boolean`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        if (getType(value) === "boolean") return { error: false, message: undefined };

        if (
            getType(value) === "string" &&
            validations.isExact(value, {
                isExact: ["0", "1", "true", "false"],
                caseSensitive: false,
            })
        )
            return { error: false, message: undefined };

        return { error: true, message: errorMessage };
    },
    dateFuture: (value) => {
        const errorMessage = `is not a valid date in the future`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        let date = {};
        if (getType(date) === "object") {
            const tempDate = value.split("-");
            date = {
                year: parseInt(tempDate[0], 10),
                month: parseInt(tempDate[1], 10) - 1,
                day: parseInt(tempDate[2], 10),
            };
        }

        const temp = new Date(date.year, date.month, date.day);
        const now = new Date();

        if (now < temp && temp.getDate() === date.day && temp.getMonth() === date.month && temp.getFullYear() === date.year)
            return { error: false, message: undefined };

        return { error: true, message: errorMessage };
    },
    password: {
        weak: (value) => {
            const errorMessage = `password must be between 6 and 256 characters which contain only characters, numeric digits and underscore and first character must be a letter`;
            const isEmpty = validations.isEmpty(value);

            if (isEmpty) return { error: true, message: errorMessage };

            const pattern = /^[A-Za-z]\w{6,256}$/;
            const isValid = pattern.test(value);
            return {
                error: !isValid,
                message: !isValid ? errorMessage : undefined,
            };
        },
        medium: (value) => {
            const errorMessage = `password must be between 6 to 256 characters which contain at least one numeric digit, one uppercase and one lowercase letter`;
            const isEmpty = validations.isEmpty(value);

            if (isEmpty) return { error: true, message: errorMessage };
            const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,256}$/;
            const isValid = pattern.test(value);
            return {
                error: !isValid,
                message: !isValid ? errorMessage : undefined,
            };
        },
        strong: (value) => {
            const errorMessage = `password must be between 7 to 256 characters which contain at least one numeric digit and a special character`;
            const isEmpty = validations.isEmpty(value);

            if (isEmpty) return { error: true, message: errorMessage };
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,21}$/;
            const isValid = pattern.test(value);
            return {
                error: !isValid,
                message: !isValid ? errorMessage : undefined,
            };
        },
        veryStrong: (value) => {
            const errorMessage = `password must be between 8 to 256 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character`;
            const isEmpty = validations.isEmpty(value);

            if (isEmpty) return { error: true, message: errorMessage };
            const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,256}$/;
            const isValid = pattern.test(value);
            return {
                error: !isValid,
                message: !isValid ? errorMessage : undefined,
            };
        },
    },
    ipadress: (value) => {
        const errorMessage = `is not a valid ip address`;
        const isEmpty = validations.isEmpty(value);

        if (isEmpty) return { error: true, message: errorMessage };

        const pattern =
            /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

        const isValid = pattern.test(value);
        return {
            error: !isValid,
            message: !isValid ? errorMessage : undefined,
        };
    },
    isJSONString: (value) => {
        if (validations.isEmpty(value)) return false;
        const validateValue = getType(value) === "string" ? value.trim() : value;

        if (
            getType(validateValue) === "string" &&
            (validateValue.slice(0, 1) === "." || validateValue.slice(-1) === "." || validateValue === "-")
        )
            return false;

        if (getType(validateValue) === "string" && validateValue.length > 1 && validateValue[0] === "0") return false;

        if (getType(validateValue) === "number" && validateValue !== Infinity) return true;

        if (validations.number(value, true)) return true;

        const isValidNumber = validations.number(validateValue);
        if (isValidNumber && !isValidNumber.error) return true;

        if (getType(validateValue) !== "string") return false;

        if (["true", "false", "null"].includes(validateValue)) return true;

        const isValid = validations.startAndEndsWith(validateValue, {
            firstCharacter: ["{", "["],
            lastCharacter: ["}", "]"],
        });

        if (isValid && !isValid.error) {
            return ["object", "array"].includes(getType(JSON.parse(validateValue)));
        }

        return false;
    },
    multipleValidation: (value, validationTypes = {}) => {
        const error = [];

        Object.keys(validationTypes).map((validationType) => {
            const response = validations[validationType](value, validationTypes[validationType]);

            if (!response) {
                error.push(`Create error message for ${validationType}`);
            }

            if (response && response.error) error.push(response.message);

            return error;
        });

        return error;
    },
};

const formPostValidation = (postData) => {
    if (!postData || getType(postData) !== "object") return undefined;

    const postDataKeys = Object.keys(postData);
    const errorMessages = {};

    if (!postDataKeys.length) return undefined;

    postDataKeys.forEach((formElementKey) => {
        const formElement = postData[formElementKey];
        const elementRequired = formElement.required || false;

        if (!elementRequired) return;

        const elementValidationTypes = formElement.validationTypes || {};
        const totalValidationTypes = Object.keys(elementValidationTypes).length || 0;
        const value = formElement.values;

        let errorMessage = [];

        if (!totalValidationTypes && elementRequired && validations.isEmpty(value).error) {
            errorMessage.push("Cann't be empty");
        }

        if (totalValidationTypes) errorMessage = validations.multipleValidation(value, elementValidationTypes);

        if (errorMessage.length) errorMessages[formElementKey] = errorMessage;
    });

    if (Object.keys(errorMessages).length) return errorMessages;

    return undefined;
};

const getValidationTypes = (dataRequired = false, dataValidationTypes) => {
    const required = validations.isBoolean(dataRequired) ? dataRequired : false;

    if (!required) return undefined;

    const validationTypes = validations.isJSONString(dataValidationTypes) ? JSON.parse(dataValidationTypes) : undefined;
    const totalValidationTypes = validationTypes ? Object.keys(validationTypes).length : undefined;

    if (!totalValidationTypes && required) return { isNotEmpty: null };

    return validationTypes;
};

const isElementValid = (validationTypes, value) => {
    if (!validationTypes || getType(validationTypes) !== "object") return "isValid";

    const totalValidationTypes = Object.keys(validationTypes).length;

    if (!totalValidationTypes) return "isValid";

    if (validations.isEmpty(value)) return "isEmpty";

    const errorMessages = validations.multipleValidation(value, validationTypes);

    return !errorMessages.length ? "isValid" : "inValid";
};

export { validations, formPostValidation, getValidationTypes, isElementValid };
