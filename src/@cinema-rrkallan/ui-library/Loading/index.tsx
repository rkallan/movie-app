import { useState, useEffect } from "react";
import InterfaceLoading from "./types";
import styles from "./resources/styles/loading.module.scss";

const Loading = ({ delay = 5, text = "Loading", minHeight = true, textColor = "default" }: InterfaceLoading): JSX.Element | null => {
    const [showLoadingIndicator, setLoadingIndicatorVisibility] = useState(false);
    const [totalDots] = useState(() => 5);
    const [animationDuration] = useState(() => totalDots * 0.15);
    const [variant] = useState(() => [minHeight && "min-height", textColor && `color-${textColor}`]);

    useEffect(() => {
        const timer = setTimeout(() => setLoadingIndicatorVisibility(true), delay);

        return () => {
            clearTimeout(timer);
        };
    });

    if (showLoadingIndicator)
        return (
            <div className={styles.container} variant={variant.join(" ")}>
                <span className={styles.text}>{text}</span>

                {Array.from({ length: totalDots }, (_, index) => {
                    const key = index;
                    const style = { animationDelay: `${0.15 * index}s`, animationDuration: `${animationDuration}s` };
                    return <span key={key} className={styles.dots} style={style} />;
                })}
            </div>
        );

    return null;
};

export default Loading;
