import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import styles from "./resources/styles/counter.module.scss";

const Counter = loadable(() => import(/* webpackChunkName: "Counter" */ "features/Counter"), {
    fallback: <Loading />,
});

const CounterPage = (): JSX.Element => {
    return (
        <section className={styles.container}>
            <h1 className={styles.unit} variant="title">
                Counter
            </h1>
            <Counter />;
        </section>
    );
};

export default CounterPage;
