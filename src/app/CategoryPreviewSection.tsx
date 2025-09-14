import Link from "next/link";
import CategoryPreview from "./CategoryPreview";
import styles from './page.module.css';

function CategoryPreviewSection() {
    return (
        <div className={styles.categories_section}>
            <Link href={`/categories/${0}`}>
                <CategoryPreview imgUrl="furniture_icon_kgmrrx" categoryName="Меблі" />
            </Link>
            
            <Link href={`/categories/${1}`}>
                {/* <CategoryPreview imgUrl="electronics_icon_sgujlx" categoryName="Електроніка" styleId={styles.electronics} /> */}
                <CategoryPreview imgUrl="electronics_icon_sgujlx" categoryName="Електроніка" />
            </Link>
            
            <Link href={`/categories/${2}`}>
                <CategoryPreview imgUrl="fashion_icon_ixxhbh" categoryName="Мода" />
            </Link>

            <Link href={`/categories/${3}`}>
                <CategoryPreview imgUrl="work_icon_apknda" categoryName="Робота" />
            </Link>
            
            <Link href={`/categories/${4}`}>
                <CategoryPreview imgUrl="toys_icon_d203tx" categoryName="Іграшки" />
            </Link>

            <Link href={`/categories/${5}`}>
                <CategoryPreview imgUrl="car_icon_qyc5mi" categoryName="Авто" />
            </Link>

            <Link href={`/categories/${6}`}>
                <CategoryPreview imgUrl="pets_icon_xjqsnq" categoryName="Тварини" />
            </Link>

            <Link href={`/categories/${7}`}>
                {/* <CategoryPreview imgUrl="real_estate_icon_gvhzkj" categoryName="Нерухомість" styleId={styles.real_estate} /> */}
                <CategoryPreview imgUrl="real_estate_icon_gvhzkj" categoryName="Нерухомість" />
            </Link>
        </div>
     );
}

export default CategoryPreviewSection;