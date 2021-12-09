import loadable from "@loadable/component";
import { Loading } from "@cinema-rrkallan/ui-library";
import styles from "./resources/styles/header.module.scss";

const Logo = loadable(() => import(/* webpackChunkName: "Logo" */ "components/Logo"), {
    fallback: <Loading />,
});

const Menu = loadable(() => import(/* webpackChunkName: "Menu" */ "components/Menu"), {
    fallback: <Loading />,
});

const Header = (): JSX.Element => {
    return (
        <header className={styles.container}>
            <div className={styles.unit} variant="logo">
                <Logo />
            </div>
            <nav className={styles.unit} variant="menu">
                <Menu />
            </nav>
        </header>
    );
};

export default Header;
