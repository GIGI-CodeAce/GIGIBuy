import NavigationBar from "../Fixed/navBar";
import Footer from "../Fixed/footer";

function Checkout() {
  return (
    <>
      <NavigationBar onSearch={() => {}} />
      <div className="relative h-[60vh] bg-[#516d90] pb-10 flex items-center justify-center">
        <div className="text-center bg-[#e9c6be] w-[90%] max-w-xl p-8 rounded-lg shadow-md">
          <h1 className="text-[25px] font-bold">Oops!</h1>
          <p className="text-lg mt-2">
            This is a showcase website—purchases and deliveries are unavailable.  
            Thanks for stopping by!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
