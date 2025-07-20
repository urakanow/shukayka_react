import { CldImage } from "next-cloudinary";
import styles from './page.module.css';
import typography from '@styles/typography.module.css';

interface MessageProps {
    unread?: boolean
}

function Message({ unread = false }: MessageProps) {
    const profile_picture = "profile_picture_default_icon_t9kx9b";

    return (
        <div className={`${styles.message} ${unread && styles.unread_message} horizontal_container`} style={{zIndex: 5}}>
            {unread && <div className={styles.unread_marker} />}

            <div className="horizontal_container">
                <CldImage src={profile_picture} alt="" height={60} width={60}/>
                <h3 className={typography.small}>Євгеній</h3>
            </div>

            <span className={typography.small_text}>Активний 3 г. тому</span>
        </div>
    );
}

export default Message;