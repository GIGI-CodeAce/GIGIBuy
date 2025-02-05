import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useMemo } from 'react';

interface ClothingItem {
  id: string;
  name: string;
  description: string;
  price: number;
  company: string;
  fabricMaterials: string;
}

function App() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
  const [clothing, setClothing] = useState<ClothingItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseKey) {
      return null;
    }
    return createClient(supabaseUrl, supabaseKey);
  }, [supabaseUrl, supabaseKey]);

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        if (!supabase) {
          throw new Error('Supabase client not initialized');
        }

        const { data, error: supabaseError } = await supabase
          .from('Clothing')
          .select('id, name, description, price, company, "Fabric & Materials"');

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        setClothing(
          data?.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            company: item.company,
            fabricMaterials: item['Fabric & Materials'],
          })) || []
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        console.error('Error fetching Clothing data:', err);
      }
    };

    fetchClothing();
  }, [supabase]);

  if (!supabaseUrl || !supabaseKey) {
    return <div>Error: Supabase URL or key is missing</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 underline">Clothing Items</h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      
      {clothing.length === 0 && !error && (
        <p className="text-gray-500">No clothing items found</p>
      )}
      
      <ul className="list-disc pl-5">
        {clothing.map((item) => (
          <li key={item.id} className="mb-2">
            <h2 className="font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Company: {item.company}</p>
            <p>Fabric & Materials: {item.fabricMaterials}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;