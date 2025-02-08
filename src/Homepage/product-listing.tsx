import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductListing(props: any) {
  const [showCoverImg, setShowCoverImg] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedName = props.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${formattedName}`);
  };

  return (
    <div
      className="pt-5 w-56 text-center ml-0 flex-1 min-w-[250px] h-[305px] border-2 rounded-xl border-[#4b6686] m-[5px]
                 hover:scale-97 cursor-pointer transition-all hover:bg-[#eff2f5]"
      onMouseEnter={() => setShowCoverImg(true)}
      onMouseLeave={() => setShowCoverImg(false)}
      onClick={handleClick}
    >
      <img src={props.coverImage} alt="" className="hidden" aria-hidden="true" />

      <div
        className="bg-cover rounded-t-xl h-[200px] transition-all duration-300"
        style={{
          backgroundImage: `url(${showCoverImg ? props.coverImage : props.image})`,
        }}
      ></div>

      <h1 className="font-bold text-lg">{props.name}</h1>
      <h2 className="text-gray-600">{props.description}</h2>
      <span className="text-sm">{props.FabricMaterials}</span>
      <p className="opacity-60">{props.price}$</p>
    </div>
  );
}

export default ProductListing;
