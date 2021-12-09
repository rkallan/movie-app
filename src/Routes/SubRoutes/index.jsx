import PropTypes from "prop-types";
import { Route, Routes, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import RedirectRoute from "Routes/RedirectRoute";
import { pageAnimation } from "Routes/configuration";
import styles from "./resources/styles/subRoutes.module.scss";

const SubRoutes = ({ subRoutes }) => {
    const location = useLocation();

    const transition = useTransition(location, pageAnimation);

    return transition((style) => {
        return (
            <animated.section className={styles.container} style={style}>
                <Routes>
                    <Route>
                        {subRoutes.map(({ id, path, exact, routes, redirect, Element }) => {
                            if (redirect)
                                return <Route key={id} exact={exact} path={path} element={<RedirectRoute redirect={redirect} />} />;

                            return (
                                <Route key={id} path={path} exact={exact} element={<Element path={path} exact={exact} routes={routes} />} />
                            );
                        })}
                    </Route>
                </Routes>
            </animated.section>
        );
    });
};

SubRoutes.propTypes = {
    subRoutes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SubRoutes;
