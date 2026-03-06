import React, { useState, useEffect } from "react";
import { FiWifi } from "react-icons/fi";
import { FaLock, FaVolumeUp } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { IoBatteryFull } from "react-icons/io5";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";

const ArchWindow = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [time, setTime] = useState(new Date());
  const navigator = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="h-full w-full  relative text-white">
      {!unlocked && (
        <div className="absolute inset-0 bg-[url('./images/mainbg.jpg')] bg-cover bg-center flex flex-col justify-center items-center  rotate-[1.6deg]">
          <div className="bg-black/60 backdrop-blur-md p-10 view border-white border-2 rounded-2xl text-center shadow-2xl">
            <h1 className="text-5xl font-bold mb-8 tracking-widest">
              &lt;A/&gt;
            </h1>

            <p className="mb-6 text-lg opacity-80">
              {time.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>

            <p className="text-3xl mb-8">
              {time.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>

            <button
              onClick={() => setUnlocked(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg text-lg font-semibold"
            >
              Enter Desktop
            </button>
          </div>
        </div>
      )}

      {unlocked && navigator("/devpor/desktop")}
    </div>
  );
};

export default ArchWindow;
