import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase-client";
import { ClothingItem } from "../Homepage/items";
import Footer from "../Fixed/footer";
import SpecialOffer from "../Fixed/specialOffer";
import NavigationBar from "../Fixed/navBar";
import fetchClothing from "./itemPageData";

function ItemPage() {
  const [clothing, setClothing] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
    const style = " sm:w-[500px] w-[433px] h-[500px] m-0"

  fetchClothing(supabase, id, setClothing, setError,setLoading)


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (

    <>
    <NavigationBar/>
    <SpecialOffer/>
      <div className="overflow-hidden sm:flex justify-center items-center min-h-[70vh] max-h-[130vh]">
      {clothing && (
        <>
      <div className={`${style} border-2 border-[#4b6686] bg-cover flex items-center rounded-2xl mt-8 justify-center mx-auto sm:mx-0 sm:ml-2`}>
        <img className="w-96 max-h-[450px] object-contain" src={clothing.image} alt={clothing.name} />
      </div>
          <main className={`${style}text-xl text-center pt-[0] mx-auto sm:mx-0 sm:pt-[20vh] sm:p-10 sm:mr-2`}>
          <h1>{clothing.name}</h1>
          <p>{clothing.description}</p>
          <p>${clothing.price}</p>
          <button onClick={() => console.log("clicked")} 
          className="bg-blue-600 cursor-pointer p-2 rounded-2xl text-white">
            Add to cart</button>
          </main>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default ItemPage;