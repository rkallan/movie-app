import { useState } from "react";
import { NavigationLink } from "@cinema-rrkallan/ui-library";
import footerMenu from "./resources/data";
import styles from "./resources/styles/footer.module.scss";

const Footer = (): JSX.Element => {
    const [currentYear] = useState(() => new Date().getFullYear());

    return (
        <footer className={styles.container}>
            <section className={styles.unit}>
                <article className={styles.infoContainer}>
                    <ul className={styles.infoUnit}>
                        <li className={styles.item}>
                            <span className={styles.text}>Kwattaweg 655</span>
                        </li>
                        <li className={styles.item}>
                            <span className={styles.text}>Paramaribo</span>
                        </li>
                        <li className={styles.item}>
                            <span className={styles.text} variant="font-title">
                                Cin3ma RRK
                            </span>
                        </li>
                        <li className={styles.item}>
                            <span className={styles.text}>
                                <a className={styles.link} href="mailto:info@cin3ma-rrk.com">
                                    info@cin3ma-rrk.com
                                </a>
                            </span>
                        </li>
                        <li className={styles.item}>
                            <span className={styles.text}>
                                <a className={styles.link} href="tel:+597463737">
                                    +597 463737
                                </a>
                            </span>
                        </li>
                    </ul>
                </article>
            </section>
            <section className={styles.unit} variant="legal">
                <p className={styles.content}>{currentYear} Copyright © RR Kallan. All Rights Reserved.</p>
                {!!footerMenu && (
                    <ul className={styles.menu}>
                        {footerMenu?.map(({ id, title, url, exact }) => (
                            <li key={id} className={styles.item}>
                                <NavigationLink className={styles.link} end={exact} to={url}>
                                    <span className={styles.text}>{title}</span>
                                </NavigationLink>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </footer>
    );
};

export default Footer;
