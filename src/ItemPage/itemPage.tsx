// ItemPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../shoppingCart/cartContext";
import useFetchClothing from "./itemPageData";
import { ClothingItem } from "../Homepage/items";
import supabase from "../supabase-client";
import NavigationBar from "../Fixed/navBar";
import Footer from "../Fixed/footer";
import SpecialOffer from "../Fixed/specialOffer";

function ItemPage() {
  const { cart, addToCart } = useCart();
  const [clothing, setClothing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id, name } = useParams();
  

  useFetchClothing(supabase, id, name, setClothing, setError, setLoading);

  const handleAddToCart = () => {
    if (clothing) {
      const cartItem: ClothingItem = {
        ...clothing, 
      };
  
      addToCart(cartItem);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <NavigationBar onSearch={() => {}} />
      <SpecialOffer />
      <div className="overflow-hidden sm:flex justify-center items-center min-h-[70vh] max-h-[130vh]">
        {clothing && (
          <>
            <div
              className="max-w-[470px] max-h-[500px] min-h-[400px] mt-8 border-2 bg-center bg-contain bg-no-repeat transition-all border-[#4b6686] 
                flex items-center rounded-2xl p-20 justify-center mx-auto sm:mx-0 sm:ml-2"
              onMouseEnter={() => setImage(true)}
              onMouseLeave={() => setImage(false)}
              style={{ backgroundImage: `url(${image ? clothing.coverImage : clothing.image})` }}
            >
              <img
                className="w-96 max-h-[450px] object-contain opacity-0"aria-hidden="true"src={clothing.image}alt={clothing.name}/>
            </div>
            <main className="max-w-[500px] sm:text-xl text-md text-center pt-[0] mx-auto sm:mx-0 sm:pt-[20vh] mt-0 sm:mt-8 sm:p-10 sm:mr-2">
              <h1 className="font-bold sm:text-md text-xl w-[180px] mx-auto">{clothing.name}</h1>
              <p>{clothing.description}</p>
              <p className="text-[#FFB6A6] mx-auto rounded-xl w-16 shadow-xl">${clothing.price}</p><br /><br />
              <button
                onClick={handleAddToCart}
                className="text-[#ffd5cc] w-40 cursor-pointer bg-[#a0c4d7] hover:bg-[#90bad0] active:bg-[#7eaec9] p-2 rounded-2xl"
              >
                Add to cart
              </button>
              <section className="text-[17px]/[18px] font-light mt-14">
                <h1 className="font-medium underline text-[#7eaec9] decoration-[#FFB6A6]">About the product</h1>
                <p>Materials: {clothing.FabricMaterials}</p>
                <p>Brand: {clothing.company}</p>
              </section>
            </main>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ItemPage;
