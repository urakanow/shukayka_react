import Logo from '@components/Logo';
import { CldImage } from 'next-cloudinary';
import styles from './styles.module.css';

function SocialMediaSection() {
    const tiktok_image = "tiktok_icon_gipkai";
    const youtube_image = "youtube_icon_iiogjg";
    const instagram_image = "instagram_icon_kq6ssd";

    return (
        <div className={styles.social_media}>
            <div className={styles.social_media_text}>
                <Logo id={styles.footer_logo} />
                <span> В СОЦ МЕРЕЖАХ</span>
            </div>

            <div className={styles.social_media_images}>
                <CldImage src={tiktok_image} alt='' width={52} height={52} />
                <CldImage src={youtube_image} alt='' width={60} height={44} />
                <CldImage src={instagram_image} alt='' width={60} height={60} />
            </div>
        </div>
     );
}

export default SocialMediaSection;