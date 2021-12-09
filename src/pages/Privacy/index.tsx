import styles from "./resources/styles/privacy.module.scss";

const Privacy = (): JSX.Element => {
    return (
        <section className={styles.container}>
            <article className={styles.unit}>
                <h1>Privacy Policy</h1>
                <p>
                    TThis privacy policy establishes how RR. Kallan born 10 August 1983 Rotterdam the Netherlands (referred to as "we" and
                    "the company" in this document) uses and protects any information that you make available to the company through the use
                    of our website (tutorialzine.com), software and services.
                </p>
                <p>
                    We handle your data in accordance with the principles of the GDPR and we are committed to ensuring that your privacy is
                    protected. In this document, the data categories we collect are given in bold, and the lawful basis for processing are
                    in italics.
                </p>
                <p>
                    Any information and data that you provide will only be used in accordance with this privacy statement. We may update it
                    periodically without prior notice.
                </p>

                <h2>Data collection and usage</h2>
                <p>
                    The following categories of data are collected and processed on our website (tutorialzine.com) in accordance with the
                    policies and legal basis set forth by the GDPR:
                </p>

                <ul>
                    <li>
                        <p>
                            As a standard prerequisite for the functioning of our websites (tutorialzine.com), our servers collect and log
                            visitors' IP addresses. This is in accordance with our contractual obligation of providing you with access to
                            our websites. This data is retained for a maximum of 2 months and is pruned automatically.
                        </p>
                    </li>
                </ul>

                <h2>Security</h2>
                <p>
                    We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we
                    have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we
                    collect and store.
                </p>

                <h2>How we use cookies</h2>
                <p>
                    Cookies allow web applications to respond to you as an individual, and maintain your logged in state. The web
                    application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about
                    your preferences.
                </p>
                <p>
                    You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify
                    your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                </p>

                <h2>Controlling your personal information</h2>
                <p>
                    We will not sell, distribute or lease your personal information to third parties unless we are required by law to do so.
                </p>
                <p>
                    If you believe that any information we are holding on you is incorrect or incomplete, or want it erased, please write to
                    as soon as possible.
                </p>
            </article>
        </section>
    );
};

export default Privacy;
