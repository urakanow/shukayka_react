"use client"
import Description from './Description';
import DownloadButtons from './DownloadButtons';
import FAQSection from './FAQSection';
import SocialMediaSection from './SocialMediaSection';
import styles from './styles.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <Description />

            <SocialMediaSection />

            <FAQSection />

            <DownloadButtons />
        </footer>
    );
}

export default Footer;