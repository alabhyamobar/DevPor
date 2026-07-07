import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { User, Folder, Terminal, Gamepad2 } from "lucide-react";

const BottomNav = ({ openWindows, onOpenWindow, activeWindowId }) => {
  const isAppOpen = (id) => openWindows.some((w) => w.id === id && w.isOpen);
  const isAppMinimized = (id) => openWindows.some((w) => w.id === id && w.isOpen && w.isMinimized);

  return (
    <div className="absolute h-16 px-5 py-2.5 backdrop-blur-2xl bg-[#0B132B]/85 border border-cyan-500/40 z-[90] bottom-5 left-1/2 transform -translate-x-1/2 rounded-2xl flex justify-center items-center gap-4 md:gap-6 shadow-2xl shadow-cyan-950/60">
      
      <div className="flex items-center gap-3 md:gap-4 pr-4 border-r border-slate-700/70">
        
        <button
          onClick={() => onOpenWindow("about")}
          className={`relative group p-2.5 rounded-xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 cursor-pointer ${
            activeWindowId === "about" && !isAppMinimized("about")
              ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/60 shadow-lg shadow-cyan-500/30"
              : "text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/60"
          }`}
          title="About Me"
        >
          <User className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
          {isAppOpen("about") && (
            <span
              className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-300 ${
                isAppMinimized("about")
                  ? "w-1.5 h-1.5 bg-slate-400"
                  : "w-2 h-2 bg-cyan-400 shadow-sm shadow-cyan-400 ring-2 ring-cyan-400/40"
              }`}
            />
          )}
        </button>

        
        <button
          onClick={() => onOpenWindow("projects")}
          className={`relative group p-2.5 rounded-xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 cursor-pointer ${
            activeWindowId === "projects" && !isAppMinimized("projects")
              ? "bg-blue-500/30 text-blue-300 border border-blue-400/60 shadow-lg shadow-blue-500/30"
              : "text-slate-300 hover:text-blue-300 hover:bg-blue-950/60"
          }`}
          title="Projects Explorer"
        >
          <Folder className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
          {isAppOpen("projects") && (
            <span
              className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-300 ${
                isAppMinimized("projects")
                  ? "w-1.5 h-1.5 bg-slate-400"
                  : "w-2 h-2 bg-blue-400 shadow-sm shadow-blue-400 ring-2 ring-blue-400/40"
              }`}
            />
          )}
        </button>

        
        <button
          onClick={() => onOpenWindow("contact")}
          className={`relative group p-2.5 rounded-xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 cursor-pointer ${
            activeWindowId === "contact" && !isAppMinimized("contact")
              ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/60 shadow-lg shadow-emerald-500/30"
              : "text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60"
          }`}
          title="Terminal Contact (contact.sh)"
        >
          <Terminal className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
          {isAppOpen("contact") && (
            <span
              className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-300 ${
                isAppMinimized("contact")
                  ? "w-1.5 h-1.5 bg-slate-400"
                  : "w-2 h-2 bg-emerald-400 shadow-sm shadow-emerald-400 ring-2 ring-emerald-400/40"
              }`}
            />
          )}
        </button>

        
        <button
          onClick={() => onOpenWindow("flappy")}
          className={`relative group p-2.5 rounded-xl transition-all duration-300 hover:scale-125 hover:-translate-y-2 cursor-pointer ${
            activeWindowId === "flappy" && !isAppMinimized("flappy")
              ? "bg-red-500/30 text-red-300 border border-red-400/60 shadow-lg shadow-red-500/30"
              : "text-slate-300 hover:text-red-300 hover:bg-red-950/60"
          }`}
          title="Flappy Arch Arcade Game"
        >
          <Gamepad2 className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
          {isAppOpen("flappy") && (
            <span
              className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-300 ${
                isAppMinimized("flappy")
                  ? "w-1.5 h-1.5 bg-slate-400"
                  : "w-2 h-2 bg-red-400 shadow-sm shadow-red-400 ring-2 ring-red-400/40"
              }`}
            />
          )}
        </button>
      </div>

      
      <div className="flex items-center gap-3 md:gap-4">
        <a
          href="https://github.com/alabhyamobar"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2.5 rounded-xl text-slate-300 hover:text-purple-300 hover:bg-purple-950/60 hover:scale-125 hover:-translate-y-2 transition-all duration-300"
          title="GitHub Profile"
        >
          <FaGithub className="text-2xl group-hover:rotate-6 transition-transform duration-300" />
        </a>

        <a
          href="https://www.linkedin.com/in/alabhya-mobar-8b44b3307/"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2.5 rounded-xl text-slate-300 hover:text-sky-300 hover:bg-sky-950/60 hover:scale-125 hover:-translate-y-2 transition-all duration-300"
          title="LinkedIn Profile"
        >
          <FaLinkedin className="text-2xl group-hover:rotate-6 transition-transform duration-300" />
        </a>

        <a
          href="https://www.instagram.com/alabhyamobar/"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2.5 rounded-xl text-slate-300 hover:text-pink-300 hover:bg-pink-950/60 hover:scale-125 hover:-translate-y-2 transition-all duration-300"
          title="Instagram Profile"
        >
          <FaInstagram className="text-2xl group-hover:rotate-6 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default BottomNav;