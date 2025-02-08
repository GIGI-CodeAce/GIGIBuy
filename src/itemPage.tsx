import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "./supabase-client";

interface ClothingItem {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  description: string;
  price: number;
  company: string;
  FabricMaterials: string;
}

function ItemPage() {
  const [clothing, setClothing] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); // 'id' is the product name

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        if (!id) throw new Error("Invalid item name");

        const formattedName = id.replace(/-/g, " "); // Convert dashes back to spaces
        console.log("Fetching product with name:", formattedName);

        const { data, error } = await supabase
          .from("Clothing")
          .select("*")
          .ilike("name", formattedName)
          .limit(1) // ✅ Avoid multiple rows issue
          .maybeSingle(); // ✅ Avoid errors if no row is found

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
    <div>
      {clothing && (
        <>
          <h1>{clothing.name}</h1>
          <img src={clothing.image} alt={clothing.name} />
          <p>{clothing.description}</p>
          <p>${clothing.price}</p>
        </>
      )}
    </div>
  );
}

export default ItemPage;
