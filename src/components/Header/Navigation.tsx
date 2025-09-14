import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import useApi from '@/hooks/UseApi';
import { useAuth } from '../AuthContext';
import { HamburgerMenu } from '../HamburgerMenu';
import { useRouter } from 'next/navigation';

interface NavItem{
    text: string,
    href: string
}

function Navigation() {
    const { baseUrl, accessToken } = useAuth();
    const { authorizedRequest } = useApi();
    
    const router = useRouter();
    const navItems: NavItem[] = [
        {text: "Головна", href: "/"},
        {text: "Вибрані", href: "/favorites"},
        {text: "Замовлення", href: "/my-orders"},
        {text: "Мої оголошення", href: "/my-offers"},
        {text: "Мої повідомлення", href: "/messages"},
        {text: "Продати", href: "/create-offer"},
    ]

    const favorite_image = "favorite_icon_lys5aq";
    const plus_icon_image = "plus_icon_ghmei2";
    const me_image = "me_icon_por333";
    // const admin_image = "administrator_1_1_ybwnja";
    const admin_image = "icons8-admin-settings-male-96_1_fbhqux";
    const my_orders_image = "delivery_1_p7kwam";
    const profile_image = "icons8-user-96_tw15ns";
    
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsAdmin(false)
        checkIsAdmin();
    }, [accessToken])

    return (
        <nav className={styles.nav}>
            {/* <Link href="/favorites" className={styles.nav_link}><CldImage src={favorite_image} alt='favorite image' width={28} height={24}/></Link>
            <Link href="/my-orders" className={styles.nav_link}><CldImage src={my_orders_image} alt='my orders image' width={28} height={24}/></Link>
            <Link href="/create-offer" className={`${styles.nav_link} ${styles.nav_plus}`}><CldImage src={plus_icon_image} alt='plus icon' width={20} height={20}/></Link>
            <Link href="/me" className={styles.nav_link}><CldImage src={me_image} alt='me image' width={28} height={28}/></Link> */}
            
            {accessToken ? (
                <span className={`${styles.nav_item} small-card`}>
                    <Link href={"/me"} >
                        <CldImage src={profile_image} alt='profile picture' width={32} height={32} />
                    </Link>
                </span>
             ) : (
                    <span className={`${styles.login_unauthorized} text-lg`}>
                <Link href="/auth/login">
                        Увійти
                </Link>
                    </span>
            )}

            {isAdmin && (
                <Link href="/admin-panel" className={`${styles.nav_item} ${styles.admin_nav} small-card`}><CldImage src={admin_image} alt='admin image' width={28} height={28}/></Link>
            )}
            
            <HamburgerMenu items={navItems.map((navItem) => navItem.text)} onSelect={(index) => router.push(navItems.at(index)?.href || "")} />
        </nav>
    );

    async function checkIsAdmin(){
        try{
            const response = await authorizedRequest({
                url: `${baseUrl}/admin/is-admin`,
                method: 'get',
            })

            if(response.status === 200){
                console.log("is really an admin")
                setIsAdmin(true)
            }
        } catch(err){
            console.error("is not an admin ", err)
        }
    }
}

export default Navigation;