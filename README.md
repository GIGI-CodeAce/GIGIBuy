
<h1 align="center">GIGIbuy v1.1.7</h1>

<p align="center">
  <img src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//diamond.png" width="40%" height="60%" alt="project-image">
</p>

<p id="description">
GIGIbuy, a modern, fashion-forward online clothing shop showcasing stylish items like jackets, vests, skirts, bags, and pants. Built with React, TypeScript, and Tailwind CSS, it uses Supabase API to fetch clothing data. While purchases and deliveries are unavailable, the website is a sleek, responsive showcase of trendy fashion. "Fashion forward, always you" reflects its commitment to individuality and style.
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
  <h2>1. Shopping cart</h2>
    <img src="https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous//shoppingCart.png" alt="project-screenshot" align="center" width="400" height="500">
```javascript
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
<h2>2. Clothing items page</h2>
<h2 align="center">Project Screenshots:</h2>
<div align="center">
<div>


</div>
 <img src="" alt="project-screenshot"  style="width: 100%; height: 400px">

  <img src="" alt="project-screenshot" style="width: 100%; height: 400px">

  <img src="" alt="project-screenshot" style="width: 100%; height: 400px">
</div><br></br>

[![Portfolio](https://img.shields.io/badge/Portfolio-62b1ff?style=for-the-badge&logo=web&logoColor=white)](https://www.gigicodeace.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-3e3eff?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dobre-robert-03653b331/)
[![GitHub](https://img.shields.io/badge/GitHub-2f2f2f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GIGI-CodeAce)
[![CSS Battles](https://img.shields.io/badge/CSS%20Battles-ff6e96?style=for-the-badge&logo=css3&logoColor=white)](https://cssbattle.dev/player/gigi)

  <b></b>
   <h4>~GIGI <code>Dore Robert</code></h4>
</footer>