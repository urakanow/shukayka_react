"use client"
import Slogan from "./Slogan";
import CategoryPreviewSection from "./CategoryPreviewSection";
import OffersSection from "./OffersSection";

function Home() {
  return (
    <>
        <Slogan />

        <CategoryPreviewSection />

        <OffersSection />
    </>
  );
}

export default Home;

{/*
<Route path='/search' element={<SearchPage />} />  */}