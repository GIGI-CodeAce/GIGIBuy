
<h1 align="center">GIGIbuy v1.3.2</h1>
<p align="center">
  <img src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//diamond.png" width="40%" height="60%" alt="project-image">
</p>

<p align="center">
  <strong>GIGIbuy</strong>, a modern, fashion-forward online clothing shop showcasing stylish items like jackets, skirts, bags, and more.Uses <strong>Supabase API</strong> to fetch clothing data. While purchases and deliveries are unavailable, the website is a sleek, responsive showcase of trendy fashion. "Fashion forward, always you" reflects its commitment to individuality and style.
</p>

<h2 align="center">Visit here</h2>

<div align="center">
  <a href="https://gigibuy.com">gigibuy.com</a>
</div>

<h2 align="center">🧐 Features</h2>

<h4>Here're some of the project's best features</h4>

- **Dynamic Search Bar**: Real-time filtering of clothing items based on user input.
- **Placeholder User Profile**: Interactive profile section with placeholder data.
- **Fully Functional Shopping Cart**: Add, remove, and update quantities of items, with data persisted in local storage.
- **Detailed Product Pages**: Comprehensive information about each clothing item, including images, descriptions, and pricing.
- **40+ Clothing Items**: Fetched dynamically using a custom Supabase API.
- **React Router**: Seamless navigation between pages with URL routing.
- **Responsive Design**: Built with Tailwind CSS for a consistent experience across devices.
  
  <h2 align="center">Snippets of code</h2><br/>
  <p align="center">This includes highlights of code from the project and its most important mecanics</p>

  <div align="center">
  <div align="center">
     <h2>1. Shopping cart</h2>
  <img src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//shoppingCart.png" alt="project-screenshot" align="center" width="90%" height="83%">
  </div>

```javascript
// Filename: `cartContext.tsx`
// ...
  const [cart, setCart] = useState<ClothingItem[]>([]);

  // OnMount, load the shopping cart saved data
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Saving into local storage cart elements
  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

// Adds a new clothing item into the cart by also increasing quantity
  const addToCart = (item: ClothingItem) => {
    setCart((prev) => {
      const existingItem = prev.find((ClothingItem) => ClothingItem.id === item.id);
      if (existingItem) {
        return prev.map((ClothingItem) =>
          ClothingItem.id === item.id
            ? { ...ClothingItem, quantity: (ClothingItem.quantity || 0) + 1 }
            : ClothingItem
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

// Removes an item out of the cart (obviously)
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

// If the user wants more than one element of the same item it increases them
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
// ...
```
  <div align="center">
<h2>2. Clothing item page</h2>
    <img src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//itemPage2.png" alt="project-screenshot" align="center" width="90%" height="88%">
    </div>

```javascript
import { useEffect } from "react";
// Filename: `ItemPageData.tsx`

// Fetching clothing item

const useFetchClothing = (
  supabase: any,
  id: string | undefined,
  name: string | undefined,
  setClothing: Function,
  setError: Function,
  setLoading: Function
) => {
  useEffect(() => {
    const fetchClothing = async () => {
      try {
        if (!name) throw new Error("Invalid item name");

        const formattedName = name.replace(/-/g, " ");

        const { data, error } = await supabase
          .from("Clothing")
          .select("*")
          .ilike("name", formattedName)
          .limit(1)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Item not found");

        setClothing(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };

    fetchClothing();
  }, [name, id, supabase, setClothing, setError, setLoading]);
};

export default useFetchClothing;
```

```javascript
// Filename: `ItemPage.tsx`

function ItemPage() {
  const { cart, addToCart } = useCart();
  const [clothing, setClothing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardAdd, setCardAdd] = useState('Add to cart')
  const [searchText, setSearchText] = useState<string>(localStorage.getItem("searchQuery") || "");
  const { id, name } = useParams();

  function CartAdded(){
    setCardAdd('Item added!')
    setTimeout(() => {
      setCardAdd('Add to cart')
    }, 1000);
  }
  

  useFetchClothing(supabase, id, name, setClothing, setError, setLoading);

  const handleAddToCart = () => {
    CartAdded()
    if (clothing) {
      const cartItem: ClothingItem = {
        ...clothing, 
      };
  
      addToCart(cartItem);
    }
  };
  

  if (loading) return <div className="text-gray-500 flex-col text-cente justify-center mt-50">
          <span class="material-symbols-outlined">autorenew</span>
          <p className="text-xl opacity-60">Loading...</p>
        </div>
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <NavigationBar 
      value={searchText} 
      onSearch={(query) => {setSearchText(query);
      localStorage.setItem("searchQuery", query);
      }}/>
      <SpecialOffer />
      <div className="...">
        {clothing && (
          <>
          {/*Page content*/}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ItemPage;
```
  <div align="center">
<h2>3. Home page</h2>
    <img src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//itemsPage.png" alt="project-screenshot" align="center" width="90%" height="93%">
    </div>

```javascript
// Filename: `productsListing.tsx'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductListing(props: any) {
  const [showCoverImg, setShowCoverImg] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedName = props.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/${props.id}/${formattedName}`);
  };

  // product UI design html code
  return (
    <div
      className="pt-5 max-w-[250px] text-center h-[303px] border-2 rounded-xl border-[#4b6686] ml-[5px]
                 hover:scale-103 cursor-pointer transition-all hover:bg-[#eff2f5] "
      onMouseEnter={() => setShowCoverImg(true)}
      onMouseLeave={() => setShowCoverImg(false)}
      onClick={handleClick}
    >
      <img src={props.coverImage} alt="" className="hidden" aria-hidden="true" />
      <div
        className="bg-cover rounded-t-xl h-[200px] duration-300"
        style={{
          backgroundImage: `url(${showCoverImg ? props.coverImage : props.image})`,
        }}>
          <div className={`justify-end p-4 pt-0 ${showCoverImg ? 'flex' : 'hidden'}`}><span className="material-symbols-outlined">favorite</span></div>
        </div>

      <h1
        className={`font-bold text-lg ${showCoverImg ? 'text-[#FFB6A6]' : 'text-gray-800'} hover:text-[${showCoverImg ? '#FFB6A6' : 'white'}]`}
      >{props.name}</h1>

      <abbr className="no-underline" title={props.description}><h2 className="text-gray-600 truncate ...  pl-1 pr-1">{props.description}</h2></abbr>
      <p className="opacity-60">{props.price}$</p>
    </div>
  );
}

export default ProductListing;
```
  </div>

<br></br>

[![Portfolio](https://img.shields.io/badge/Portfolio-62b1ff?style=for-the-badge&logo=web&logoColor=white)](https://www.gigicodeace.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-3e3eff?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dobre-robert-03653b331/)
[![GitHub](https://img.shields.io/badge/GitHub-2f2f2f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GIGI-CodeAce)
[![CSS Battles](https://img.shields.io/badge/CSS%20Battles-ff6e96?style=for-the-badge&logo=css3&logoColor=white)](https://cssbattle.dev/player/gigi)

  <br/>
   <h4>~GIGI <code>Dore Robert</code></h4>
</footer>