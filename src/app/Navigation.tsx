// import { AdvancedImage } from '@cloudinary/react';
import Link from 'next/link';
import { useContext } from 'react';
// import { useAuth } from '../../Shared/AuthContext/AuthContext';

function Navigation() {
    // const { cld } = useAuth();
    // const favorite_image = cld.image("favorite_icon_lys5aq");
    // const plus_icon_image = cld.image("plus_icon_ghmei2")
    // const me_image = cld.image("me_icon_por333")

    return (
        <nav>
            {/* <Link href="/favorites"><AdvancedImage cldImg={favorite_image}/></Link>
            <Link href="/create-offer" id='nav_plus'><AdvancedImage cldImg={plus_icon_image}/></Link>
            <Link href="/me"><AdvancedImage cldImg={me_image}/></Link> */}
            <h1>navigation</h1>
        </nav>
     );
}

export default Navigation;