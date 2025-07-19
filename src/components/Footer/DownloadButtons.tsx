import { CldImage } from 'next-cloudinary';
import styles from './styles.module.css';

function DownloadButtons() {
    const google_play_image = "google_play_icon_zxnsjp";
    const app_store_image = "app_store_icon_exsbm3";

    return (
        <div className={styles.download_buttons}>
            <CldImage src={google_play_image} alt='' width={292} height={84}/>
            <CldImage src={app_store_image} alt='' width={292} height={84}/>
        </div>
     );
}

export default DownloadButtons;