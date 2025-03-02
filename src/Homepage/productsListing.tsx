import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  id: number;
  name: string;
  image: string;
  coverImage: string;
  description: string;
  price: number;
  bool?: boolean;
}

function ProductListing({ id, name, image, coverImage, description, price, bool = false }: ProductProps) {
  const [showCoverImg, setShowCoverImg] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedName = name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${id}/${formattedName}`);
  };

  return (
    <div
      className={`pt-5 max-w-[250px]  ${bool ? "sm:w-[230px] w-[210px]" : ""} text-center h-[303px] border-2 rounded-xl border-[#4b6686] ml-[5px]
                 hover:scale-103 cursor-pointer transition-all hover:bg-[#eff2f5]`}
      onMouseEnter={() => setShowCoverImg(true)}
      onMouseLeave={() => setShowCoverImg(false)}
      onClick={handleClick}
    >
      {/* Hidden Image for Preloading */}
      <img src={coverImage} alt="" className="hidden" aria-hidden="true" />

      {/* Image Section */}
      <div
        className="bg-cover rounded-t-xl h-[200px] duration-300"
        style={{ backgroundImage: `url(${showCoverImg ? coverImage : image})` }}
      >
        <div className={`justify-end p-4 pt-0 ${showCoverImg ? "flex" : "hidden"}`}>
          <span className="material-symbols-outlined">favorite</span>
        </div>
      </div>

      {/* Product Name */}
      <h1 className={`font-bold text-lg ${showCoverImg ? "text-[#FFB6A6]" : "text-gray-800"}`}>
        {name}
      </h1>

      <abbr className="no-underline" title={description}>
        <h2 className="text-gray-600 truncate px-1">{description}</h2>
      </abbr>
      <p className="opacity-60">{price}$</p>
    </div>
  );
}

export default ProductListing;
