import { Suspense } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import styles from "./resources/styles/template.module.scss";

const MainRoutes = loadable(() => import(/* webpackChunkName: "MainRoutes" */ "Routes"), {
    fallback: <Loading />,
});

const Header = loadable(() => import(/* webpackChunkName: "Header" */ "components/Header"), {
    fallback: <Loading />,
});

const Footer = loadable(() => import(/* webpackChunkName: "Footer" */ "components/Footer"), {
    fallback: <Loading />,
});

const Template = (): JSX.Element => {
    return (
        <>
            <Header />
            <main className={styles.container}>
                <Suspense fallback={<Loading />}>
                    <MainRoutes />
                </Suspense>
            </main>
            <Footer />
        </>
    );
};

export default Template;
