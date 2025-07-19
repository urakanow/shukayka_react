import { CldImage } from "next-cloudinary";
import styles from './page.module.css';
import typography from '@/styles/typography.module.css';

function BannerSlogan() {
    const image = "banner_image_airpods_jdwkao";

    return (
        <div className={styles.banner_slogan}>
            <CldImage src={image} alt="" width={384} height={422} />
            <span className={`${typography.large} ${styles.banner_slogan_span}`}>
                Пошук і продаж без зайвого клопоту —<br />
                усе, що потрібно, в одному місці.
            </span>
        </div>
     );
}

export default BannerSlogan;