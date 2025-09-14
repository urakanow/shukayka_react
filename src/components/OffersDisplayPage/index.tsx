import { ReactNode } from "react";
import styles from './styles.module.css';
import typography from '@/styles/typography.module.css';

interface OfferDisplayPageProps {
    title: string,
    children: ReactNode
}

function OffersDisplayPage({ title, children }: OfferDisplayPageProps) {
    return (
        <div className={styles.offers_display_page}>
            <h1 className={typography.large}>{title}</h1>
            {children}
        </div>
    );
}

export default OffersDisplayPage;