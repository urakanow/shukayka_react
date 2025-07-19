import { CldImage } from "next-cloudinary";
import styles from './page.module.css';
import typography from '@/styles/typography.module.css';

function Slogan() {
    const image = "top_slogan_image_rebaxd";
    
    return (
        <div className={`${styles.top_slogan} top_slogan`}>{/*for the selector in globals.css*/}
            <span className={`${typography.large} ${styles.top_slogan_span}`}>
                Купуй вигідно, продавай зручно<br />
                — тут зустрічаються можливості
            </span>

            <CldImage src={image} alt="" width={592} height={431} />
        </div>
     );
}

export default Slogan;