import { useEffect, useState } from "react";
import supabase from "../supabase-client";
import ProductListing from "./productsListing";
import Categories from "./categories";
import { useOutletContext } from "react-router-dom";

type ContextType = { searchQuery: string }

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
  const [clothing, setClothing] = useState<ClothingItem[]>([])
  const [filteredClothing, setFilteredClothing] = useState<ClothingItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const { searchQuery } = useOutletContext<ContextType>()
  const [loading, setLoading]=useState(true)

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
        setClothing(data || [])
      }
    };

      setTimeout(() => {
            setLoading(false)
      }, 1000)

    fetchClothing()
  }, []);

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

    setFilteredClothing(filtered)
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
      <Categories
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
            <div className="container mx-auto mb-10 min-h-[300px] transition-all">
        <h1 className="text-2xl text-[#4b6686] xl:pl-8 p-4 font-bold underline">
          Clothing Items
        </h1>

        {error && <p className="text-red-500">Error: {error}</p>}
        {filteredClothing.length === 0 && !error && (
          !loading ? (
            <div className="text-gray-500 flex-col text-center justify-center m-30">
              <h1 className="text-4xl">˙◠˙</h1>
              <p className="text-xl">No clothing items found</p>
            </div>
          ) : (
            <div className="text-gray-500 flex-col text-center justify-center m-30">
              <span className="material-symbols-outlined animate-spin !text-3xl">autorenew</span>
              <p className="text-xl opacity-60 animate-pulse">Loading...</p>
            </div>
          )
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
    </>
  );
}

export default Items
