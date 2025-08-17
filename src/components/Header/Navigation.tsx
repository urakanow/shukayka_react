import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import styles from './styles.module.css';

function Navigation() {
    const favorite_image = "favorite_icon_lys5aq";
    const plus_icon_image = "plus_icon_ghmei2";
    const me_image = "me_icon_por333";
    const admin_image = "administrator_1_1_ybwnja";

    return (
        <nav className={styles.nav}>
            <Link href="/favorites" className={styles.nav_link}><CldImage src={favorite_image} alt='favorite image' width={28} height={24}/></Link>
            <Link href="/create-offer" className={`${styles.nav_link} ${styles.nav_plus}`}><CldImage src={plus_icon_image} alt='plus icon' width={20} height={20}/></Link>
            <Link href="/me" className={styles.nav_link}><CldImage src={me_image} alt='me image' width={28} height={28}/></Link>
            <Link href="/admin-panel" className={styles.nav_link}><CldImage src={admin_image} alt='admin image' width={28} height={28}/></Link>
        </nav>
     );
}

export default Navigation;