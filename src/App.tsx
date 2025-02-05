import { useEffect, useState } from 'react';
import supabase from "./supabase-client"; // ✅ Ensure supabase-client is correctly imported

interface ClothingItem {
  id: string;
  name: string;
  description: string;
  price: number;
  company: string;
  fabricMaterials: string;
}

function App() {
  const [clothing, setClothing] = useState<ClothingItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClothing = async () => {
      const { data, error: supabaseError } = await supabase
        .from('Clothing')
        .select('id, name, description, price, company, "Fabric_Materials"');

      if (supabaseError) {
        console.error('Error fetching Clothing data:', supabaseError);
        setError(supabaseError.message);
        return;
      }

      setClothing(
        data?.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          company: item.company,
          fabricMaterials: item.Fabric_Materials, // ✅ No need for array conversion here
        })) || []
      );
    };

    fetchClothing();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 underline">Clothing Items</h1>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {clothing.length === 0 && !error && <p className="text-gray-500">No clothing items found</p>}
      
      <ul className="list-disc pl-5">
        {clothing.map((item) => (
          <li key={item.id} className="mb-2">
            <h2 className="font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Company: {item.company}</p>
            <p>Fabric Materials: {item.fabricMaterials}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
