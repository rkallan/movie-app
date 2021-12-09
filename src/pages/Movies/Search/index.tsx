import { Suspense } from "react";
import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";

const MoviesList = loadable(() => import(/* webpackChunkName: "MoviesList" */ "features/Movies/MoviesList"), {
    fallback: <Loading />,
});

const Search = (): JSX.Element => {
    return (
        <section>
            <Suspense fallback={<Loading />}>
                <MoviesList />
            </Suspense>
        </section>
    );
};

export default Search;
