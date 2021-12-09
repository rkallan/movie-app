import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import styles from "./resources/styles/countingWordsPage.module.scss";

const CountingWords = loadable(() => import(/* webpackChunkName: "CountingWords" */ "features/CountingWords"), {
    fallback: <Loading />,
});

const CountingWordsPage = (): JSX.Element => {
    return (
        <section className={styles.container}>
            <CountingWords />
        </section>
    );
};

export default CountingWordsPage;
