import { CldImage } from "next-cloudinary";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface AuthInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string,
    cldImg: string,
    minLength?: number,
    maxLength?: number,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function AuthInputField({ type, cldImg, minLength, maxLength, placeholder, onChange, ...inputProps }: AuthInputFieldProps) {
    return (
        <div className="auth_input_wrapper horizontal_container">
            <div className="auth_input_image_wrapper vertical_container">
                <CldImage src={cldImg} alt="" width={70} height={70} />
            </div>
            
            <input className="text_input auth_input auth_medium_heading"
            type={type} required
            minLength={minLength} maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            {...inputProps}
            />
        </div>
    );
}

export default AuthInputField;