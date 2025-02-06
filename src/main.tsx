import { createRoot } from 'react-dom/client'
import Items from './Homepage/items.tsx'
import NavigationBar from './Fixed/navBar.tsx'
import SpecialOffer from './Fixed/specialOffer.tsx'
import Footer from './Fixed/footer.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
   <>
   <NavigationBar/>
   <SpecialOffer/>
    <Items />
    <Footer/>
   </>
)
