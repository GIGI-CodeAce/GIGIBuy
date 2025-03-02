interface imagesTemplate{
    image:string,
    coverImage:string,
    setCanHover:Function,
    setImage:Function,
}

function ImagesSelect({image,coverImage,setCanHover,setImage}:imagesTemplate){
    const imageSelectionStyle = 
    "cursor-pointer hover:scale-[103%] sm:mb-2 mr-2 sm:ml-3 bg-contain bg-no-repeat sm:rounded-l-2xl sm:rounded-tr-none  rounded-t-2xl w-20 h-20 border-2 border-[#4b6686]";

    return(
        <div className="sm:w-20 sm:h-[500px] mt-8 sm:pr-2 max-w-[500px] h-20 mx-auto sm:flex-col flex items-center justify-center sm:text-xl sm:p-10 sm:mx-0 sm:mr-4">
        <div
          className={imageSelectionStyle}
          onClick={() => { setImage(false); setCanHover(false); }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          className={imageSelectionStyle}
          onClick={() => { setImage(true); setCanHover(false); }}
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    )
}

export default ImagesSelect