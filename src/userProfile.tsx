import { useState } from "react";
import Footer from "./FixedOnPage/footer";
import NavigationBar from "./FixedOnPage/navBar";
import SpecialOffer from "./FixedOnPage/specialOffer";

function UserProfile() {
  const [searchText, setSearchText] = useState('');
  const [username, setUsername] = useState("Type Name");
  const [email, setEmail] = useState("yourname@gmail.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Fashion St, New York, NY");
  const [profilePic, setProfilePic] = useState(
    "https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/blankpfp.png"
  );

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

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
      <main className="flex flex-col items-center mt-10 mb-20">
        {/* Profile Picture */}
        <div className="relative">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <div
              className="h-[150px] w-[150px] rounded-full border-2 bg-white bg-cover bg-center"
              style={{ backgroundImage: `url(${profilePic})` }}
            ></div>
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        {/* User Info */}
        <div className="border-2 w-full max-w-lg mt-4 p-4 text-[#516d90] text-center border-b-[#FFB6A6] rounded-lg bg-gray-100">
          <h1
            className="font-bold text-[25px] w-60 mx-auto h-10 overflow-hidden border-b border-[#FFB6A6]"
            spellCheck="false"
            contentEditable
            onBlur={(e) => setUsername(e.target.innerText)}
          >
            {username}
          </h1>

          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {phone}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {address}
            </p>
          </div>
        </div>

        {/* Wishlist */}
        <div className="mt-6 w-full max-w-lg p-4 border-2 rounded-lg bg-gray-100 border-b-[#FFB6A6]">
          <h2 className="font-bold text-[20px] mb-2">Wishlist</h2>
          <ul className="text-gray-700">
            <textarea placeholder="Type here.."
             className="p-2 w-full min-h-[100px] max-h-[200px]"></textarea>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UserProfile;
