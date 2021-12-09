import { useAppSelector } from "Store/hooks";
import { moviesList, moviesError } from "features/Movies/moviesSelector";
import { NavigationLink } from "@cinema-rrkallan/ui-library";
import styles from "./resources/styles/movieList.module.scss";

const MoviesList = () => {
    const movies = useAppSelector(moviesList);
    const error = useAppSelector(moviesError);

    return (
        <div className={styles.container}>
            {!!error && <div>{error}</div>}

            {!!movies && (
                <section className={styles.unit} variant="movie-list">
                    {movies?.map((movie) => {
                        return (
                            <article key={movie.imdbID} className={styles.item}>
                                <NavigationLink to={`/movies/item/${movie.imdbID}`}>
                                    {movie.poster !== "N/A" && (
                                        <figure className={styles.image}>
                                            <img src={movie.poster} alt={movie.title} />
                                        </figure>
                                    )}
                                    <h1 className={styles.title}>{movie.title}</h1>
                                </NavigationLink>
                            </article>
                        );
                    })}
                </section>
            )}
        </div>
    );
};

export default MoviesList;
