import { ChangeEvent, forwardRef, Ref } from "react";
import InputLabel from "../InputLabel";

interface TextInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
    value?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    id: string,
    label: string,
    defaultValue?: string,
}

// function TextInputField({ value, onChange, id, label, defaultValue, ...inputProps }: TextInputFieldProps) {
//     return (
//         <>
//             <InputLabel htmlFor={id} text={label} />
            
//             <input required type="text"
//             className="text_input"
//             id={id}
//             defaultValue={defaultValue}
//             value={value}
//             onChange={onChange}
//             {...inputProps}
//             />
//         </>
//     );
// }
const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  ({ value, onChange, id, label, defaultValue, ...inputProps }, ref) => {
    return (
      <div className="field_small_container">
        <InputLabel htmlFor={id} text={label} />
        <input
          required
          type="text"
          className="input small-card"
          id={id}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          ref={ref}
          {...inputProps}
        />
      </div>
    );
  }
);

export default TextInputField;