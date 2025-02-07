import { createRoot } from 'react-dom/client'
import Items from './Homepage/items.tsx'
import NavigationBar from './Fixed/navBar.tsx'
import SpecialOffer from './Fixed/specialOffer.tsx'
import Footer from './Fixed/footer.tsx'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import './index.css'
import Routing from './Routing.tsx'

createRoot(document.getElementById('root')!).render(Routing())

export function Homepage(){
   return(
      <>
      <NavigationBar/>
      <SpecialOffer/>
       <Items />
       <Footer/>
      </>
   )
}