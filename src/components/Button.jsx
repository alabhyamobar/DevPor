import React from "react";
import { Link } from "react-router-dom";
import { Power } from "lucide-react";

const Button = ({ show , onClick}) => {
  return (
    <div
    onClick={onClick}
      className={`fixed clipped z-[100]  h-[6vh] w-[6vh] bg-[#CE3C49] bottom-2 right-50 -skew-x-6 skew-y-2 flex items-center justify-center hover:bg-[#802536] transition-all duration-300 cursor-pointer hover:text-white ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Power className="text-black hover:text-white w-[3vh] h-[3vh] -skew-x-[-6deg] -skew-y-[-2deg]" />
    </div>
  );
};

export default Button;
