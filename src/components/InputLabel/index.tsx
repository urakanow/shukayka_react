interface InputLabelProps {
    htmlFor: string,
    text: string,
    id?: string
}

function InputLabel({ htmlFor, text, id }: InputLabelProps) {
    return (
        <label className={`label`} id={id} htmlFor={htmlFor}><small>{text}</small></label>
    );
}

export default InputLabel;