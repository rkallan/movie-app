/* eslint-disable @typescript-eslint/no-explicit-any */
interface InterfaceInputfieldText {
    title: string;
    name: string;
    defaultValue?: string | number;
    type?: "text" | "number" | "email" | "hidden" | "password" | "search" | "tel" | "url";
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
    validationTypes?: {
        [key: string]: null | { [key: string]: string | number | Array<string | number> };
    };
    errorMessage?: string;
    autoComplete?: string;
    max?: number | undefined;
    min?: number | undefined;
    step?: number | undefined;
    customOnChangeHandler?: (value: any) => typeof value | void;
    clearValue?: boolean;
}

export default InterfaceInputfieldText;
