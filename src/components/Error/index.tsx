import styles from './styles.module.css';
import typography from '@styles/typography.module.css';

interface ErrorProps {
    text: string
}

function Error({ text }: ErrorProps) {
    return (
        <span className={`${typography.small_text} ${styles.error_text}`}>{text}</span>
    );
}

export default Error;