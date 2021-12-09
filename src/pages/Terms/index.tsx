import { Link } from "react-router-dom";
import styles from "./resources/styles/terms.module.scss";

const Terms = (): JSX.Element => {
    return (
        <section className={styles.container}>
            <article className={styles.unit}>
                <h1>Terms and Conditions</h1>
                <p>
                    This website / application is a product created and owned by RR. Kallan born 10 August 1983 Rotterdam the Netherlands
                    (referred to as "we" and "the company" in this document). The term "you" refers to the user or viewer of our website.
                </p>
                <p>
                    This policy and the terms that are contained herein govern RR Kallan's relationship with you in relation to this
                    website. Your usage of our website equates to agreement to these terms, and the corresponding{" "}
                    <Link to="/privacy-policy">privacy policy</Link>.
                </p>

                <h2>General terms</h2>
                <p>The use of this website is subject to the following terms of use:</p>

                <ul>
                    <li>
                        <p>
                            The content of the pages of this website is for your general information and use only. It is subject to change
                            without notice.
                        </p>
                    </li>
                    <li>
                        <p>
                            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance,
                            completeness or suitability of the information and materials found or offered on this website for any particular
                            purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly
                            exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                        </p>
                    </li>
                    <li>
                        <p>
                            Your use of any information or materials on this website is entirely at your own risk, for which we shall not be
                            liable. It shall be your own responsibility to ensure that any products, services or information available
                            through this website meet your specific requirements.
                        </p>
                    </li>
                    <li>
                        <p>
                            This website contains material which is owned by or licensed to us. This material includes, but is not limited
                            to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with
                            the copyright notice, which forms part of these terms and conditions.
                        </p>
                    </li>
                    <li>
                        <p>
                            All trade marks reproduced in this website which are not the property of, or licensed to, the operator are
                            acknowledged on the website.
                        </p>
                    </li>
                    <li>
                        <p>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</p>
                    </li>
                    <li>
                        <p>
                            From time to time this website may also include links to other websites. These links are provided for your
                            convenience to provide further information. They do not signify that we endorse the website(s). We have no
                            responsibility for the content of the linked website(s).
                        </p>
                    </li>
                    <li>
                        <p>
                            Your use of this website and any dispute arising out of such use of the website is subject to the laws and
                            policies of the European Union.
                        </p>
                    </li>
                </ul>
            </article>
        </section>
    );
};

export default Terms;
