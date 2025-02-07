import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from './supabase-client';

interface ClothingItem {
  id: string;   name: string;
  image: string;    coverImage: string;
  description: string;  price: number;
  company: string;  FabricMaterials: string;
}

function ItemPage() {
  const [clothing, setClothing] = useState<ClothingItem | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchClothing = async () => {
      if (id) {
        const { data } = await supabase
          .from('Clothing')
          .select('*')
          .eq('id', id)
          .single();

        if (data) {
          data.name = data.name.replace(/\s+/g, '_');
          setClothing(data);
        }
      }
    };

    fetchClothing();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Item Page</h1>
      {clothing ? (
        <div>
          <h2>{clothing.name}</h2>
          <p>{clothing.description}</p>
          <p>${clothing.price}</p>
        </div>
      ) : (
        <p>No item found</p>
      )}
    </div>
  );
}

export default ItemPage;
