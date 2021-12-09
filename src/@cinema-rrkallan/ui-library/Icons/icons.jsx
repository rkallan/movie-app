import styles from "./resources/styles/icons.module.scss";
import { ReactComponent as Alert } from "./resources/svg/alert.svg";
import { ReactComponent as ArrowDown } from "./resources/svg/arrow-down.svg";
import { ReactComponent as ArrowLeft } from "./resources/svg/arrow-left.svg";
import { ReactComponent as ArrowRight } from "./resources/svg/arrow-right.svg";
import { ReactComponent as ArrowUp } from "./resources/svg/arrow-up.svg";
import { ReactComponent as Chat } from "./resources/svg/chat.svg";
import { ReactComponent as Clock } from "./resources/svg/clock.svg";
import { ReactComponent as Confirm } from "./resources/svg/confirm.svg";
import { ReactComponent as Email } from "./resources/svg/email.svg";
import { ReactComponent as Help } from "./resources/svg/help.svg";
import { ReactComponent as Hint } from "./resources/svg/hint.svg";
import { ReactComponent as Home } from "./resources/svg/home.svg";
import { ReactComponent as Loading } from "./resources/svg/loading.svg";
import { ReactComponent as Logout } from "./resources/svg/logout.svg";
import { ReactComponent as Password } from "./resources/svg/password.svg";
import { ReactComponent as Phone } from "./resources/svg/phone.svg";
import { ReactComponent as Search } from "./resources/svg/search.svg";
import { ReactComponent as Submit } from "./resources/svg/submit.svg";
import { ReactComponent as Trash } from "./resources/svg/trash.svg";
import { ReactComponent as User } from "./resources/svg/user.svg";
import { ReactComponent as SendEmail } from "./resources/svg/send-email.svg";
import { ReactComponent as SendIMMessage } from "./resources/svg/send-message.svg";

const icons = {
    accesspoints: (props) => {
        return <Phone className={styles.icon} {...props} />;
    },
    alert: (props) => {
        return <Alert className={styles.icon} {...props} />;
    },
    arrowDown: (props) => {
        return <ArrowDown className={styles.icon} {...props} />;
    },
    arrowLeft: (props) => {
        return <ArrowLeft className={styles.icon} {...props} />;
    },
    arrowRight: (props) => {
        return <ArrowRight className={styles.icon} {...props} />;
    },
    arrowUp: (props) => {
        return <ArrowUp className={styles.icon} {...props} />;
    },
    back: (props) => {
        return <ArrowLeft className={styles.icon} {...props} />;
    },
    chat: (props) => {
        return <Chat className={styles.icon} {...props} />;
    },
    clock: (props) => {
        return <Clock className={styles.icon} {...props} />;
    },
    confirm: (props) => {
        return <Confirm className={styles.icon} {...props} />;
    },
    email: (props) => {
        return <Email className={styles.icon} {...props} />;
    },
    home: (props) => {
        return <Home className={styles.icon} {...props} />;
    },
    help: (props) => {
        return <Help className={styles.icon} {...props} />;
    },
    hint: (props) => {
        return <Hint className={styles.icon} {...props} />;
    },
    loading: (props) => {
        return <Loading className={styles.icon} {...props} />;
    },
    logout: (props) => {
        return <Logout className={styles.icon} {...props} />;
    },
    password: (props) => {
        return <Password className={styles.icon} {...props} />;
    },
    phone: (props) => {
        return <Phone className={styles.icon} {...props} />;
    },
    queues: (props) => {
        return <Clock className={styles.icon} {...props} />;
    },
    search: (props) => {
        return <Search className={styles.icon} {...props} />;
    },
    submit: (props) => {
        return <Submit className={styles.icon} {...props} />;
    },
    start: (props) => {
        return <Submit className={styles.icon} {...props} />;
    },
    trash: (props) => {
        return <Trash className={styles.icon} {...props} />;
    },
    user: (props) => {
        return <User className={styles.icon} {...props} />;
    },
    fallback: (props) => {
        return <Hint className={styles.icon} {...props} />;
    },

    sendemail: (props) => {
        return <SendEmail className={styles.icon} {...props} />;
    },
    sendimmessage: (props) => {
        return <SendIMMessage className={styles.icon} {...props} />;
    },
};

export default icons;
