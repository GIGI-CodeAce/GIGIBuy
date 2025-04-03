import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import ProductListing from "./productsListing";
import NavigationBar from "../FixedOnPage/navBar";
import Footer from "../FixedOnPage/footer";
import SpecialOffer from "../FixedOnPage/specialOffer";
import Categories from "./categories";

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
  bool: boolean;
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

  // Fetch clothing items from Supabase
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

  // Filter clothing items based on search and category
  useEffect(() => {
    let filtered = clothing;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) =>
        item.categories.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    if (searchQuery.trim() !== "") {
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

  useEffect(() => {
    return () => {
      localStorage.removeItem("searchQuery");
    };
  }, []);

  return (
    <>
      <NavigationBar value={searchQuery} onSearch={setSearchQuery} />
      <SpecialOffer />
      <Categories
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
            <div className="container mx-auto mb-10 min-h-[300px]">
        <h1 className="text-2xl text-[#4b6686] xl:pl-8 p-4 font-bold underline">
          Clothing Items
        </h1>

        {error && <p className="text-red-500">Error: {error}</p>}
        {filteredClothing.length === 0 && !error && (
          <div className="text-gray-500 flex-col text-center justify-center mt-20">
            <h1 className="text-4xl">˙◠˙</h1>
            <p className="text-xl">No clothing items found</p>
          </div>
        )}

        <div
          className="w-full grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 xl:pl-6 pr-[6px]
                        md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-y-4 gap-x-3"
        >
          {filteredClothing.map((item) => (
            <ProductListing key={item.id} {...item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Items;
