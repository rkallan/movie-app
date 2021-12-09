import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import AuthProvider from "features/authentication/AuthProvider";
import { Loading } from "@cinema-rrkallan/ui-library";

const Template = loadable(() => import(/* webpackChunkName: "Template" */ "Template"), {
    fallback: <div>Loading</div>,
});

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Suspense fallback={<Loading />}>
                    <Template />
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
