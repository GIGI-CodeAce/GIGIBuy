import ImagesSelect from "./imagesSelect"
import { useState } from "react"

export default function ItemPageFallBack(){
    const [image, setImage] = useState<boolean>(false)
    const [canHover, setCanHover] = useState(true)

    return(
            <>
            <ImagesSelect
              image=''
              setImage={setImage}
              coverImage=''
              setCanHover={setCanHover}
              />

            <div
              className="max-w-[470px] max-h-[500px] min-h-[420px] sm:mt-8 mt-2 border-2 bg-center bg-contain bg-no-repeat transition-all border-[#4b6686] flex items-center rounded-2xl p-20 justify-center mx-auto sm:mx-0 sm:ml-2"
            >
              <img
                className="w-96 max-h-[450px] object-contain opacity-0 animate-pulse"
                aria-hidden="true"
              />
            </div>
            <main className="max-w-[500px] min-w-[250px] sm:text-xl text-md text-center pt-[0] mx-auto sm:mx-0 sm:pt-[20vh] mt-2 sm:mt-8 sm:p-10 sm:mr-2">
              <h1 className="font-[iconic] font-bold sm:text-md text-xl lg:w-[222px] mx-auto
                            animate-pulse w-40 h-12 bg-gray-100 border rounded-3xl"></h1>
              <p className=" mx-auto
                            animate-pulse w-30 h-6 mt-1 bg-white border rounded-3xl"></p>
              <p className="bg-[#ffd5cc] mx-auto shadow-xl
                            animate-pulse w-20 h-8 mt-3 border rounded-3xl"></p>
              <br /><br />
              <button title="Click to add"
                className="w-40 h-11 border border-black bg-[#a0c4d7] px-2 rounded-2xl animate-pulse"
              >
              </button>
              <section className="mt-10">
                <h1 className="font-medium underline decoration-[#FFB6A6] bg-[#ffd5cc] mx-auto shadow-xl
                            animate-pulse w-20 h-6 mt-1 border rounded-3xl"></h1>
                <p className="font-medium underline decoration-[#FFB6A6] bg-gray-100 mx-auto shadow-xl
                            animate-pulse w-30 h-6 mt-1 border rounded-3xl"></p>
              </section>
            </main>
          </>
    )
}