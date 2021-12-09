import { Suspense } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import InterfaceError from "./types";
import styles from "./resources/styles/error.module.scss";

const SubRoutes = loadable(() => import(/* webpackChunkName: "SubRoutes" */ "Routes/SubRoutes"), {
    fallback: <Loading />,
});

const Error = ({ routes }: InterfaceError): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.unit} variant="content">
                <Suspense fallback={<Loading />}>
                    <SubRoutes subRoutes={routes} />
                </Suspense>
            </div>
        </div>
    );
};

export default Error;
