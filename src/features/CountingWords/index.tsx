import { Suspense } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import styles from "./resources/styles/countingWords.module.scss";

const SentenceField = loadable(() => import(/* webpackChunkName: "SentenceField" */ "./SentenceField"), {
    fallback: <Loading />,
});

const SentenceInfo = loadable(() => import(/* webpackChunkName: "SentenceInfo" */ "./SentenceInfo"), {
    fallback: <Loading />,
});

const WordsFrequency = loadable(() => import(/* webpackChunkName: "WordsFrequency" */ "./WordsFrequency"), {
    fallback: <Loading />,
});

const FrequencyOfWord = loadable(() => import(/* webpackChunkName: "FrequencyOfWord" */ "./FrequencyOfWord"), {
    fallback: <Loading />,
});

const CountingWords = (): JSX.Element => {
    return (
        <section className={styles.container}>
            <h1 className={styles.unit} variant="title">
                Counting Words
            </h1>
            <div className={styles.unit}>
                <Suspense fallback={<Loading />}>
                    <SentenceField />
                    <SentenceInfo />
                </Suspense>
            </div>
            <div className={styles.unit}>
                <Suspense fallback={<Loading />}>
                    <WordsFrequency />
                    <FrequencyOfWord />
                </Suspense>
            </div>
        </section>
    );
};

export default CountingWords;
