import { Link } from "react-router-dom";
import { ReactComponent as SvgLogo } from "./resources/svg/logo.svg";
import styles from "./resources/styles/logo.module.scss";

const Logo = (): JSX.Element => {
    return (
        <figure className={styles.container}>
            <Link className={styles.link} to="/">
                <SvgLogo className={styles.svg} />
            </Link>
        </figure>
    );
};

export default Logo;
