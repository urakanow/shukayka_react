interface InputLabelProps {
    htmlFor: string,
    text: string,
    id?: string
}

function InputLabel({ htmlFor, text, id }: InputLabelProps) {
    return (
        <label id={id} className="text_input_label" htmlFor={htmlFor}>{text}</label>
    );
}

export default InputLabel;