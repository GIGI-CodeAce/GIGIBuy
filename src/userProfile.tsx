import { useState } from "react";
import Footer from "./Fixed/footer";
import NavigationBar from "./Fixed/navBar";
import SpecialOffer from "./Fixed/specialOffer";

function UserProfile() {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <NavigationBar
        value={searchText}
        onSearch={(query) => {
          setSearchText(query);
          localStorage.setItem("searchQuery", query);
        }}
      />
      <SpecialOffer />
      <main className="flex mt-20 mb-20">
        {/* User profile picture */}
        <div
          className="h-[200px] w-[200px] rounded-full m-2 border-2 aspect-square bg-white"
          style={{
            backgroundImage:
              "url('https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/blankpfp.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* User info */}
        <div className="pt-10 border-2 w-full text-center">
          <h1 className="font-bold text-[25px] mx-auto w-60 max-h-10 h-10 overflow-hidden" spellCheck="false" contentEditable>
            Your Name
          </h1>
          <h1>1234567890</h1>

          <span className="">Go Back</span>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UserProfile;
