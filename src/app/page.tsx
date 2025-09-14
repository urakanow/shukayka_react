"use client"
import Slogan from "./Slogan";
import CategoryPreviewSection from "./CategoryPreviewSection";
import OffersSection from "./OffersSection";
import BannerSlogan from "./BannerSlogan";
import OffersBlock from "./OffersBlock";

function Home() {
  return (
    <>
        {/* <Slogan /> */}

        <CategoryPreviewSection />

        {/* <OffersSection /> */}

        <OffersBlock categoryIndex={1} />

        <OffersBlock categoryIndex={2} />

        <BannerSlogan />

        <OffersBlock categoryIndex={4} />

        <OffersBlock categoryIndex={0} />
    </>
  );
}

export default Home;