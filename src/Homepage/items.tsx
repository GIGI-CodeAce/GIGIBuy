import { useEffect, useState } from 'react';
import supabase from "../supabase-client";
import ProductListing from "./product-listing";
import NavigationBar from '../Fixed/navBar';
import Footer from '../Fixed/footer';
import SpecialOffer from '../Fixed/specialOffer';

export interface ClothingItem {
  id: string; name: string;
  image: string;  coverImage: string;
  description: string;  price: number;
  company: string;  FabricMaterials: string;
}

function Items() {
  const [clothing, setClothing] = useState<ClothingItem[]>([]);
  const [filteredClothing, setFilteredClothing] = useState<ClothingItem[]>([]); // State for filtered items
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  useEffect(() => {
    const fetchClothing = async () => {
      const { data, error } = await supabase
        .from('Clothing')
        .select('*');

      if (error) {
        setError("Error fetching clothing data");
      } else {
        setClothing(data || []);
        setFilteredClothing(data || []); // Set initial filtered items to all clothing items
      }
    };

    fetchClothing();
  }, []);

  // Update the filtered clothing based on the search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredClothing(clothing); // If the search query is empty, show all items
    } else {
      setFilteredClothing(
        clothing.filter(item =>
          item.description.toLowerCase().includes(query.toLowerCase()) // Filter based on description
        )
      );
    }
  };

  return (
    <>
    <NavigationBar onSearch={handleSearch}/>
    <SpecialOffer/>
    <div className="container mx-auto">
      <h1 className="text-2xl text-[#4b6686] font-bold underline">Clothing Items</h1>

        {error && <p className="text-red-500">Error: {error}</p>}
        {filteredClothing.length === 0 && !error && (
          <p className="text-gray-500">No clothing items found</p>
        )}

      <div className="w-full grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 p-2
                       md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
          {filteredClothing.map((item) => (
              <ProductListing
            key={item.id}
                id={item.id}
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
      <Footer/>
    </>
  );
}

export default Items;
