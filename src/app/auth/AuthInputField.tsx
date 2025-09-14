import { CldImage } from "next-cloudinary";
import { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./page.module.css";

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
        <div className={styles.input_field}>
            {/* <div className={styles.input_field_image_wrapper}>
                <CldImage src={cldImg} alt="" width={48} height={48} />
            </div> */}
            
            <input className={`${styles.input} small-card`}
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