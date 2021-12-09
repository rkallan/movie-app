import { MouseEvent } from "react";
import { NavLink, NavLinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { getType } from "@cinema-rrkallan/js-helpers";

const NavigationLink = ({ children, to, onClick, ...props }: NavLinkProps): JSX.Element => {
    const resolved = useResolvedPath(to);
    const isActive = !!useMatch({ path: resolved.pathname, end: true });

    const onClickHandlerNavLink = (event: MouseEvent<HTMLAnchorElement>) => {
        if (isActive) {
            event.preventDefault();
            return;
        }

        if (onClick && getType(onClick) === "function") onClick(event);
    };

    return (
        <NavLink onClick={onClickHandlerNavLink} to={to} {...props} variant={isActive ? "is-active" : undefined}>
            {children}
        </NavLink>
    );
};

export default NavigationLink;
