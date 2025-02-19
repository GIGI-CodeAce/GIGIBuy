interface CategoriesProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  }
  
  function Categories({ selectedCategory, onCategoryChange }: CategoriesProps) {
    const buttonStyle =
"hover:cursor-pointer select-none hover:rounded-lg hover:border-3 transition-all w-2/3 max-w-[300px] border-2 border-[#455d7a] m-2 h-7 rounded-xl";
  
    return (
      <main className="h-10 flex text-center justify-center">
        <button
          onClick={() => onCategoryChange("All")}
          className={`${buttonStyle} ${selectedCategory === "All" ? "bg-[#516d90] text-[#FFB6A6]" : ""}`}
        >All</button>
        <button
          onClick={() => onCategoryChange("Men")}
          className={`${buttonStyle} ${selectedCategory === "Men" ? "bg-[#516d90] text-[#FFB6A6]" : ""}`}
        >Men</button>
        <button
          onClick={() => onCategoryChange("Women")}
          className={`${buttonStyle} ${selectedCategory === "Women" ? "bg-[#516d90] text-[#FFB6A6]" : ""}`}
        >Women</button>
      </main>
    );
  }
  
  export default Categories;
  