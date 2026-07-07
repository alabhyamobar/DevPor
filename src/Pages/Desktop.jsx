import React, { useState, useEffect } from "react";
import { User, Folder, Terminal, Github, Linkedin, Instagram, Image as ImageIcon, Sparkles, Gamepad2 } from "lucide-react";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import DesktopWindow from "../components/DesktopWindow";
import AboutContent from "../components/AboutContent";
import ProjectsContent from "../components/ProjectsContent";
import TerminalContact from "../components/TerminalContact";
import FlappyBirdGame from "../components/FlappyBirdGame";
import { initSoothingAudio } from "../utils/soothingAudio";

const wallpapers = [
  { name: "Japanese Fuji Sakura Dark", url: "/images/japanese_fuji.png" },
  { name: "Japanese Light Sunrise", url: "/images/japanese_light.png" },
  { name: "Japanese Torii Night", url: "/images/japanese_torii.png" },
  { name: "Cyberpunk Arch Neon", url: "/images/arch_wallpaper.png" },
  { name: "Classic Dark Arch", url: "/images/archbg.jpg" }
];

const desktopIcons = [
  {
    id: "about",
    name: "About Me.desktop",
    icon: User,
    color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    action: "window"
  },
  {
    id: "projects",
    name: "Projects.desktop",
    icon: Folder,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    action: "window"
  },
  {
    id: "contact",
    name: "contact.sh",
    icon: Terminal,
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    action: "window"
  },
  {
    id: "flappy",
    name: "Flappy Bird.game",
    icon: Gamepad2,
    color: "bg-red-500/20 text-red-400 border-red-500/40",
    action: "window"
  },
  {
    id: "wallpaper",
    name: "Wallpaper.desktop",
    icon: ImageIcon,
    color: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    action: "wallpaper"
  },
  {
    id: "github",
    name: "GitHub.link",
    icon: Github,
    color: "bg-purple-500/20 text-purple-400 border-purple-500/40",
    action: "link",
    url: "https://github.com/alabhyamobar"
  },
  {
    id: "linkedin",
    name: "LinkedIn.link",
    icon: Linkedin,
    color: "bg-sky-500/20 text-sky-400 border-sky-500/40",
    action: "link",
    url: "https://www.linkedin.com/in/alabhya-mobar-8b44b3307/"
  },
  {
    id: "instagram",
    name: "Instagram.link",
    icon: Instagram,
    color: "bg-pink-500/20 text-pink-400 border-pink-500/40",
    action: "link",
    url: "https://www.instagram.com/alabhyamobar/"
  }
];

const Desktop = () => {
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [wallpaperIdx, setWallpaperIdx] = useState(0);

  const [windows, setWindows] = useState([
    {
      id: "about",
      title: "alabhya@archlinux: ~/about-me",
      icon: User,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      defaultSize: { w: 900, h: 600 }
    },
    {
      id: "projects",
      title: "File Manager - /home/alabhya/projects",
      icon: Folder,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      defaultSize: { w: 920, h: 620 }
    },
    {
      id: "contact",
      title: "alabhya@archlinux: ~/contact.sh",
      icon: Terminal,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      defaultSize: { w: 800, h: 540 }
    },
    {
      id: "flappy",
      title: "Flappy Arch - Retro Arcade Game",
      icon: Gamepad2,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      defaultSize: { w: 500, h: 540 }
    }
  ]);

  const cycleWallpaper = () => {
    setWallpaperIdx((prev) => (prev + 1) % wallpapers.length);
  };

  const handleOpenWindow = (id) => {
    initSoothingAudio();
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveWindowId(id);

    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          return {
            ...win,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          };
        }
        return win;
      })
    );
  };

  const handleCloseWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isOpen: false, isMinimized: false } : win))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMinimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMaximizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, isMaximized: !win.isMaximized } : win
      )
    );
    handleFocusWindow(id);
  };

  const handleFocusWindow = (id) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, zIndex: nextZ } : win))
    );
  };

  const activeWinObj = windows.find((w) => w.id === activeWindowId && w.isOpen && !w.isMinimized);
  const currentWallpaper = wallpapers[wallpaperIdx];

  return (
    <div
      onClick={() => initSoothingAudio()}
      className="h-screen w-screen overflow-hidden select-none bg-[#090D16] relative"
    >
      
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-95 flex flex-col pointer-events-none"
        style={{ backgroundImage: `url('${currentWallpaper.url}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      
      <div className="relative h-full w-full flex flex-col z-10">
        
        <TopBar
          activeWindowTitle={activeWinObj ? activeWinObj.title : null}
          onOpenWindow={handleOpenWindow}
          openWindows={windows}
        />

        
        <div className="flex-1 p-6 grid grid-flow-col auto-cols-max grid-rows-6 gap-6 items-start justify-start">
          {desktopIcons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.action === "window") {
                    handleOpenWindow(item.id);
                  } else if (item.action === "wallpaper") {
                    cycleWallpaper();
                  } else if (item.url) {
                    window.open(item.url, "_blank");
                  }
                }}
                className="group w-24 flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-900/40 hover:backdrop-blur-md transition-all duration-200 cursor-pointer text-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg group-hover:scale-110 transition-transform duration-200 ${item.color}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-slate-100 text-xs font-mono group-hover:text-cyan-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] truncate w-full">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        
        {windows.map((win) => (
          <DesktopWindow
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            zIndex={win.zIndex}
            defaultSize={win.defaultSize}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onFocus={handleFocusWindow}
          >
            {win.id === "about" && <AboutContent />}
            {win.id === "projects" && <ProjectsContent />}
            {win.id === "contact" && (
              <TerminalContact
                onOpenWindow={handleOpenWindow}
                onCycleWallpaper={cycleWallpaper}
                onCloseWindow={handleCloseWindow}
              />
            )}
            {win.id === "flappy" && <FlappyBirdGame />}
          </DesktopWindow>
        ))}

        
        <BottomNav
          openWindows={windows}
          onOpenWindow={handleOpenWindow}
          activeWindowId={activeWindowId}
        />
      </div>
    </div>
  );
};

export default Desktop;
