import { useState, useEffect, useCallback, Fragment } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import { useDebounce } from "@cinema-rrkallan/react-hooks";
import { useAppSelector } from "Store/hooks";
import { validations } from "rkallan-javascript-helpers";
import { getWordsFrequency } from "features/CountingWords/countingWordsSelector";
import styles from "./resources/styles/wordsFrequency.module.scss";

const InputfieldText = loadable(
    () => import(/* webpackChunkName: "InputfieldText" */ "@cinema-rrkallan/ui-library/FormElements/InputfieldText"),
    {
        fallback: <Loading />,
    }
);

const Pagination = loadable(() => import(/* webpackChunkName: "pagination" */ "@cinema-rrkallan/ui-library/Pagination"), {
    fallback: <Loading />,
});

const WordsFrequency = (): JSX.Element => {
    const wordsFrequency = useAppSelector(getWordsFrequency);
    const [inputValue, setInputValue] = useState(() => 5);
    const [words, setWords] = useState(() => []);
    const [pageContentData, setPageContentData] = useState(() => []);
    const debouncedCurrentValue = useDebounce(inputValue, 750);

    const onChangeHandlerInputfield = (value: number) => {
        setInputValue(value);
    };

    const setPageContent = useCallback((data) => {
        setPageContentData(data);
    }, []);

    const mostFrequentWords = useCallback(() => {
        const tempWords = wordsFrequency.slice(0, inputValue);
        setWords(tempWords);
    }, [inputValue, wordsFrequency]);

    useEffect(() => {
        if (debouncedCurrentValue === inputValue) {
            mostFrequentWords();
        }
    }, [debouncedCurrentValue, inputValue, mostFrequentWords]);

    return (
        <article className={styles.container}>
            <h2 className={styles.unit} variant="title">
                Words with frequency
            </h2>

            <InputfieldText
                title="Show most frequent words"
                name="frequent-words"
                type="number"
                customOnChangeHandler={onChangeHandlerInputfield}
                defaultValue={inputValue}
                required
                validationTypes={{ number: null, numberIsOrBetween: { minimal: 1, maximum: Infinity } }}
                min={1}
            />

            {validations.isEmpty(words) && <p>No sentence</p>}

            {validations.isNotEmpty(words, true) && (
                <>
                    <article className={styles.unit} variant="list">
                        {pageContentData?.map(({ word, frequency, position }) => (
                            <Fragment key={word}>
                                <div className={styles.content} variant="ranking">
                                    #{position}
                                </div>
                                <div className={styles.content} variant="word">
                                    <span>{word}</span>
                                </div>
                                <div className={styles.content} variant="frequency">
                                    {frequency}
                                </div>
                            </Fragment>
                        ))}
                    </article>
                    <article className={styles.pagination}>
                        <Pagination getPageContent={setPageContent} data={words} />
                    </article>
                </>
            )}
        </article>
    );
};

export default WordsFrequency;
