/* eslint-disable no-console */
import { useState, useEffect } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import { useDebounce } from "@cinema-rrkallan/react-hooks";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { countingWordsAsync } from "features/CountingWords/countingWordsSlice";
import { getSentence } from "features/CountingWords/countingWordsSelector";
import styles from "./resources/styles/sentenceField.module.scss";

const Textarea = loadable(() => import(/* webpackChunkName: "Textarea" */ "@cinema-rrkallan/ui-library/FormElements/Textarea"), {
    fallback: <Loading />,
});

const SentenceField = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const initSentence = useAppSelector(getSentence);
    const [sentence, setSentence] = useState(() => initSentence);
    const debouncedCurrentValue = useDebounce(sentence, 750);

    const onChangeHandlerTextarea = (value: string): void => {
        const valueTrimmed = value.trim();
        setSentence(valueTrimmed);
    };

    useEffect(() => {
        if (debouncedCurrentValue === sentence) {
            dispatch(countingWordsAsync(debouncedCurrentValue));
        }
    }, [debouncedCurrentValue, dispatch, sentence]);

    return (
        <article className={styles.container}>
            <Textarea
                title="Sentence for word analyzer"
                name="wordCount"
                customOnChangeHandler={onChangeHandlerTextarea}
                defaultValue={initSentence}
            />
        </article>
    );
};

export default SentenceField;
