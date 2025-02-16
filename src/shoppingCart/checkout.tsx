import NavigationBar from "../Fixed/navBar";
import Footer from "../Fixed/footer";
import { useState } from "react";

function Checkout() {
    const [searchText, setSearchText] = useState<string>(localStorage.getItem("searchQuery") || "");
  return (
    <>
            <NavigationBar value={searchText} 
                            onSearch={(query) => {setSearchText(query);
                            localStorage.setItem("searchQuery", query);
                            }}/>
      <div className="relative h-[60vh] pb-10 flex items-center justify-center">
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
