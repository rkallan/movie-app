import InterfaceTemplateProvider from "./types";
import "../resources/styles/default/_default.scss";

const TemplateProvider = ({ children }: InterfaceTemplateProvider): JSX.Element => {
    return <>{children}</>;
};

export default TemplateProvider;
