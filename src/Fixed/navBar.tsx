function NavigationBar() {
    return (
      <nav className="w-full pt-0 h-20 bg-[#455d7a] flex justify-evenly items-center text-[15px] sm:text-[20px] text-white">
  
        <h1 className="text-2xl font-bold ml-2 sm:text-[25px] flex items-center gap-1 mr-2">
        <div
          style={{
            backgroundImage: `url("https://raw.githubusercontent.com/GIGIsOtherStuff/GIGIbuy/main/diamond.png")`,
            backgroundSize: 'cover',
            width: '40px',
            height: '40px',
          }}
        ></div>GIGIbuy</h1>
  
        <input
          className="pl-2 w-full sm:w-[30vw] rounded-xl text-white border-2 bg-[#4b6686] border-white ml-2 mr-2 placeholder-white"
          placeholder="Type here..."
        />
  
        <div className="flex items-center gap-1 max-w-14 mr-4">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="align-super font-bold whitespace-nowrap">Cart</span>
        </div>
  
        <div className="flex items-center gap-1 mr-2">
          <span className="material-symbols-outlined">person</span>
          <span className="align-super font-bold">Profile</span>
        </div>
      </nav>
    );
  }
  
  export default NavigationBar;
  