import React from "react";
import TerminalContact from "../components/TerminalContact";
import { Terminal, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#090D16] flex flex-col">
      
      <div className="h-10 bg-[#1E293B] border-b border-slate-700 px-4 flex justify-between items-center text-slate-200 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>alabhya@archlinux: ~/contact.sh</span>
        </div>
        <button
          onClick={() => navigate("/devpor/desktop")}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Desktop
        </button>
      </div>

      
      <div className="flex-1 overflow-hidden p-4">
        <TerminalContact />
      </div>
    </div>
  );
};

export default Contact;