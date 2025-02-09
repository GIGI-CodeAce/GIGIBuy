
function Footer(){
    return(
        <>
        {/* blend */}
        <div className="bg-[#516d90] h-[20px] mt-10"></div>
        <footer className="  text-center bg-[#455d7a] text-white h-96 pt-8 flex justify-around">
        <div
            className="w-80 h-80 bg-cover hidden sm:block md:block lg:block"
            style={{
                backgroundImage: "url('https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/fashion.png')"}}></div>
                <div  className="w-80 h-80 pt-8">
                <ul>
                    <li>Contact</li>
                </ul>
                </div>
                <div  className="w-80 h-80 pt-8">
                <ul>
                    <li>Contact</li>
                </ul>
                </div>
        </footer>
        </>
    )
}

export default Footer