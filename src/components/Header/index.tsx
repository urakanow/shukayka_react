"use client"
import Logo from '@/components/Logo';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import styles from './styles.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <Logo />

            <SearchBar />

            <Navigation />
        </header>
    );
}

export default Header;