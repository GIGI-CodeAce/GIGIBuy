function NavigationBar() {
    return (
<nav className="bg w-full pt-6 h-20 text-center items-center flex justify-evenly text-[15px] sm:text-[20px]">
            <h1 className="text-2xl font-bold ml-2 text-blue-500 text-[20px] sm:text-[25px]">GIGIbuy</h1>
            <input className="pl-2 w-lvh rounded-xl border-2 border-blue-500 ml-4 mr-4" placeholder="Type here.."/>
            <div className="flex items-center gap-1 max-w-14 mr-4">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="align-super font-bold whitespace-nowrap">Cart</span></div>
            <div className="flex items-center gap-1 mr-2">
                <span className="material-symbols-outlined">person</span>
                <span className="align-super font-bold">Profile</span></div>
        </nav>
    );
}

export default NavigationBar;
