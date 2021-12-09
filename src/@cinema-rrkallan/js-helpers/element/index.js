import getType from "../getType";
import { convertToGivenSeparator } from "../convertString";

const isAttributeValueExistingInArray = (attributeValue, valuesInArray) => {
    let valueIsEqual = false;
    if (valuesInArray && Array.isArray(valuesInArray)) {
        valuesInArray.forEach((value) => {
            if (value === attributeValue) {
                valueIsEqual = true;
            }
            return valueIsEqual;
        });

        return valueIsEqual;
    }
    return false;
};

const replaceElementAttributeValue = (element, attribute, attributeValue) => {
    element.setAttribute(attribute, attributeValue);
};

const getKey = (attributeKey, isDataAttribute = false) => {
    const key = attributeKey;

    if (isDataAttribute) return "dataset";

    if (attributeKey === "class") return "className";

    return key;
};

const getValuesFromAttribute = (element, attributeKey, key, isDataAtribute = false) => {
    let valuesAsString;

    if (!element) return undefined;

    if (isDataAtribute) {
        valuesAsString = element[key][attributeKey];
    } else if (["id", "class"].includes(attributeKey)) {
        valuesAsString = element[key];
    } else if (element.hasAttribute(attributeKey)) {
        valuesAsString = element.getAttribute(attributeKey);
    }

    return valuesAsString ? valuesAsString.split(" ") : undefined;
};

const getParentElementWithAttribute = (element, attribute) => {
    const getParentElement = (currentElement) => {
        const newElement = currentElement.parentElement || undefined;

        if (!newElement || newElement.tagName.toLowerCase() === "body") {
            return undefined;
        }

        const isElementFound = newElement.hasAttribute(attribute);

        if (isElementFound) return newElement;

        if (!isElementFound && newElement.tagName.toLowerCase() !== "body") {
            return getParentElement(newElement);
        }

        return undefined;
    };

    return getParentElement(element);
};

const getParentElementWithAttributeValue = (element, attribute, attributeValue) => {
    const isDataAttribute = attribute.split("-")[0] === "data";
    const attributeKey = isDataAttribute ? convertToGivenSeparator(attribute.substr(5), "") : attribute;

    const key = getKey(attributeKey, isDataAttribute);

    const getParentElement = (currentElement) => {
        const newElement = currentElement.parentElement || undefined;

        if (!newElement || newElement.tagName.toLowerCase() === "body") {
            return undefined;
        }

        const valuesInArray = getValuesFromAttribute(newElement, attributeKey, key, isDataAttribute);

        const isElementFound = isAttributeValueExistingInArray(attributeValue, valuesInArray);

        if (isElementFound) {
            return newElement;
        }

        if (!isElementFound && newElement.tagName.toLowerCase() !== "body") {
            return getParentElement(newElement);
        }

        return undefined;
    };

    return getParentElement(element);
};

const getChildElementsWithState = (container = document, state = "hover") => {
    return container.querySelectorAll(`[state=${state}]`) || [];
};

const getSiblings = (element) => {
    const parentElemet = element.parentNode;
    const childElements = parentElemet.childNodes;

    const siblingElements = [...childElements].filter((number) => number !== element);

    return siblingElements;
};

const setElementState = (elements, state) => {
    if (elements && elements.length > 0) {
        elements.forEach((element) => {
            element.setAttribute("state", state);
        });
    }
};

const setStylesOnElement = (element, stylesAsObject) => {
    const nodeElement = element;
    Object.keys(stylesAsObject).forEach((property) => {
        if (getType(stylesAsObject[property]) === "number") {
            nodeElement.style[property] = `${stylesAsObject[property] / 16}rem`;
        } else {
            nodeElement.style[property] = stylesAsObject[property];
        }
    });
};

const setAttributesOnElement = (elements, attributesAsObject) => {
    const setAttributes = (element) => {
        Object.keys(attributesAsObject).forEach((property) => {
            element.setAttribute(property, attributesAsObject[property]);
        });
    };

    if (elements.length && elements.length > 0) {
        elements.forEach((element) => {
            setAttributes(element);
        });
    }

    if (elements.length === undefined) {
        setAttributes(elements);
    }
};

const enableDisableElements = (elements, disabled = true) => {
    const nodeElement = elements;
    Object.keys(elements).forEach((elementKey) => {
        nodeElement[elementKey].disabled = disabled;
    });
};

export {
    isAttributeValueExistingInArray,
    replaceElementAttributeValue,
    getParentElementWithAttribute,
    getParentElementWithAttributeValue,
    getChildElementsWithState,
    setElementState,
    setStylesOnElement,
    setAttributesOnElement,
    enableDisableElements,
    getSiblings,
};
