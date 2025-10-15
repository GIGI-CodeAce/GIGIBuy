import { useNavigate } from "react-router-dom";
import { useFavorites } from "./FavoritesContext";
import Items from "Homepage/itemsHome";
import { useState } from "react";

function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const favoritesAmmount = favorites.length
  const navigate = useNavigate()
  const [isHovering, setIsHovering] = useState(false)


  return (
    <>
      <div className="container max-w-screen-xl text- mx-auto mb-4 p-4 min-h-[352px]">
        <h1 className="text-2xl text-[#4b6686] pb-2 font-bold underline">Your favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-gray-500 flex-col flex items-center text-center gap-1 justify-center mt-20">
          <h1 className="text-4xl">˙◠˙</h1>
          <p className="text-xl">You have no favorites yet..</p>
          <p className="text-md flex items-center gap-1 opacity-70">
            Hit the 
            <span className="material-symbols-outlined text-2xl leading-none align-middle !font-extrabold">
              favorite </span>on your favorites!</p>

        </div>
        ) : (
          <div>
            {favorites.map((item) => (
              <div onClick={(()=> navigate(`/${item.id}/${item.name}`))} key={item.id}
               className="flex justify-between items-center border-b py-4 cursor-pointer">
                <div className="flex items-center">
                    <img
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4 hover:opacity-80"
                    />
                  <div>
                      <h2 className="text-[14px] sm:text-lg font-bold hover:underline">{item.name}</h2>
                    <p className="text-sm text-[#ffac99] shadow w-20 text-shadow-2xs text-shadow-gray-500">${item.price}</p>
                  </div>
                </div>

                <button
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={(e) => {e.stopPropagation(), removeFromFavorites(item.id)}}
                  className=" bg-[#a0c4d7] hover:bg-[#7594a3] transition-all active:scale-82
                   scale-88 sm:scale-100 pt-2 pb-1 px-[14px]  h-13 rounded-[50%] text-white cursor-pointer hover:text-[#ffc5b8]"
                >
                  <span className={`material-symbols-outlined hover:${(()=> setIsHovering(true))} !text-2xl`}>{`${isHovering ? 'heart_broken' : 'favorite'}`}
                    </span></button>  </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-medium">Total:</h2>
              <p className="text-xl font-[iconic] !font-extrabold"><span className="text-[#455d7aee]">{favoritesAmmount}</span> items</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FavoritesPage
