interface InterfaceRoutes {
    id: number;
    routeId?: number;
    path: string;
    Element: JSX.Element;
    title: string;
    exact: boolean;
    authenticated: boolean;
}

interface InterfaceMovies {
    routes: Array<InterfaceRoutes>;
}

export default InterfaceMovies;
