import loadable from "@loadable/component";

const Example = loadable(() => import(/* webpackChunkName: "Example" */ "pages/Example"));

const Error = loadable(() => import(/* webpackChunkName: "Error" */ "pages/Error"));
const Error403 = loadable(() => import(/* webpackChunkName: "Error403" */ "pages/Error/Error403"));
const Error404 = loadable(() => import(/* webpackChunkName: "Error404" */ "pages/Error/Error404"));

const Movies = loadable(() => import(/* webpackChunkName: "Movies" */ "pages/Movies"));
const MoviesFeatured = loadable(() => import(/* webpackChunkName: "MoviesFeatured" */ "pages/Movies/Featured"));
const MoviesSearch = loadable(() => import(/* webpackChunkName: "MoviesSearch" */ "pages/Movies/Search"));
const MovieItem = loadable(() => import(/* webpackChunkName: "MovieItem" */ "pages/Movies/Item"));

const Terms = loadable(() => import(/* webpackChunkName: "Terms" */ "pages/Terms"));
const Privacy = loadable(() => import(/* webpackChunkName: "Privacy" */ "pages/Privacy"));

const routeConfiguration = [
    {
        id: 20,
        path: "/",
        redirect: "/movies/featured",
        exact: true,
        authenticated: false,
    },
    {
        id: 30,
        path: "/movies/*",
        Element: Movies,
        title: "Movies",
        authenticated: false,
        routes: [
            {
                id: 10,
                routeId: 30,
                path: "featured",
                Element: MoviesFeatured,
                title: "Featured",
                exact: true,
                authenticated: false,
            },
            {
                id: 20,
                routeId: 30,
                path: "search",
                Element: MoviesSearch,
                title: "Search",
                exact: true,
                authenticated: false,
            },
            {
                id: 30,
                routeId: 30,
                path: "item/:id",
                Element: MovieItem,
                title: "Movie Item",
                exact: true,
                authenticated: false,
            },
            {
                id: 40,
                routeId: 30,
                path: "*",
                redirect: "/error/404",
            },
        ],
    },
    {
        id: 40,
        path: "/terms-and-conditions",
        Element: Terms,
        exact: true,
        authenticated: false,
    },
    {
        id: 50,
        path: "/privacy-policy",
        Element: Privacy,
        exact: true,
        authenticated: false,
    },
    {
        id: 1000,
        path: "/example",
        Element: Example,
        exact: true,
        authenticated: false,
    },
    {
        id: 10,
        path: "/error/*",
        Element: Error,
        title: "Error",
        routes: [
            {
                id: 10,
                routeId: 10,
                path: "403",
                Element: Error403,
                title: "Error403",
                exact: true,
            },
            {
                id: 20,
                routeId: 10,
                path: "404",
                Element: Error404,
                title: "Error404",
                exact: true,
            },
            {
                id: 30,
                routeId: 10,
                path: "*",
                redirect: "/error/404",
            },
        ],
    },
    {
        id: 5,
        path: "*",
        redirect: "/error/404",
    },
];

export default routeConfiguration;
