import styles from './styles.module.css';

interface RegularButtonProps{
    text: string,
    className?: string,
    onClick: () => void
}

function RegularButton({ text, className, onClick }: RegularButtonProps) {
    return (
        <button className={`${styles.regular_button} ${className}`} onClick={onClick}>
            {text}
        </button>
    );
}

export default RegularButton;