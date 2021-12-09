interface InterfaceTextarea {
    title: string;
    name: string;
    defaultValue?: string;
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
    validationTypes?: {
        [key: string]: null | { [key: string]: string | number | Array<string | number> };
    };
    errorMessage?: string;
    autoComplete?: string;
    customOnChangeHandler?: (value: string) => typeof value | void;
}

export default InterfaceTextarea;
