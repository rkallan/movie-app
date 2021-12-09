import { createSelector } from "@reduxjs/toolkit";

const moviesState = ({ movies }) => movies;
const moviesList = createSelector(moviesState, (movies) => movies.list);
const moviesError = createSelector(moviesState, (movies) => movies.error);

export { moviesState, moviesList, moviesError };
