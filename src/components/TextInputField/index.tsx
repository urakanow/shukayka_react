import { ChangeEvent } from "react";
import InputLabel from "../InputLabel";

interface TextInputFieldProps {
    value?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    id: string,
    label: string,
    defaultValue?: string
}

function TextInputField({ value, onChange, id, label, defaultValue }: TextInputFieldProps) {
    return (
        <>
            <InputLabel htmlFor={id} text={label} />
            
            <input required type="text"
            className="text_input"
            id={id}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            />
        </>
    );
}

export default TextInputField;