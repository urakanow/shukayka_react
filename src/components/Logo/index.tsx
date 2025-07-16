import Link from 'next/link';
import styles from './styles.module.css';

function Logo({ id="" }) {
    return (
        <Link href="/" className={styles.logo_nav_link}>
            <span className={`${styles.logo} ${id || undefined}`}>
                <span className={styles.gradient_part}>ШУКАЙ</span>
                <span className={styles.green_part}>КА</span>
            </span>
        </Link>
     );
}

export default Logo;