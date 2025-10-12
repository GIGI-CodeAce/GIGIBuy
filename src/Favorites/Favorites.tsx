import { useCart } from "../shoppingCart/cartContext"; 
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
  const { cart, removeFromCart } = useCart();
  const cartAmmount = cart.length
  const navigate = useNavigate()

  const handleRemove = (id: string | number) => {
    removeFromCart(Number(id)); 
  };

  return (
    <>
      <div className="container max-w-screen-xl text- mx-auto mb-4 p-4 min-h-[352px]">
        <h1 className="text-2xl text-[#4b6686] pb-2 font-bold underline">Your favorites</h1>

        {cart.length === 0 ? (
          <div className="text-gray-500 flex-col text-center justify-center mt-20">
          <h1 className="text-4xl">˙◠˙</h1>
          <p className="text-xl">Your cart is empty</p>
        </div>
        ) : (
          <div>
            {cart.map((item) => (
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
                    <p className="text-sm text-[#ffac99] shadow w-20">${item.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-4 bg-[#a0c4d7] scale-88 sm:scale-100 p-2 rounded-[500px] text-white cursor-pointer hover:text-[#ffc5b8]"
                >
                  <span className="material-symbols-outlined !text-2xl">favorite</span></button>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-medium">Total:</h2>
              <p className="text-xl font-bold">{cartAmmount} items</p>
            </div>

            {/* <div className="mt-4 text-center">
              <Link to="/checkout">
                <button className="px-6 py-2 rounded-lg rounded-b-3xl text-white bg-[#a0c4d7] hover:bg-[#90bad0] active:bg-[#7eaec9] hover:text-[#ffc5b8] cursor-pointer" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </Link>
            </div> */}
          </div>
        )}
      </div>
    </>
  );
}

export default FavoritesPage
