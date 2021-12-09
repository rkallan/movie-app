import { Route, Routes, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import RedirectRoute from "Routes/RedirectRoute";
import { pageAnimation, routeConfiguration } from "Routes/configuration";
import styles from "./resources/styles/mainRoutes.module.scss";

const MainRoutes = () => {
    const location = useLocation();
    const transition = useTransition(location, pageAnimation);

    return transition((style, item) => {
        const animationStyle =
            item.pathname.split("/")[1] !== location.pathname.split("/")[1] || item.pathname === location.pathname ? style : null;

        return (
            <animated.div className={styles.container} style={animationStyle}>
                <Routes location={item}>
                    <Route path="/">
                        {routeConfiguration.map(({ id, path, exact, routes, redirect, Element }) => {
                            if (redirect)
                                return <Route key={id} exact={exact} path={path} element={<RedirectRoute redirect={redirect} />} />;

                            return (
                                <Route key={id} path={path} exact={exact} element={<Element path={path} exact={exact} routes={routes} />} />
                            );
                        })}
                    </Route>
                </Routes>
            </animated.div>
        );
    });
};

export default MainRoutes;
