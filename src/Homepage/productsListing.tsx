import { useState } from "react";
import { useFavorites } from "../Favorites/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { ClothingItem } from "./itemsHome";


const ProductListing = (item : ClothingItem) => {
  const { id, name, image, coverImage, description, price, bool = false } = item;
  const [showCoverImg, setShowCoverImg] = useState(false)
  const navigate = useNavigate()

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  const handleClick = () => {
    const formattedName = name.replace(/\s+/g, "-").toLowerCase()
    navigate(`/${id}/${formattedName}`)
  };

  return (
    <div
      className={`pt-5 max-w-[250px] relative  ${bool ? "sm:w-[230px] w-[210px]" : ""} text-center h-[303px] border-2 rounded-xl border-[#4b6686] ml-[5px]
                 hover:scale-103 cursor-pointer transition-all hover:bg-[#eff2f5]`}
      onMouseEnter={() => setShowCoverImg(true)}
      onMouseLeave={() => setShowCoverImg(false)}
      onClick={handleClick}
    >
      {/* Hidden Image for Preloading */}
      <img src={coverImage} alt="" className="hidden" aria-hidden="true" />

      {/* Image Section */}
  <div
    className="relative bg-cover rounded-t-xl h-[200px] duration-300"
    style={{ backgroundImage: `url(${showCoverImg ? coverImage : image})` }}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
        favorite ? removeFromFavorites(item.id) : addToFavorites(item);
      }}
      className={`absolute top-0 right-2 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer
        ${favorite ? 'text-red-500' : 'text-black'} bg-opacity-50 ${showCoverImg ? "flex" : "hidden"}`}
    >
      <span className="material-symbols-outlined select-none">favorite</span>
    </div>
  </div>

      {/* Product Name */}
      <h1 className={`font-bold text-lg ${showCoverImg ? "text-[#FFB6A6] text-shadow-2xs text-shadow-gray-500" : "text-gray-800"}`}>
        {name}
      </h1>

      <abbr className="no-underline" title={description}>
        <h2 className="text-gray-600 truncate px-1">{description}</h2>
      </abbr>
      <p className="opacity-60">{price}$</p>
    </div>
  );
}

export default ProductListing
