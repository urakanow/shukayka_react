import BannerSlogan from "./BannerSlogan";
import OffersBlock from "./OffersBlock";
import styles from './page.module.css';

function OffersSection() {
    return (
        <div className={styles.offers_section}>
            <OffersBlock categoryIndex={1} />

            <div className={styles.categories_separator} />

            <OffersBlock categoryIndex={2} />

            <BannerSlogan />

            <OffersBlock categoryIndex={4} />

            <div className={styles.categories_separator} />
            
            <OffersBlock categoryIndex={0} />
        </div>
     );
}

export default OffersSection;