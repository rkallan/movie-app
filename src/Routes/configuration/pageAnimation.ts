import { config } from "react-spring";

const pageAnimation = {
    from: {
        position: "absolute",
        left: "-150%",
        opacity: 1,
    },
    enter: {
        position: "relative",
        left: "0%",
        opacity: 1,
    },
    leave: {
        position: "absolute",
        left: "200%",
        opacity: 0,
    },
    onChange: (): void => {
        window.scrollTo(0, 0);
    },
    config: config.default,
};

export default pageAnimation;
