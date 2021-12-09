import { useSpring, animated } from "react-spring";
import { useAppSelector } from "Store/hooks";
import { getTotalWords, getTotalUniqueWords, getHighestFrequency } from "features/CountingWords/countingWordsSelector";
import styles from "./resources/styles/sentenceInfo.module.scss";

const SentenceInfo = (): JSX.Element => {
    const totalWords = useAppSelector(getTotalWords);
    const totalUniqueWords = useAppSelector(getTotalUniqueWords);
    const highestFrequency = useAppSelector(getHighestFrequency);
    const totalWordsProps = useSpring({ val: totalWords, from: { val: 0 } });
    const totalUniqueWordsProps = useSpring({ val: totalUniqueWords, from: { val: 0 } });
    const highestFrequencyProps = useSpring({ val: highestFrequency, from: { val: 0 } });

    return (
        <article className={styles.container}>
            <h2 className={styles.unit} variant="title">
                Sentence info
            </h2>
            <ul className={styles.unit} variant="list">
                <li className={styles.item}>
                    <span className={styles.label}>Highest frequency:</span>
                    <animated.span className={styles.value}>{highestFrequencyProps.val.to((value) => value.toFixed(0))}</animated.span>
                </li>
                <li className={styles.item}>
                    <span className={styles.label}>Unique words:</span>
                    <animated.span className={styles.value}>{totalUniqueWordsProps.val.to((value) => value.toFixed(0))}</animated.span>
                </li>
                <li className={styles.item}>
                    <span className={styles.label}>Total words:</span>
                    <animated.span className={styles.value}>{totalWordsProps.val.to((value) => value.toFixed(0))}</animated.span>
                </li>
            </ul>
        </article>
    );
};

export default SentenceInfo;
