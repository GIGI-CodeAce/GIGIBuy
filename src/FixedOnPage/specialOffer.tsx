import { useState, useEffect } from "react";

function SpecialOffer() {
    const limitedOffers = [
        "Massive discounts - Don't miss out!", 
        "Unbeatable Deals – Limited Time Only!",
        "Price Drops You Won’t Believe!", 
        "Crazy Discounts – Act Fast!"
    ];

    const getRandomItemFromArray = (array: string[]) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const [randomItem, setRandomItem] = useState(getRandomItemFromArray(limitedOffers));

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomItem(getRandomItemFromArray(limitedOffers));
        }, 15000)

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="bg-[#516d90] text-[17px] text-center font-bold text-[#FFB6A6] h-[28px] 
                        w-full flex items-center pt-[105px] justify-center z-50">
            <h1 className="mt-[-22px]">{randomItem}</h1>
        </main>
    );
}

export default SpecialOffer;
