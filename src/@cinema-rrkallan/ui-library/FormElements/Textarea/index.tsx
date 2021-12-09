import { useState, useEffect, ChangeEvent } from "react";
import { getType, isElementValid, validations, clearEmptyCharsOnBothEnds } from "rkallan-javascript-helpers";
import InterfaceTextarea from "./types";
import styles from "./resources/styles/textarea.module.scss";

const Textarea = ({
    title,
    name,
    defaultValue = "",
    readOnly = false,
    disabled = false,
    required = false,
    validationTypes = undefined,
    errorMessage = "Incorrect entry.",
    autoComplete = "off",
    customOnChangeHandler = undefined,
}: InterfaceTextarea): JSX.Element => {
    const [textareaValue, setTextareaValue] = useState(() => defaultValue);
    const [containerVariant, setContainerVariant] = useState((): string | undefined => undefined);
    const [containerState, setContainerState] = useState(() => (required ? "isEmpty" : "isValid"));
    const [titleVariant, setTitleVariant] = useState(() => (defaultValue ? "legend" : "placeholder"));

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        const valueTrimmed = clearEmptyCharsOnBothEnds(value);

        setTextareaValue(value);

        if (customOnChangeHandler && getType(customOnChangeHandler) === "function") customOnChangeHandler(valueTrimmed);
    };

    const onFocusHandler = () => {
        setTitleVariant("legend focussed");
        setContainerState("isFocussed");
    };

    const onBlurHandler = () => {
        const value = clearEmptyCharsOnBothEnds(textareaValue);
        const variant = value ? "legend" : "placeholder";

        setTitleVariant(variant);
        setTextareaValue(value);

        let elementState = validations.isEmpty(value) && !required ? "isValid" : isElementValid(validationTypes, value);
        if (validations.isEmpty(value) && required) elementState = "inValid";

        setContainerState(elementState);
    };

    useEffect(() => {
        const variantValue = [disabled ? "disabled" : undefined, readOnly ? "read-only" : undefined].join(" ").trim() || undefined;

        setContainerVariant(variantValue);
    }, [disabled, readOnly]);

    return (
        <section className={styles.container}>
            <article className={styles.label} variant={titleVariant}>
                <label htmlFor={name} className={styles.title}>
                    {title}
                </label>
            </article>
            <fieldset className={styles.fieldset} variant={containerVariant} state={containerState}>
                <legend className={styles.title} variant={titleVariant}>
                    {title}
                </legend>
                <div className={styles.textareaContainer}>
                    <textarea
                        id={name}
                        className={styles.textarea}
                        name={name}
                        value={textareaValue}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete={autoComplete}
                        onChange={onChangeHandler}
                        onFocus={onFocusHandler}
                        onBlur={onBlurHandler}
                        data-required={required || undefined}
                        data-validation-types={getType(validationTypes) === "object" ? JSON.stringify(validationTypes) : undefined}
                    />
                </div>
            </fieldset>
            <div className={styles.helperText}>
                <span className={styles.text} state={containerState === "inValid" ? "visible" : "hidden"}>
                    {errorMessage}
                </span>
            </div>
        </section>
    );
};

export default Textarea;
