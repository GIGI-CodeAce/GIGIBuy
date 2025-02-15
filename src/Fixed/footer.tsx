
function Footer(){
    return(
        <>
        {/* blend */}
        <div className="bg-[#516d90] h-[20px] mt-10"></div>
        <footer className=" text-center bg-[#455d7a] text-white h-96 pt-8 flex justify-around">
        <div
            className="w-80 h-80 bg-cover hidden lg:block"
            style={{
                backgroundImage: "url('https://mfkjjxderhqbsfsmtzql.supabase.co/storage/v1/object/public/miscellaneous/fashion.png')"}}>
                </div>
                <div  className="w-80 h-80 pt-8 text-[13px]/[50px] sm:text-[15px] ">
                <ul className="">
                    <li className="underline">Contact us</li>
                    <li>customers.gigibuy@fake.com</li>
                    <li>customers.support@fake.com</li>
                    <li>gigibuy.com</li>
                </ul>
                </div>
                <div  className="w-80 h-80 pt-8 text-[15px]/[50px]">
                <ul>
        <li className="underline" >Socials</li>
        <a href='https://www.linkedin.com/in/dobre-robert-03653b331/' target='_blank'>
        <li className="hover:underline text-blue-400 ">LinkedIn</li>
        </a>
        <a href='https://github.com/GIGI-CodeAce' target='_blank'>
        <li className="hover:underline text-black">Github </li>
        </a>
        <a href='https://mail.google.com/mail/u/2/#inbox?compose=CllgCJTLHGFjKnxPBjNqmGGSKhhHFjgqdsdCzWzTnNTmFWtTfNkVVpbSPFxKkWLHqpXvhVvhspg' target='_blank'>
        <li className="hover:underline">Gmail</li>
        </a>
                </ul>
                </div>
        </footer>
        </>
    )
}

export default Footer