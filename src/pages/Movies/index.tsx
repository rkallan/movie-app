import { Suspense } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import InterfaceMovies from "./types";
import styles from "./resources/styles/movies.module.scss";

const SubRoutes = loadable(() => import(/* webpackChunkName: "SubRoutes" */ "Routes/SubRoutes"), {
    fallback: <Loading />,
});

const MoviesSearchFornm = loadable(() => import(/* webpackChunkName: "MoviesSearchFornm" */ "features/Movies/SearchForm"), {
    fallback: <Loading />,
});

const Movies = ({ routes }: InterfaceMovies): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.unit} variant="content">
                <h1>Movies</h1>
                <section>
                    <Suspense fallback={<Loading />}>
                        <MoviesSearchFornm />
                    </Suspense>
                </section>
            </div>
            <div className={styles.unit} variant="sub-page">
                <Suspense fallback={<Loading />}>
                    <SubRoutes subRoutes={routes} />
                </Suspense>
            </div>
        </div>
    );
};

export default Movies;
