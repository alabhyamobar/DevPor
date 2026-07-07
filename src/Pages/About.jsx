import React from "react";
import AboutContent from "../components/AboutContent";
import { User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#090D16] flex flex-col">
      
      <div className="h-10 bg-[#1E293B] border-b border-slate-700 px-4 flex justify-between items-center text-slate-200 text-xs font-mono">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>alabhya@archlinux: ~/about-me</span>
        </div>
        <button
          onClick={() => navigate("/devpor/desktop")}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Desktop
        </button>
      </div>

      
      <div className="flex-1 overflow-hidden">
        <AboutContent />
      </div>
    </div>
  );
};

export default About;