/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, MouseEvent } from "react";
import { keyEvent, getParentElementWithAttributeValue } from "@cinema-rrkallan/js-helpers";
import { NavigationLink } from "@cinema-rrkallan/ui-library";
import menu from "./resources/data/menu.json";
import styles from "./resources/styles/menu.module.scss";

const Menu = (): JSX.Element | null => {
    const [menuStateActive, setMenuStateActive] = useState(() => false);

    const onClickHandlerMobileButton = () => setMenuStateActive(!menuStateActive);

    const onClickHandlerNavLink = (event: MouseEvent<HTMLAnchorElement>) => {
        const { currentTarget } = event || {};
        currentTarget.blur();

        if (menuStateActive) onClickHandlerMobileButton();
    };

    const onOutSideClick = useCallback(
        (event: any) => {
            if (event?.type === "keyup" && event?.key !== keyEvent.esc) return;

            const element = event?.target || undefined;
            const hasParentElementMobileButton = !!getParentElementWithAttributeValue(element, "variant", "mobile-button");

            if (!hasParentElementMobileButton) setMenuStateActive(!menuStateActive);
        },
        [menuStateActive]
    );

    useEffect(() => {
        const listenerKey = menuStateActive ? "addEventListener" : "removeEventListener";

        window.document[listenerKey]("click", onOutSideClick);
        window.document[listenerKey]("keyup", onOutSideClick);

        return () => {
            window.document.removeEventListener("click", onOutSideClick);
            window.document.removeEventListener("keyup", onOutSideClick);
        };
    }, [menuStateActive, onOutSideClick]);

    if (!menu?.length) return null;

    return (
        <nav className={styles.container}>
            <div className={styles.mobileButtonContainer}>
                <button className={styles.mobileButtonUnit} type="button" onClick={onClickHandlerMobileButton} variant="mobile-button">
                    <div className={styles.iconContainer} state={`${menuStateActive ? "is" : "in"}-active`}>
                        <span className={styles.iconUnit} />
                        <span className={styles.iconUnit} />
                        <span className={styles.iconUnit} />
                        <span className={styles.iconUnit} />
                    </div>
                </button>
            </div>
            <ul className={styles.unit} state={`${menuStateActive ? "is" : "in"}-active`}>
                {menu?.map(({ id, title, url, exact }) => (
                    <li key={id} className={styles.item}>
                        <NavigationLink className={styles.link} onClick={onClickHandlerNavLink} end={exact} to={url}>
                            <span className={styles.text}>{title}</span>
                        </NavigationLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
