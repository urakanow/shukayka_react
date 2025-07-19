import styles from './styles.module.css';

function FAQSection() {
    return (
        <div className={styles.faq}>
            <div className={styles.faq_column}>
                <span className={styles.faq_column_span}>Допомога та зворотній зв'язок</span>
                <span className={styles.faq_column_span}>Платні послуги</span>
                <span className={styles.faq_column_span}>Умови користування</span>
                <span className={styles.faq_column_span}>Політика конфідеційності</span>
                <span className={styles.faq_column_span}>Реклама на сайті</span>
            </div>

            <div className={styles.faq_column}>
                <span className={styles.faq_column_span}>Правила безпеки</span>
                <span className={styles.faq_column_span}>Карта сайту</span>
                <span className={styles.faq_column_span}>Популярні запити</span>
                <span className={styles.faq_column_span}>Як продавати й купувати</span>
                <span className={styles.faq_column_span}>Доставка</span>
            </div>
        </div>
    );
}

export default FAQSection;