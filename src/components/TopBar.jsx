import React, { useState, useEffect, useRef } from "react";
import { FiWifi } from "react-icons/fi";
import { FaLock, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { IoBatteryFull } from "react-icons/io5";
import { Terminal, User, Folder, Mail, Github, Linkedin, Instagram, Power, RefreshCw, Layers } from "lucide-react";
import { toggleGlobalMute, subscribeAudioState } from "../utils/soothingAudio";

const TopBar = ({ activeWindowTitle, onOpenWindow, openWindows }) => {
  const [time, setTime] = useState(new Date());
  const [download, setDownload] = useState("1.2");
  const [upload, setUpload] = useState("0.4");
  const [isMuted, setIsMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsub = subscribeAudioState((muted) => setIsMuted(muted));
    return () => unsub();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setDownload((Math.random() * 2 + 0.5).toFixed(1));
      setUpload((Math.random() * 1 + 0.1).toFixed(1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-9 bg-[#0B132B]/85 backdrop-blur-md border-b border-cyan-500/20 px-3 flex justify-between items-center text-xs text-slate-200 select-none z-[100] relative shadow-lg">
      
      <div className="flex items-center gap-3" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 hover:bg-cyan-500/10 px-2 py-1 rounded transition-all cursor-pointer border border-transparent hover:border-cyan-500/30"
          title="Arch Linux Application Menu"
        >
          <img src="/images/Arch Linux.png" alt="Arch Linux" className="h-5 w-5 object-contain" />
          <span className="font-bold font-mono tracking-wider text-cyan-400">ARCH</span>
        </button>

        
        {menuOpen && (
          <div className="absolute top-10 left-3 w-64 bg-[#0F172A]/95 border border-cyan-500/40 rounded-xl shadow-2xl p-2 z-[200] backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-2 border-b border-slate-700/60 font-mono text-[11px] text-cyan-400 font-semibold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" /> Arch Linux Applications
            </div>

            <div className="py-1 space-y-1">
              <button
                onClick={() => {
                  onOpenWindow("about");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 rounded-lg transition-all text-xs font-medium cursor-pointer"
              >
                <User className="w-4 h-4 text-cyan-400" /> About Me
              </button>

              <button
                onClick={() => {
                  onOpenWindow("projects");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 rounded-lg transition-all text-xs font-medium cursor-pointer"
              >
                <Folder className="w-4 h-4 text-cyan-400" /> Projects Explorer
              </button>

              <button
                onClick={() => {
                  onOpenWindow("contact");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 rounded-lg transition-all text-xs font-medium cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" /> Terminal Contact (contact.sh)
              </button>
            </div>

            <div className="my-1 border-t border-slate-700/60" />

            <div className="py-1 space-y-1">
              <a
                href="https://github.com/alabhyamobar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-slate-800/80 text-slate-300 hover:text-white rounded-lg transition-all text-xs"
              >
                <Github className="w-3.5 h-3.5 text-purple-400" /> GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/alabhya-mobar-8b44b3307/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-slate-800/80 text-slate-300 hover:text-white rounded-lg transition-all text-xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Profile
              </a>
              <a
                href="https://www.instagram.com/alabhyamobar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-slate-800/80 text-slate-300 hover:text-white rounded-lg transition-all text-xs"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram
              </a>
            </div>

            <div className="my-1 border-t border-slate-700/60" />

            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-xs font-medium cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reboot System
            </button>
          </div>
        )}

        
        {activeWindowTitle && (
          <div className="hidden md:flex items-center gap-2 border-l border-slate-700/80 pl-3 font-mono text-xs text-cyan-300/90 truncate max-w-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="truncate">{activeWindowTitle}</span>
          </div>
        )}
      </div>

      
      <div className="font-mono text-xs text-slate-300 font-semibold tracking-wider bg-slate-900/60 border border-slate-700/50 px-3 py-0.5 rounded-md">
        {time.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })}
      </div>

      
      <div className="flex items-center gap-3 font-mono text-[11px] text-slate-300">
        <span className="hidden sm:inline text-cyan-400/90">↓ {download} KB/s</span>
        <span className="hidden sm:inline text-blue-400/90">↑ {upload} KB/s</span>
        <span className="text-slate-600">|</span>

        <button
          onClick={toggleGlobalMute}
          className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
          title={isMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
        >
          {isMuted ? <FaVolumeMute className="text-red-400 text-sm" /> : <FaVolumeUp className="text-emerald-400 text-sm animate-pulse" />}
        </button>

        <span className="flex items-center gap-1">
          <FiWifi className="text-emerald-400" />
          <span>4G</span>
        </span>

        <span className="flex items-center gap-1">
          <IoBatteryFull className="text-emerald-400" />
          <span>100% ⚡</span>
        </span>
      </div>
    </div>
  );
};

export default TopBar;
