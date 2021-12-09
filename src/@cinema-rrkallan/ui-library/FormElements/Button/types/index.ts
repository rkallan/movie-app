import { ReactNode } from "react";

interface InterfaceButton {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default InterfaceButton;
