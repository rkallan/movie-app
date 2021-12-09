import { useState, useEffect, useCallback, Fragment } from "react";
import loadable from "@loadable/component";
import { validations } from "rkallan-javascript-helpers";
import { Loading } from "@cinema-rrkallan/ui-library";
import { useDebounce } from "@cinema-rrkallan/react-hooks";
import { useAppSelector } from "Store/hooks";
import { getWordsFrequency } from "features/CountingWords//countingWordsSelector";
import { InterfaceWordFrequency } from "features/CountingWords/types";
import styles from "./resources/styles/frequencyOfWord.module.scss";

const InputfieldText = loadable(
    () => import(/* webpackChunkName: "InputfieldText" */ "@cinema-rrkallan/ui-library/FormElements/InputfieldText"),
    {
        fallback: <Loading />,
    }
);

const Pagination = loadable(() => import(/* webpackChunkName: "pagination" */ "@cinema-rrkallan/ui-library/Pagination"), {
    fallback: <Loading />,
});

const FrequencyOfWord = (): JSX.Element => {
    const wordsFrequency = useAppSelector(getWordsFrequency);
    const [inputValue, setInputValue] = useState(() => "");
    const [words, setWords] = useState(() => []);
    const [pageContentData, setPageContentData] = useState(() => []);
    const debouncedCurrentValue = useDebounce(inputValue, 750);

    const onChangeHandlerInputfield = (value: string) => setInputValue(value);

    const setPageContent = useCallback((data) => {
        setPageContentData(data);
    }, []);

    useEffect(() => {
        if (debouncedCurrentValue === inputValue) {
            const wordSearch = validations.isEmpty(debouncedCurrentValue)
                ? []
                : wordsFrequency.filter((item: InterfaceWordFrequency) => item.word.includes(debouncedCurrentValue));

            setWords(wordSearch);
        }
    }, [debouncedCurrentValue, inputValue, wordsFrequency]);

    return (
        <article className={styles.container}>
            <h2 className={styles.unit} variant="title">
                Frequency for matching word
            </h2>

            <InputfieldText
                title="Search for word"
                name="word"
                customOnChangeHandler={onChangeHandlerInputfield}
                defaultValue={inputValue}
                validationTypes={{ alphabetic: null, containsNot: { notAllowed: [" "] } }}
                disabled={validations.isEmpty(wordsFrequency)}
            />

            {validations.isNotEmpty(words, true) && (
                <>
                    <article className={styles.unit} variant="list">
                        {pageContentData?.map(({ word, frequency }) => (
                            <Fragment key={word}>
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

export default FrequencyOfWord;
