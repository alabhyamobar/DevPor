import React, { useEffect, useRef, useState } from "react";

const archLogo = [
  "                   -`",
  "                  .o+`",
  "                 `ooo/",
  "                `+oooo:",
  "               `+oooooo:",
  "               -+oooooo+:",
  "             `/:-:++oooo+:",
  "            `/++++/+++++++:",
  "           `/++++++++++++++:",
  "          `/+++ooooooooooooo/`",
  "         ./ooosssso++osssssso+`",
  "        .oossssso-````/ossssss+`",
  "       -osssssso.      :ssssssso.",
  "      :osssssss/        osssso+++.",
  "     /ossssssss/        +ssssooo/-",
  "   `/ossssso+/:-        -:/+osssso+-",
  "  `+sso+:-`                 `.-/+oso:",
  " `++:.                           `-/+/",
  " .`                                 `/"
];

const bootLogs = [
  "[ OK ] Started Load Kernel Modules",
  "[ OK ] Started Apply Kernel Variables",
  "[ OK ] Started Network Manager",
  "[ OK ] Reached target Network",
  "[ OK ] Started OpenSSH Daemon",
  "[ OK ] Started Authorization Manager",
  "[ OK ] Mounted /boot",
  "[ OK ] Mounted /home",
  "[ OK ] Started Login Service",
  "[ OK ] Reached target Graphical Interface",
  "",
  "Arch Linux 6.7.4-arch1-1 (tty1)",
  "",
  "alabhya login: root",
  "Password: ********",
  "",
  "[root@archlinux ~]# pacman -Syu",
  ":: Synchronizing package databases...",
  " core.db downloaded",
  " extra.db downloaded",
  " community.db downloaded",
  "",
  "[root@archlinux ~]#"
];

const BootLoader = () => {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);
  const terminalRef = useRef(null);

  // typing animation
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setLines(prev => {
        if (i >= bootLogs.length) {
          clearInterval(interval);
          return prev;
        }
        const newLines = [...prev, bootLogs[i]];
        i++;
        return newLines;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // blinking cursor
  useEffect(() => {
    const blink = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  // auto scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="fixed inset-0 bg-black z-[999]">

      <div
        ref={terminalRef}
        className="w-full h-full p-6 font-mono  text-sm md:text-base lg:text-lg"
      >

        {/* Arch Logo */}
        <div className="text-[#00AEEF] mb-6">
          {archLogo.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line}
            </div>
          ))}
        </div>

        {/* Boot logs */}
        <div className="text-gray-300">
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}

          {/* cursor */}
          <span className="text-white">
            {cursor ? "█" : " "}
          </span>
        </div>

      </div>

    </div>
  );
};

export default BootLoader;