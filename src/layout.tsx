import { Outlet } from "react-router-dom"
import NavigationBar from "./FixedOnPage/navBar";
import Footer from "./FixedOnPage/footer";
import SpecialOffer from "./FixedOnPage/specialOffer";
import { useState } from "react";

export function DefaultLayout(){
  const [searchText, setSearchText] = useState<string>(
    localStorage.getItem("searchQuery") || ""
  );

  return (
    <>
      <NavigationBar
        value={searchText}
        onSearch={(query) => {
          setSearchText(query);
          localStorage.setItem("searchQuery", query);
        }}
      />
      <SpecialOffer/>
      <Outlet context={{ searchQuery: searchText }} />
      <Footer/>
    </>
  );
}


export function RegisatrationLayout(){
  const [searchText, setSearchText] = useState<string>(
    localStorage.getItem("searchQuery") || ""
  );

  return (
    <>
      <NavigationBar
        value={searchText}
        onSearch={(query) => {
          setSearchText(query);
          localStorage.setItem("searchQuery", query);
        }}
      />
      <SpecialOffer/>
      <Outlet context={{ searchQuery: searchText }} />
    </>
  );
}
