import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import ProductListing from "./productsListing";
import NavigationBar from "../Fixed/navBar";
import Footer from "../Fixed/footer";
import SpecialOffer from "../Fixed/specialOffer";
import Categories from "../Fixed/categories";

export interface ClothingItem {
  id: number;
  name: string;
  image: string;
  coverImage: string;
  description: string;
  price: number;
  company: string;
  FabricMaterials: string;
  quantity: number;
  categories: string[];
}

function Items() {
  const [clothing, setClothing] = useState<ClothingItem[]>([]);
  const [filteredClothing, setFilteredClothing] = useState<ClothingItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem("searchQuery") || ""
  );
  setTimeout(() => {
    localStorage.removeItem("searchQuery")
  }, 100);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    localStorage.getItem("selectedCategory") || "All"
  );


  useEffect(() => {
    const fetchClothing = async () => {
      const { data, error } = await supabase.from("Clothing").select("*");
      if (error) {
        setError("Error fetching clothing data");
      } else {
        setClothing(data || []);
      }
    };

    fetchClothing();
  }, []);

  useEffect(() => {
    let filtered = clothing;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) =>
        item.categories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    if (searchQuery.trim() !== "") {
      setSelectedCategory('All')
      filtered = filtered.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClothing(filtered);
  }, [searchQuery, selectedCategory, clothing]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };


  return (
    <>
      <NavigationBar value={searchQuery} onSearch={setSearchQuery} />
      <SpecialOffer />
      <Categories selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <div className="container mx-auto mb-10">
        <h1 className="text-2xl text-[#4b6686] xl:pl-8 p-4 font-bold underline">
          Clothing Items
        </h1>

        {error && <p className="text-red-500">Error: {error}</p>}
        {filteredClothing.length === 0 && !error && (
          <p className="text-gray-500">No clothing items found</p>
        )}

        <div
          className="w-full grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 xl:pl-6 pr-[6px]
                        md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-y-4 gap-x-3"
        >
          {filteredClothing.map((item) => (
            <ProductListing
            key={item.id}
            {...item}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Items;
