import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";

const Icon = loadable(() => import(/* webpackChunkName: "Icons" */ "@cinema-rrkallan/ui-library/Icons"), {
    fallback: <Loading />,
});

const searchForm = {
    attributes: {
        method: "get",
        name: "search-movies-form",
        autoComplete: "off",
        "data-required": true,
        action: process.env.REACT_APP_OMDB_API_URL,
        noValidate: true,
    },
    fieldsets: [
        {
            id: 1,
            caption: null,
            disabled: false,
            form: null,
            name: null,
            elements: {
                s: {
                    id: 1,
                    name: "s",
                    title: "Search movies by title",
                    type: "text",
                    required: true,
                    validationTypes: {
                        hasMinimalAndMaximalCharacters: { minCharacters: 2, maxCharacters: 256 },
                    },
                    disabled: false,
                    node: "input",
                },
                plot: {
                    id: 3,
                    name: "plot",
                    title: "Full plot",
                    value: true,
                    defaultValue: true,
                    disabled: false,
                    node: "slider",
                },
                r: {
                    id: 4,
                    name: "r",
                    title: "Data tyoe to return",
                    type: "hidden",
                    defaultValue: "json",
                    readonly: true,
                    disabled: false,
                    node: "input",
                },
                type: {
                    id: 5,
                    name: "type",
                    title: "Type",
                    type: "hidden",
                    defaultValue: "movie",
                    readonly: true,
                    disabled: false,
                    node: "input",
                },
                v: {
                    id: 6,
                    name: "v",
                    title: "Version",
                    type: "hidden",
                    defaultValue: 1,
                    readonly: true,
                    disabled: false,
                    node: "input",
                },
                apikey: {
                    id: 7,
                    name: "apikey",
                    title: "OMDB Apikey",
                    type: "hidden",
                    defaultValue: process.env.REACT_APP_OMDB_KEY,
                    readonly: true,
                    disabled: false,
                    node: "input",
                },
            },
        },
        {
            id: 2,
            caption: null,
            disabled: false,
            form: null,
            name: null,
            variant: "row-reverse",
            elements: {
                submit: {
                    id: 3,
                    node: "button",
                    type: "submit",
                    text: "Login",
                    children: (
                        <>
                            <Icon icon="search" svgProps={undefined} noContainer={false} variant="small" />
                            <span>Button text</span>
                        </>
                    ),
                    disabled: true,
                },
            },
        },
    ],
};

export default searchForm;
