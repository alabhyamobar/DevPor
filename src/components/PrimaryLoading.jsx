import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrimaryLoading = () => {
  const [text, setText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const navigate = useNavigate();

  const disclaimer =
    "Yeh website poori tarah se mere sapno, imagination, aur countless late-night coding sessions se inspired hai. Har element, har animation, aur har pixel carefully design kiya gaya hai taaki aapko sirf ek website nahi, balki ek experience mile. Agar kahin thodi imperfections dikhe, toh samajh lijiye ki reality abhi bhi perfection ko catch up kar rahi hai. Yeh space meri creativity, learning, aur growth ka digital reflection hai — so scroll kariye, explore kariye, aur iss journey ka hissa baniye.";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText((prev) => prev + disclaimer[index]);
      index++;

      if (index >= disclaimer.length) {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col justify-start items-center pt-[25vh] px-6">
      <h1 className="text-4xl md:text-5xl text-white font-bold underline text-center">
        Disclaimer
      </h1>

      <p className="text-base md:text-lg text-white w-full md:w-[70%] text-center leading-relaxed mt-6">
        {text}
      </p>

      {typingComplete && <button onClick={()=>navigate("/devpor/landing")} className="learn-more mt-10"> Enter Experience </button>}
    </div>
  );
};

export default PrimaryLoading;
