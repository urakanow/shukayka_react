import styles from './styles.module.css';

interface RegularButtonProps{
    text: string,
    id?: string,
    onClick: () => void
}

function RegularButton({ text, id, onClick }: RegularButtonProps) {
    return (
        <button className={styles.regular_button} onClick={onClick} id={id}>
            {text}
        </button>
    );
}

export default RegularButton;