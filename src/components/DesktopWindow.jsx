import React, { useState, useRef, useEffect } from "react";
import { Minus, Square, Copy, X } from "lucide-react";

const DesktopWindow = ({
  id,
  title,
  icon: Icon,
  children,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  defaultPosition = { x: 80, y: 60 },
  defaultSize = { w: 850, h: 560 }
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 });

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const initialX = Math.max(20, (screenWidth - defaultSize.w) / 2 + (id === "contact" ? 30 : id === "projects" ? -30 : 0));
    const initialY = Math.max(50, (screenHeight - defaultSize.h) / 2 + (id === "contact" ? 20 : id === "projects" ? -20 : 0));
    setPosition({ x: initialX, y: initialY });
  }, [id, defaultSize.w, defaultSize.h]);

  const handlePointerDown = (e) => {
    if (e.target.closest("button")) {
      return;
    }
    onFocus(id);
    if (isMaximized) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isMaximized) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 200, dragRef.current.posX + dx)),
      y: Math.max(38, Math.min(window.innerHeight - 100, dragRef.current.posY + dy))
    });
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) {
      }
    }
  };

  if (!isOpen || isMinimized) return null;

  const windowStyle = isMaximized
    ? {
        top: "36px",
        left: "0px",
        width: "100vw",
        height: "calc(100vh - 36px)",
        zIndex: zIndex,
        borderRadius: "0px"
      }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${defaultSize.w}px`,
        height: `${defaultSize.h}px`,
        maxWidth: "96vw",
        maxHeight: "86vh",
        zIndex: zIndex
      };

  return (
    <div
      className={`fixed flex flex-col bg-[#0F172A]/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300 ${
        isDragging ? "select-none shadow-cyan-500/20" : ""
      }`}
      style={windowStyle}
      onMouseDown={() => onFocus(id)}
    >
      
      <div
        className="h-10 bg-[#1E293B]/90 border-b border-slate-700/60 px-4 flex justify-between items-center cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        
        <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs md:text-sm tracking-wide pointer-events-none">
          {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
          <span className="font-semibold text-slate-200 truncate">{title}</span>
        </div>

        
        <div
          className="flex items-center gap-1.5"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onMinimize(id);
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors cursor-pointer"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onMaximize(id);
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors cursor-pointer"
            title={isMaximized ? "Restore Window" : "Maximize Window"}
          >
            {isMaximized ? <Copy className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
          </button>

          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose(id);
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600/90 transition-colors ml-1 cursor-pointer"
            title="Close Window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      
      <div className="flex-1 overflow-auto bg-[#0B132B]/90 text-slate-100 font-sans">
        {children}
      </div>
    </div>
  );
};

export default DesktopWindow;
