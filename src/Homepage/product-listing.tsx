
function ProductListing(props: any) {
    return (
      <div className="pt-5 w-56 text-center ml-0 flex-1 min-w-[250px] h-[300px] border-2 rounded-xl border-[#4b6686] m-[5px]
                        hover:scale-98 cursor-pointer transition-all hover:bg-[#e0e5eb]">
        <div
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: 'cover',
            height: '200px',
          }}
        ></div>
        <h1>{props.name}</h1>
        <h2>{props.description}</h2>
          <span>{props.FabricMaterials}</span>
          <p className="opacity-[60%]">{props.price}$</p>
      </div>
    );
  }
  
  export default ProductListing;
  