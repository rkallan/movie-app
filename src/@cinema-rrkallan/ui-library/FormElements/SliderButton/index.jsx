import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getType, ucFirst } from "@cinema-rrkallan/js-helpers";

import styles from "./resources/styles/sliderButton.module.scss";

const SliderButton = ({ value, defaultValue, name, disabled, readOnly, onChangeHandler, clearValue, updateValue, title }) => {
    const [isKeyHandler, setIsKeyHandler] = useState(false);
    const [isChecked, setIsChecked] = useState(value);

    const slideButtonInActive = () => disabled || readOnly;

    const handleOnChange = (event) => {
        const isInActive = slideButtonInActive();
        if (isInActive) return;

        const element = event.currentTarget;
        const { checked } = element || {};

        setIsChecked(checked);

        if (getType(onChangeHandler) === "function") onChangeHandler(event);
    };

    const onClickHandler = (event) => {
        const isInActive = slideButtonInActive();
        if (isInActive) return;

        const element = event.currentTarget;
        const { checked } = element || {};
        const newValue = !checked;

        setIsChecked(newValue);

        if (!isKeyHandler) event.currentTarget.blur();
    };

    const onKeyHandler = () => setIsKeyHandler(true);

    const onBlurHandler = () => setIsKeyHandler(false);

    const onClickHandlerButton = (event) => {
        const isInActive = slideButtonInActive();
        if (isInActive) return;

        const element = event.currentTarget;
        const elementValue = JSON.parse(element?.value || false);
        const checked = !elementValue;

        if (!isKeyHandler) event.currentTarget.blur();

        setIsChecked(checked);

        if (getType(onChangeHandler) === "function") onChangeHandler(event);
    };

    useEffect(() => {
        if (clearValue) setIsChecked(defaultValue);
    }, [clearValue, defaultValue]);

    useEffect(() => {
        if (updateValue) setIsChecked(value);
    }, [updateValue, value]);

    return (
        <div className={styles.container}>
            <input
                className={styles.checkbox}
                name={name}
                type="checkbox"
                onChange={handleOnChange}
                onClick={onClickHandler}
                onKeyUp={onKeyHandler}
                onBlur={onBlurHandler}
                checked={isChecked}
                disabled={disabled}
                readOnly={readOnly}
            />
            <button
                className={styles.sliderButton}
                type="button"
                onClick={onClickHandlerButton}
                onKeyUp={onKeyHandler}
                onBlur={onBlurHandler}
                value={isChecked}
                name={name}
            >
                {!!title && <div>{ucFirst(title)}</div>}

                <div className={styles.unit}>
                    <div className={styles.circle} />
                </div>
            </button>
        </div>
    );
};

SliderButton.defaultProps = {
    onChangeHandler: undefined,
    value: false,
    defaultValue: false,
    disabled: false,
    readOnly: false,
    updateValue: false,
    clearValue: false,
    title: undefined,
};

SliderButton.propTypes = {
    onChangeHandler: PropTypes.func,
    value: PropTypes.bool,
    defaultValue: PropTypes.bool,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    updateValue: PropTypes.bool,
    clearValue: PropTypes.bool,
    title: PropTypes.string,
};

export default SliderButton;
