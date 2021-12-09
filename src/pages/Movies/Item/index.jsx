import { useEffect, useState } from "react";
import { apiCall, objectAsUrlParams, convertObjectKeys } from "@cinema-rrkallan/js-helpers";
import { useParams } from "react-router-dom";
import styles from "./resources/styles/item.module.scss";

const MovieItem = () => {
    const { id } = useParams();
    const [apiUrl] = useState(() => process.env.REACT_APP_OMDB_API_URL);
    const [getParamsForApi] = useState(() => {
        const paramsObject = {
            i: id,
            type: "movie",
            plot: "full",
            r: "json",
            v: 1,
            apikey: process.env.REACT_APP_OMDB_KEY,
        };
        const urlParam = objectAsUrlParams(paramsObject);
        return urlParam;
    });
    const [movieData, setMovieData] = useState(undefined);

    useEffect(() => {
        let ignore = false;
        const movieApiCall = async () => {
            const response = await apiCall({ url: `${apiUrl}${getParamsForApi}`, method: "get" });
            const jsonResponse = await response.json();
            const responseConverted = await convertObjectKeys({ dataObject: jsonResponse });
            const data = responseConverted;
            data.actors = responseConverted.actors.split(",");
            data.genre = responseConverted.genre.split(",");
            data.writer = responseConverted.writer.split(",");

            setMovieData(data);
        };

        if (id && !movieData && !ignore) {
            movieApiCall();
        }

        return () => {
            ignore = true;
        };
    }, [apiUrl, getParamsForApi, id, movieData]);

    return (
        <article className={styles.container}>
            {!!movieData && (
                <>
                    <h1 className={styles.title}>{movieData.title}</h1>
                    <section className={styles.unit}>
                        {movieData.poste !== "N/A" && (
                            <figure className={styles.image}>
                                <img src={movieData.poster} alt={movieData.title} />
                            </figure>
                        )}
                        <div className={styles.content}>
                            <p>{movieData.plot}</p>

                            <div className={styles.info}>
                                <div className={styles.label}>Genre: </div>
                                <ul className={styles.list}>
                                    {movieData?.genre.map((genre) => (
                                        <li key={genre}>{genre}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.label}>Actors: </div>
                                <ul className={styles.list}>
                                    {movieData?.actors.map((actor) => (
                                        <li key={actor}>{actor}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.label}>Type:</div>
                                <div className={styles.value}>{movieData.type}</div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.label}>Year:</div>
                                <div className={styles.value}>{movieData.year}</div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.label}>Awards:</div>
                                <div className={styles.value}>{movieData.awards}</div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.label}>Rated:</div>
                                <div className={styles.value}>{movieData.rated}</div>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.label}>Director:</div>
                                <div className={styles.value}>{movieData.director}</div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </article>
    );
};

export default MovieItem;
