import React, { useEffect, useState } from 'react'

const PrimaryLoading = () => {

    const [text, setText] = useState("");

    const disclaimer = "Yeh website poori tarah se mere sapno, imagination, aur countless late-night coding sessions se inspired hai. Har element, har animation, aur har pixel carefully design kiya gaya hai taaki aapko sirf ek website nahi, balki ek experience mile. Agar kahin thodi imperfections dikhe, toh samajh lijiye ki reality abhi bhi perfection ko catch up kar rahi hai. Yeh space meri creativity, learning, aur growth ka digital reflection hai — so scroll kariye, explore kariye, aur iss journey ka hissa baniye.";

    useEffect(() => {

        let index = 0;

        const interval = setInterval(() => {

            setText((prev) => prev + disclaimer[index]);

            index++;

            if (index >= disclaimer.length) {
                clearInterval(interval);
            }

        }, 50);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className='
            min-h-screen
            w-screen
            bg-black
            flex
            flex-col
            justify-start
            items-center
            gap-6
            sm:gap-8
            md:gap-10
            pt-[20vh]
            sm:pt-[22vh]
            md:pt-[25vh]
            lg:pt-[30vh]
            px-6
            sm:px-10
            md:px-16
        '>

            <h1 className='
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                text-white
                font-bold
                underline
                text-center
            '>
                Disclaimer
            </h1>

            <p className='
                text-sm
                sm:text-base
                md:text-lg
                lg:text-xl
                text-white
                w-full
                sm:w-[90%]
                md:w-[75%]
                lg:w-[50%]
                text-center
                leading-relaxed
            '>
                {text}
            </p>

        </div>
    );
};

export default PrimaryLoading;