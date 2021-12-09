import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";

import { serializeForm, formPostValidation, apiCall, getType, objectAsUrlParams } from "@cinema-rrkallan/js-helpers";
import { useDebounce } from "@cinema-rrkallan/react-hooks";
import Loading from "@cinema-rrkallan/ui-library/Loading";

import styles from "./resources/styles/form.module.scss";

const InputTypeText = loadable(
    () => import(/* webpackChunkName: "InputTypeText" */ "@cinema-rrkallan/ui-library/FormElements/InputfieldText"),
    {
        fallback: <Loading />,
    }
);

const SliderButton = loadable(
    () => import(/* webpackChunkName: "SliderButton" */ "@cinema-rrkallan/ui-library/FormElements/SliderButton"),
    {
        fallback: <Loading />,
    }
);

const Button = loadable(() => import(/* webpackChunkName: "Button" */ "@cinema-rrkallan/ui-library/FormElements/Button"), {
    fallback: <Loading />,
});

const Form = ({
    attributes,
    customEventHandler,
    customSubmitHandler,
    fieldsets,
    disableForm,
    postFormWithApiCall,
    resetForm,
    submitButtonDisabled,
    buttonsAttributes,
    ...props
}) => {
    const [formElements, setFormElements] = useState([]);
    const [buttonElements, setButtonElements] = useState([]);
    const [formData, setFormData] = useState([]);
    const [currentValue, setCurrentValue] = useState();
    const [clearValue, setClearValue] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(submitButtonDisabled);
    const [resetDisabled, setResetDisabled] = useState(true);
    const debouncedCurrentValue = useDebounce(currentValue, 150);

    const formValidation = useCallback(() => {
        let hasError = 0;

        if (!formElements.length) hasError += 1;

        formElements.forEach((element) => {
            if (element?.hasAttribute("state") && element?.getAttribute("state") !== "isValid") hasError += 1;
        });

        if (clearValue) setSubmitDisabled(true);

        if (!clearValue) setSubmitDisabled(!!hasError);
    }, [formElements, clearValue]);

    const setElementsToState = (formObject, updateElements = false) => {
        if (formObject && (formElements.length + buttonElements.length !== formObject.elements.length || updateElements)) {
            const tempFormElements = [];
            const tempButtons = [];

            [...formObject.elements].forEach((element) => {
                const { type } = element;
                const tagName = element.tagName.toLowerCase();

                if (element && (tagName === "button" || ["submit", "reset", "button"].includes(type))) tempButtons.push(element);

                if (element && !["fieldset", "button"].includes(tagName) && !["submit", "reset", "button"].includes(type))
                    tempFormElements.push(element);
            });

            const data = {
                attributes,
                elements: [],
            };
            fieldsets.forEach((fieldset) => {
                const { elements } = fieldset;
                Object.keys(elements).forEach((key) => {
                    data.elements.push(elements[key]);
                });
            });
            setFormData(data);

            setButtonElements(tempButtons);
            setFormElements(tempFormElements);

            formValidation();
        }
    };

    const setDisabledAttributeOnFieldsets = (disabled = true) => {
        fieldsets.map((fieldset) => {
            const currentFieldset = fieldset;
            currentFieldset.disabled = disabled;

            return disabled;
        });
    };

    const handleFormInValid = (errorMessages) => {
        const response = {
            ok: false,
            error: {
                message: errorMessages,
            },
        };

        setDisabledAttributeOnFieldsets(false);

        return response;
    };

    const formApiCall = async ({ formPostUrl, data, formDataAttributes, method }) => {
        const response = await apiCall({ url: formPostUrl, method, body: data });

        if (!response.ok) return handleFormInValid(formDataAttributes, response);

        const jsonResponse = await response.json();

        return jsonResponse;
    };

    const getResponse = async (formObject, data) => {
        if (postFormWithApiCall) {
            const formDataAttributes = formObject.dataset;
            const { method } = formObject;
            let formPostUrl = formObject.action;

            if (method === "get") {
                const getData = data;
                getData.plot = data.plot.length ? "full" : "short";
                const urlParam = objectAsUrlParams(getData);
                formPostUrl = `${formPostUrl}${urlParam}`;
            }

            const response = await formApiCall({ formPostUrl, data, formDataAttributes, method });

            return response;
        }

        return {
            ok: true,
            status: 200,
            data,
        };
    };

    const disableButtons = () => {
        setSubmitDisabled(true);
        setResetDisabled(true);
    };

    const resetFormElements = () => {
        setClearValue(true);
    };

    const onResetHandler = () => {
        disableButtons();
        resetFormElements();
    };

    const onEventHandler = (event) => {
        const formElement = event.target;
        const formObject = formElement.form;
        const formElementValue = formElement.value || "";
        const updateElementsInState = getType(customEventHandler) === "function" ? customEventHandler(event) : false;

        if (clearValue) setClearValue(false);
        if (currentValue !== formElementValue) setCurrentValue(formElementValue);

        if (resetDisabled && event.type === "change") setResetDisabled(false);

        setElementsToState(formObject, updateElementsInState);
    };

    const convertDataForAPI = (postData) => {
        const convertedData = Object.keys(postData).reduce((data, item) => {
            const result = {
                [item]: postData[item].values,
            };
            const newData = {
                ...data,
                ...result,
            };

            return newData;
        }, {});

        return convertedData;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        document.activeElement.blur();

        disableButtons();
        setDisabledAttributeOnFieldsets(true);

        const formObject = event.currentTarget || event.target;
        const formObjectData = serializeForm(formObject, formData);
        const postData = { ...props.postData, ...formObjectData.postData };

        formObjectData.postData = postData;

        const errorMessages = formPostValidation(postData);

        if (errorMessages) {
            const errorResponse = handleFormInValid(errorMessages);

            if (customSubmitHandler) customSubmitHandler(errorResponse);
            return;
        }

        const data = convertDataForAPI(postData);
        const response = getResponse(formObject, data);

        formObject.reset();

        if (customSubmitHandler) customSubmitHandler(response);

        setDisabledAttributeOnFieldsets(false);
        setClearValue(true);
    };

    useEffect(() => {
        if ((debouncedCurrentValue || debouncedCurrentValue === "") && formElements) formValidation();
    }, [debouncedCurrentValue, formElements, formValidation]);

    useEffect(() => {
        if (formElements) formValidation();
    }, [formElements, formValidation]);

    useEffect(() => {
        setSubmitDisabled(submitButtonDisabled);
    }, [submitButtonDisabled]);

    useEffect(() => {
        if (resetForm) {
            disableButtons();
            resetFormElements();
        }
    }, [resetForm]);

    return (
        <form
            {...attributes}
            onSubmit={onSubmitHandler}
            onReset={onResetHandler}
            onChange={onEventHandler}
            onFocus={onEventHandler}
            onBlur={onEventHandler}
        >
            {fieldsets?.map((fieldset) => {
                const { elements, disabled } = fieldset;
                const disabledFieldset = disableForm || disabled || false;

                return (
                    <fieldset key={fieldset.id} className={styles.container} disabled={disabledFieldset}>
                        <div className={styles.unit} variant={fieldset.variant || null}>
                            {Object.keys(elements).map((key) => {
                                const { id, node, ...element } = elements[key];
                                element.disabled = disabledFieldset || element.disabled;

                                switch (node) {
                                    case "input":
                                        return <InputTypeText key={id} {...element} clearValue={clearValue} />;
                                    case "slider":
                                        return <SliderButton key={id} {...element} clearValue={clearValue} />;
                                    case "button":
                                        if (element.type === "submit") element.disabled = submitDisabled;

                                        if (element.type === "reset") element.disabled = resetDisabled;

                                        if (buttonsAttributes[key]) {
                                            const buttonAttributes = element.attributes;
                                            element.attributes = { ...buttonAttributes, ...buttonsAttributes[key] };
                                        }

                                        return <Button key={id} {...element} />;
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </fieldset>
                );
            })}
        </form>
    );
};

Form.defaultProps = {
    customEventHandler: undefined,
    customSubmitHandler: undefined,
    disableForm: false,
    postFormWithApiCall: true,
    resetForm: false,
    submitButtonDisabled: true,
    buttonsAttributes: {},
    postData: undefined,
};

Form.propTypes = {
    attributes: PropTypes.shape({}).isRequired,
    customEventHandler: PropTypes.func,
    customSubmitHandler: PropTypes.func,
    fieldsets: PropTypes.arrayOf(PropTypes.object).isRequired,
    disableForm: PropTypes.bool,
    postFormWithApiCall: PropTypes.bool,
    resetForm: PropTypes.bool,
    submitButtonDisabled: PropTypes.bool,
    buttonsAttributes: PropTypes.shape({}),
    postData: PropTypes.shape({}),
};

export default Form;
