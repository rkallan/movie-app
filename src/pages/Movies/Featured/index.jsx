/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { apiCall, objectAsUrlParams, convertObjectKeys } from "@cinema-rrkallan/js-helpers";
import styles from "./resources/styles/featured.module.scss";

const Featured = () => {
    const [apiUrl] = useState(() => process.env.REACT_APP_OMDB_API_URL);
    const [getParamsMovie1] = useState(() => {
        const paramsObject = {
            t: "dostana",
            type: "movie",
            plot: "full",
            r: "json",
            v: 1,
            apikey: process.env.REACT_APP_OMDB_KEY,
        };
        const urlParam = objectAsUrlParams(paramsObject);
        return urlParam;
    });
    const [getParamsMovie2] = useState(() => {
        const paramsObject = {
            t: "suriname",
            type: "movie",
            plot: "full",
            r: "json",
            v: 1,
            apikey: process.env.REACT_APP_OMDB_KEY,
        };
        const urlParam = objectAsUrlParams(paramsObject);
        return urlParam;
    });
    const [movieData1, setMovieData1] = useState(undefined);
    const [movieData2, setMovieData2] = useState(undefined);

    useEffect(() => {
        let ignore = false;
        const movieApiCall = async () => {
            const response = await apiCall({ url: `${apiUrl}${getParamsMovie1}`, method: "get" });
            const jsonResponse = await response.json();
            const responseConverted = await convertObjectKeys({ dataObject: jsonResponse });
            const data = responseConverted;
            data.actors = responseConverted.actors.split(",");
            data.genre = responseConverted.genre.split(",");
            data.writer = responseConverted.writer.split(",");

            setMovieData1(data);
        };

        if (!movieData1 && !ignore) {
            movieApiCall();
        }

        return () => {
            ignore = true;
        };
    }, [apiUrl, getParamsMovie1, movieData1]);

    useEffect(() => {
        let ignore = false;
        const movieApiCall = async () => {
            const response = await apiCall({ url: `${apiUrl}${getParamsMovie2}`, method: "get" });
            const jsonResponse = await response.json();
            const responseConverted = await convertObjectKeys({ dataObject: jsonResponse });
            const data = responseConverted;
            data.actors = responseConverted.actors.split(",");
            data.genre = responseConverted.genre.split(",");
            data.writer = responseConverted.writer.split(",");

            setMovieData2(data);
        };

        if (!movieData1 && !ignore) {
            movieApiCall();
        }

        return () => {
            ignore = true;
        };
    }, [apiUrl, getParamsMovie1, getParamsMovie2, movieData1]);

    return (
        <section className={styles.container}>
            <article className={styles.unit}>
                {!!movieData1 && (
                    <>
                        <h1 className={styles.title}>{movieData1.title}</h1>
                        <section className={styles.unit2}>
                            <figure className={styles.image}>
                                <img src={movieData1.poster} alt={movieData1.title} />
                            </figure>
                            <div className={styles.content}>
                                <p>{movieData1.plot}</p>

                                <div className={styles.info}>
                                    <div className={styles.label}>Year:</div>
                                    <div className={styles.value}>{movieData1.year}</div>
                                </div>

                                <div className={styles.info}>
                                    <div className={styles.label}>Awards:</div>
                                    <div className={styles.value}>{movieData1.awards}</div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </article>
            <article className={styles.unit}>
                {!!movieData2 && (
                    <>
                        <h1 className={styles.title}>{movieData2.title}</h1>
                        <section className={styles.unit2}>
                            <figure className={styles.image}>
                                <img src={movieData2.poster} alt={movieData2.title} />
                            </figure>
                            <div className={styles.content}>
                                <p>{movieData2.plot}</p>

                                <div className={styles.info}>
                                    <div className={styles.label}>Year:</div>
                                    <div className={styles.value}>{movieData2.year}</div>
                                </div>

                                <div className={styles.info}>
                                    <div className={styles.label}>Awards:</div>
                                    <div className={styles.value}>{movieData2.awards}</div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </article>
        </section>
    );
};

export default Featured;
