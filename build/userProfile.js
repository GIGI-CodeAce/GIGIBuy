import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
function UserProfile() {
    const [username, setUsername] = useState("Type Name");
    const [email, setEmail] = useState("yourname@gmail.com");
    const [phone, setPhone] = useState("+1 (555) 123-4567");
    const [address, setAddress] = useState("123 Fashion St, New York, NY");
    const [profilePic, setProfilePic] = useState("https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/blankpfp.png");
    const handleProfilePicChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("main", { className: "flex flex-col items-center mt-10 mb-20", children: [_jsxs("div", { className: "relative", children: [_jsx("label", { htmlFor: "profile-upload", className: "cursor-pointer", children: _jsx("div", { className: "h-[150px] w-[150px] rounded-full border-2 bg-white bg-cover bg-center", style: { backgroundImage: `url(${profilePic})` } }) }), _jsx("input", { type: "file", id: "profile-upload", accept: "image/*", className: "hidden", onChange: handleProfilePicChange })] }), _jsxs("div", { className: "border-2 w-full max-w-lg mt-4 p-4 text-[#516d90] text-center border-b-[#FFB6A6] rounded-lg bg-gray-100", children: [_jsx("h1", { className: "font-bold text-[25px] w-60 mx-auto h-10 overflow-hidden border-b border-[#FFB6A6]", spellCheck: "false", contentEditable: true, onBlur: (e) => setUsername(e.target.innerText), children: username }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsxs("p", { className: "text-gray-700", children: [_jsx("strong", { children: "Email:" }), " ", email] }), _jsxs("p", { className: "text-gray-700", children: [_jsx("strong", { children: "Phone:" }), " ", phone] }), _jsxs("p", { className: "text-gray-700", children: [_jsx("strong", { children: "Address:" }), " ", address] })] })] }), _jsxs("div", { className: "mt-6 w-full max-w-lg p-4 border-2 rounded-lg bg-gray-100 border-b-[#FFB6A6]", children: [_jsx("h2", { className: "font-bold text-[20px] mb-2", children: "Wishlist" }), _jsx("ul", { className: "text-gray-700", children: _jsx("textarea", { placeholder: "Type here..", className: "p-2 w-full min-h-[100px] max-h-[200px]" }) })] })] }) }));
}
export default UserProfile;
