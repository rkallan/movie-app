import { useState, useEffect, ChangeEventHandler, FocusEventHandler } from "react";
import { getType, isElementValid, validations, clearEmptyCharsOnBothEnds } from "rkallan-javascript-helpers";
import InterfaceInputfieldText from "./types";
import styles from "./resources/styles/inputfieldText.module.scss";

type TypesElememtStateProps = {
    value: string | number;
};

type TypesGetValueProps = {
    value: string;
    valueAsNumber: number;
};

const InputfieldText = ({
    title,
    name,
    defaultValue = "",
    type = "text",
    readOnly = false,
    disabled = false,
    required = false,
    validationTypes = undefined,
    errorMessage = "Incorrect entry.",
    autoComplete = "off",
    max = undefined,
    min = undefined,
    step = undefined,
    clearValue = false,
    customOnChangeHandler = undefined,
}: InterfaceInputfieldText): JSX.Element => {
    const [inputValue, setInputValue] = useState(() => defaultValue);
    const [containerVariant, setContainerVariant] = useState((): string | undefined => undefined);
    const [containerState, setContainerState] = useState(() => (required ? "isEmpty" : "isValid"));
    const [inputState, setInputState] = useState(() => (required ? "isEmpty" : "isValid"));
    const [titleVariant, setTitleVariant] = useState(() => (defaultValue ? "legend" : "placeholder"));

    const getValue = ({ value, valueAsNumber }: TypesGetValueProps): string | number => {
        if ([NaN, Infinity].includes(valueAsNumber)) return clearEmptyCharsOnBothEnds(value);

        return valueAsNumber;
    };

    const getElementState = ({ value }: TypesElememtStateProps) => {
        const valueIsEmpty = validations.isEmpty(value);
        if (valueIsEmpty && !required) return "isValid";
        if (valueIsEmpty && required) return "isEmpty";

        const elememtState = isElementValid(validationTypes, value);

        return elememtState;
    };

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value, valueAsNumber } = event.currentTarget;
        const valueCorrected = getValue({ value, valueAsNumber });
        const elementState = getElementState({ value: valueCorrected });

        setInputValue(value);
        setInputState(elementState);
        if (customOnChangeHandler && getType(customOnChangeHandler) === "function") customOnChangeHandler(valueCorrected);
    };

    const onFocusHandler: FocusEventHandler<HTMLInputElement> = () => {
        setTitleVariant("legend focussed");
        setContainerState("isFocussed");
    };

    const onBlurHandler: FocusEventHandler<HTMLInputElement> = (event) => {
        const { value, valueAsNumber } = event.currentTarget;
        const valueCorrected = getValue({ value, valueAsNumber });

        setInputValue(() => 1);
        setTimeout(() => {
            setInputValue(() => valueCorrected);
        }, 1);

        const variant = valueCorrected || valueCorrected === 0 ? "legend" : "placeholder";
        const elementState = getElementState({ value: valueCorrected });

        setTitleVariant(variant);
        setContainerState(elementState);
    };

    useEffect(() => {
        const variantValue = [disabled ? "disabled" : undefined, readOnly ? "read-only" : undefined].join(" ").trim() || undefined;

        setContainerVariant(variantValue);
    }, [disabled, readOnly]);

    useEffect(() => {
        if (clearValue) setInputValue(defaultValue || "");
    }, [clearValue, defaultValue]);

    return (
        <section className={styles.container} state={type === "hidden" ? "hidden" : undefined}>
            <article className={styles.label} variant={titleVariant}>
                <label htmlFor={name} className={styles.title}>
                    {title}
                </label>
            </article>
            <fieldset className={styles.fieldset} variant={containerVariant} state={containerState}>
                <legend className={styles.title} variant={titleVariant}>
                    {title}
                </legend>
                <div className={styles.inputContainer}>
                    <input
                        id={name}
                        className={styles.input}
                        name={name}
                        type={type}
                        value={inputValue}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        autoComplete={autoComplete}
                        min={type === "number" ? min : undefined}
                        max={type === "number" ? max : undefined}
                        step={type === "number" ? step || 1 : undefined}
                        onChange={onChangeHandler}
                        onFocus={onFocusHandler}
                        onBlur={onBlurHandler}
                        data-required={required || undefined}
                        data-validation-types={getType(validationTypes) === "object" ? JSON.stringify(validationTypes) : undefined}
                        state={inputState}
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

export default InputfieldText;
