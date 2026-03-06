import React ,{ useState, useEffect } from "react";
import { FiWifi } from "react-icons/fi";
import { FaLock, FaVolumeUp } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { IoBatteryFull } from "react-icons/io5";
import BottomNav from "../components/BottomNav";


const Desktop = () => {
  const [time, setTime] = useState(new Date());

  const [battery, setBattery] = useState({
    level: 100,
    charging: true,
    supported: false,
  });

  const [network, setNetwork] = useState({
    type: "4g",
    supported: false,
  });

  const [download, setDownload] = useState("0.0");
  const [upload, setUpload] = useState("0.0");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((bat) => {
        const updateBattery = () => {
          setBattery({
            level: bat.level * 100,
            charging: bat.charging,
            supported: true,
          });
        };

        updateBattery();
        bat.addEventListener("levelchange", updateBattery);
        bat.addEventListener("chargingchange", updateBattery);
      });
    }
  }, []);

  useEffect(() => {
    if ("connection" in navigator) {
      const connection = navigator.connection;

      const updateNetwork = () => {
        setNetwork({
          type: connection.effectiveType || "4g",
          supported: true,
        });
      };

      updateNetwork();
      connection.addEventListener("change", updateNetwork);
      return () => {
        connection.removeEventListener("change", updateNetwork);
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownload((Math.random() * 2).toFixed(1));
      setUpload((Math.random() * 1).toFixed(1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-screen w-screen">
      <div className="bg-[url('./images/mainbg.jpg')] bg-cover   bg-center h-full w-full flex flex-col">
        <div className="w-full bg-white/5 shadow-2xl backdrop-blur-md flex justify-between items-center px-4 py-2 text-sm">
          <div className="text-2xl font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent border-r-2 border-zinc-200 pr-4">
            <img src="./images/Arch Linux.png" alt="" className="h-[5vh] w-[5vh]" />
          </div>

          <p className="text-zinc-300">
            {time.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            |{" "}
            {time.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>

          <div className="flex items-center gap-4 text-zinc-300">
            <span>↓ {download} b/s</span>
            <span>↑ {upload} b/s</span> | <FaLock />
            <FaVolumeUp />
            <MdMonitor />
            <span className="flex items-center gap-1">
              <FiWifi />
              {network.supported ? network.type.toUpperCase() : "4G"}
            </span>
            |
            <span className="flex items-center gap-1">
              <IoBatteryFull />
              {battery.level.toFixed(0)}%{battery.charging && " ⚡"}
            </span>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
