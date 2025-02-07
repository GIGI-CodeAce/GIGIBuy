import { useEffect, useState } from 'react';
import supabase from "../supabase-client";
import ProductListing from "./product-listing";

// Interface matches Supabase data directly
interface ClothingItem {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  description: string;
  price: number;
  company: string;
  FabricMaterials: string; // Match the exact Supabase field name
}

function Items() {
  const [clothing, setClothing] = useState<ClothingItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClothing = async () => {
      const { data, error: supabaseError } = await supabase
        .from('Clothing')
        .select('id, name, image, coverImage, description, price, company, "FabricMaterials"');

      if (supabaseError) {
        console.error('Error fetching Clothing data:', supabaseError);
        setError(supabaseError.message);
        return;
      }

      // Directly set the data without mapping
      setClothing(data || []);
    };

    fetchClothing();
  }, []);

  return (
    <div className="container mx-auto mb-4">
      <h1 className="text-2xl text-[#4b6686] font-bold mb-4 underline p-4">Clothing Items</h1>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {clothing.length === 0 && !error && (
        <p className="text-gray-500">No clothing items found</p>
      )}

      <div className="p-2 w-full flex flex-wrap justify-between">
        {clothing.map((item) => (
          <ProductListing
            key={item.id}
            name={item.name}
            image={item.image}
            coverImage={item.coverImage}
            price={item.price}
            description={item.description}
            fabricMaterials={item.FabricMaterials}
          />
        ))}
      </div>
    </div>
  );
}

export default Items;
