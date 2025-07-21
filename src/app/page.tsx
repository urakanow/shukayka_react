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
<Route path='/create-offer' element={
  <ProtectedRoute>
    <CreateOfferPage />
  </ProtectedRoute>
} />
<Route path='/favorites' element={
  <ProtectedRoute>
    <FavoritesPage />
  </ProtectedRoute>
} />
<Route path='/my-offers' element={
  <ProtectedRoute>
    <MyOffersPage />
  </ProtectedRoute>
} />
<Route path='/my-offer/:id' element={
  <ProtectedRoute>
    <CreateOfferPage />
  </ProtectedRoute>
} />
<Route path='/category/:categoryIndex' element={<CategoryPage />} />
<Route path='/search' element={<SearchPage />} />  */}