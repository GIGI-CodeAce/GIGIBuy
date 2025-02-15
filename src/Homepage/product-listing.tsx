import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductListing(props: any) {
  const [showCoverImg, setShowCoverImg] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedName = props.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${props.id}/${formattedName}`);
  };

  return (
    <div
      className="pt-5 max-w-[250px] text-center h-[303px] border-2 rounded-xl border-[#4b6686] ml-[5px]
                 hover:scale-103 cursor-pointer transition-all hover:bg-[#eff2f5] "
      onMouseEnter={() => setShowCoverImg(true)}
      onMouseLeave={() => setShowCoverImg(false)}
      onClick={handleClick}
    >
      <img src={props.coverImage} alt="" className="hidden" aria-hidden="true" />
      <div
        className="bg-cover rounded-t-xl h-[200px] duration-300"
        style={{
          backgroundImage: `url(${showCoverImg ? props.coverImage : props.image})`,
        }}>
          <div className={`justify-end p-4 pt-0 ${showCoverImg ? 'flex' : 'hidden'}`}><span className="material-symbols-outlined">favorite</span></div>
        </div>


<h1
  className={`font-bold text-lg ${showCoverImg ? 'text-[#FFB6A6]' : 'text-gray-800'} hover:text-[${showCoverImg ? '#FFB6A6' : 'white'}]`}
>
  {props.name}
</h1>
      <h2 className="text-gray-600 truncate ...  pl-1 pr-1">{props.description}</h2>
      <span className="text-sm">{props.FabricMaterials}</span>
      <p className="opacity-60">{props.price}$</p>
    </div>
  );
}

export default ProductListing;
