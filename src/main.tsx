import { createRoot } from 'react-dom/client'
import App from './Homepage/items.tsx'
import NavigationBar from './Fixed/navBar.tsx'
import SpecialOffer from './Fixed/specialOffer.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
   <>
   <NavigationBar/>
   <SpecialOffer/>
    <App />
   </>
)
