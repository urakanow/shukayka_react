import styles from './styles.module.css';

interface RegularSubmitProps{
    text: string,
    className?: string,
}

function RegularSubmit({ text, className }: RegularSubmitProps) {
    return (
        <input type='submit' className={`primary-button ${className}`} value={text} />
    );
}

export default RegularSubmit;