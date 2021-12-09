/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import { MouseEvent } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import InterfaceButton from "./types";
import styles from "./resources/styles/button.module.scss";

const Icon = loadable(() => import(/* webpackChunkName: "Icons" */ "@cinema-rrkallan/ui-library/Icons"), {
    fallback: <Loading />,
});

const Button = ({ children, type = "button", disabled = false }: InterfaceButton): JSX.Element => {
    const onClickHandlerButton = (event: MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        const { currentTarget } = event || {};

        currentTarget.blur();
    };

    return (
        <button className={styles.container} type={type} disabled={disabled} onClick={onClickHandlerButton}>
            <div className={styles.unit} variant="loading">
                <Icon icon="loading" svgProps={undefined} noContainer={false} variant="small" />
                <span>Loading</span>
            </div>
            <div className={styles.unit}>{children}</div>
        </button>
    );
};

export default Button;
