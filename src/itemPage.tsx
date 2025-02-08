import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "./supabase-client";
import { ClothingItem } from "./Homepage/items";
import Footer from "./Fixed/footer";
import SpecialOffer from "./Fixed/specialOffer";
import NavigationBar from "./Fixed/navBar";

function ItemPage() {
  const [clothing, setClothing] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        if (!id) throw new Error("Invalid item name");

        const formattedName = id.replace(/-/g, " ");
        console.log("Fetching product with name:", formattedName);

        const { data, error } = await supabase
          .from("Clothing")
          .select("*")
          .ilike("name", formattedName)
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Item not found");

        setClothing(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };

    fetchClothing();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (

    <>
    <NavigationBar/>
    <SpecialOffer/>
      <div className="overflow-hidden z-10 w-auto flex justify-center items-center h-[90vh]">
      {clothing && (
        <>
      <div className="border-2 w-[500px] h-[500px] bg-cover flex items-center justify-center">
        <img className="w-96 max-h-[450px] object-contain" src={clothing.image} alt={clothing.name} />
      </div>
          <main className="text-xl text-center pt-[20vh] border-2 w-[500px] h-[500px] p-10">
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