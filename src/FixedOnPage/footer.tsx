
function Footer(){
    return(
        <>
        {/* blend */}
        <div className="bg-[#516d90] h-[20px]"></div>
        <footer className=" text-center bg-linear-to-b from-[#455d7a] via-[#455d7a] to-[#374a62] text-white h-[377px] pt-8 flex justify-around">
        <div
            className="w-80 h-80 bg-cover hidden lg:block rounded-xl"
            style={{
                backgroundImage: "url('https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/fashion.png')"}}>
                </div>
                <div  className="w-80 h-80 pt-8 text-[13px]/[50px] sm:text-[15px] ">
                <ul className="">
                    <li className="text-[#FFB6A6] underline">Contact us</li>
                    <li>customers.gigibuy@fake.com</li>
                    <li>customers.support@fake.com</li>
                    <li>gigibuy.com</li>
                </ul>
                </div>
                <div  className="w-80 h-80 pt-8 text-[15px]/[50px]">
                <ul>
        <li className="text-[#FFB6A6] underline" >Socials</li>
        <a href='https://www.linkedin.com/in/dobre-robert-03653b331/' target='_blank'>
        <li className="hover:underline text-blue-400 ">LinkedIn</li>
        </a>
        <a href='https://github.com/GIGI-CodeAce' target='_blank'>
        <li className="hover:underline text-black">Github </li>
        </a>
        <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=gigicodeace@gmail.com&su=Inquiry&body=Hello," 
            target="_blank" rel="noopener noreferrer"
            className="hover:underline cursor-pointer"
                >Gmail</a>
            </ul>
            </div>
        </footer>
    <h1 className="bg-[#374a62] text-white text-sm">{import.meta.env.VITE_SITE_VERSION}</h1>
        </>
    )
}

export default Footer