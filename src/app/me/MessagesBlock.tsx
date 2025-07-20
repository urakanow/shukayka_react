import Message from './Message';
import styles from './page.module.css'
import typography from '@/styles/typography.module.css';

function MessagesBlock() {
    // const profile_picture = "profile_picture_default_icon_t9kx9b";

    return (
        <div className={`${styles.messages} green_rectangle vertical_container`}>
            <h1 className={typography.semi_large}>Повідомлення</h1>
            <Message unread/>

            <Message unread/>

            <Message />

            <Message />

            <Message />
        </div>
     );
}

export default MessagesBlock;