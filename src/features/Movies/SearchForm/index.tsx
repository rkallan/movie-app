/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import { useAppDispatch } from "Store/hooks";
import Loading from "@cinema-rrkallan/ui-library/Loading";
import { convertObjectKeys } from "@cinema-rrkallan/js-helpers";
import { setMovies } from "features/Movies/moviesSlice";
import formData from "./constants/searchForm";

const Form = loadable(() => import(/* webpackChunkName: "LoginForm" */ "@cinema-rrkallan/ui-library/Form"), {
    fallback: <Loading />,
});

const MoviesSearchFornm = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formSubmitHandler = async (response: any) => {
        if (location.pathname !== "/movies/search") navigate("/movies/search");

        const jsonResponse = await response;
        const responseConverted = await convertObjectKeys({ dataObject: jsonResponse });

        const movies = {
            search: responseConverted?.search?.slice(0, 5),
            error: responseConverted?.error,
        };

        dispatch(setMovies(movies));
    };

    return (
        <div>
            <Form
                customEventHandler={undefined}
                customSubmitHandler={formSubmitHandler}
                disableForm={undefined}
                resetForm={undefined}
                submitButtonDisabled={undefined}
                buttonsAttributes={undefined}
                {...formData}
                postFormWithApiCall
            />
        </div>
    );
};

export default MoviesSearchFornm;
