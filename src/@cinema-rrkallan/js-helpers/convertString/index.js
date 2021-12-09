import getType from "../getType";

const ucFirst = (value) => {
    if (getType(value) !== "string") return value;

    const valueTrimmed = value.trim();
    const newValue = `${valueTrimmed.substring(0, 1).toUpperCase()}${valueTrimmed.substring(1)}`;

    return value.replace(valueTrimmed, newValue);
};

const capitalize = (value) => {
    if (getType(value) !== "string") return undefined;

    const valueTrimmed = value.trim();
    const newValue = `${valueTrimmed.substring(0, 1).toUpperCase()}${valueTrimmed.substring(1).toLowerCase()}`;

    return value.replace(valueTrimmed, newValue);
};

const convertToGivenSeparator = (value, seperator = " ") => {
    if (getType(value) !== "string") return undefined;

    const convertedValue = value
        .replace(/[^a-zA-Z0-9]+/g, seperator)
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/([0-9])([^0-9])/g, "$1-$2")
        .replace(/([^0-9])([0-9])/g, "$1-$2")
        .replace(/-+/g, seperator);

    return ucFirst(convertedValue);
};

const camelCase = (value) => {
    if (getType(value) !== "string") return undefined;

    const valueConvertedToSpace = convertToGivenSeparator(value);
    return valueConvertedToSpace
        .split(/\s/gi)
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return ucFirst(word);
        })
        .join("");
};

const capitalizeFirstLetterWord = (words) => {
    if (getType(words) !== "string") return undefined;

    const wordsConvertedToSpace = convertToGivenSeparator(words);

    return wordsConvertedToSpace
        .split(/\s/gi)
        .map((word) => ucFirst(word))
        .join(" ");
};

const htmlStringToPlain = (htmlString) => {
    if (getType(htmlString) !== "string") return undefined;

    const plainString = htmlString.replace(/(<([^>]+)>)/gi, "");

    return plainString;
};

const camelCaseToTitleCase = (value) => {
    if (getType(value) !== "string") return undefined;

    const newValue = value.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());

    return newValue;
};

const clearEmptyCharsOnBothEnds = (value) => {
    if (getType(value) !== "string") return undefined;

    const newValue = value.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");

    return newValue;
};

export {
    convertToGivenSeparator,
    capitalize,
    camelCase,
    capitalizeFirstLetterWord,
    ucFirst,
    htmlStringToPlain,
    camelCaseToTitleCase,
    clearEmptyCharsOnBothEnds,
};
