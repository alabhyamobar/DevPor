import React from "react";
import BootLoader from "../components/BootLoader";
import { useState } from "react";

const Windows = ({ show }) => {
  const [bootComplete, setBootComplete] = useState(false);
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[50]">
      <div
        className="absolute bg-black overflow-hidden"
        style={{
          left: "504px",
          top: "25px",
          width: "838px",
          height: "690px",
          clipPath: "polygon(0px 24px, 836px 0px, 838px 690px, 12px 638px)",
        }}
      >
        {bootComplete ? null : (<BootLoader onComplete={() => setBootComplete(true)} />)}
        
      </div>
    </div>
  );
};

export default Windows;
