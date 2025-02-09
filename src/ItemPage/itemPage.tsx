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
  const [image, setImage] = useState(false)
    const style = " sm:w-[500px] w-[433px] h-[500px] mt-8"

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
    <div
  className={`${style} border-2 bg-center bg-contain bg-no-repeat transition-all border-[#4b6686] 
            flex items-center rounded-2xl justify-center mx-auto sm:mx-0 sm:ml-2`}
      onMouseEnter={() => setImage(true)}
      onMouseLeave={() => setImage(false)}
      style={{ backgroundImage: `url(${image ? clothing.coverImage : clothing.image})` }}>
      <img
      className="w-96 max-h-[450px] object-contain opacity-0" aria-hidden="true"
      src={clothing.image}alt={clothing.name}
      />
  </div>
          <main className={`${style}text-xl text-center pt-[0] mx-auto sm:mx-0 sm:pt-[20vh] mt-0 sm:mt-8 sm:p-10 sm:mr-2`}>
          <h1 className="text-3xl font-medium">{clothing.name}</h1>
          <p>{clothing.description}</p>
          <p className="text-[#FFB6A6] mx-auto rounded-xl w-16 shadow-xl">${clothing.price}</p><br/><br/>
          <button onClick={() => console.log("clicked")} 
          className="bg-[#a0c4d7] text-[#ffd5cc] w-40 cursor-pointer hover:bg-[#90bad0] active:bg-[#7eaec9] p-2 rounded-2xl">
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