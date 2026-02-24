import React from "react";
import BootLoader from "../components/BootLoader";

const Windows = ({ show }) => {
  if (!show) return null;
  return (

    <div className="fixed inset-0 z-[50]">

      <div
        className="absolute bg-[]"
        style={{
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",

          clipPath: `polygon(504px 49px,1340px 25px,1342px 715px,516px 663px)`
        }}
      >

        {/* Content inside screen */}
        <div className="w-full h-full flex items-center justify-center text-green-400 font-mono">
          <BootLoader/>
        </div>

      </div>

    </div>

  );
};

export default Windows;