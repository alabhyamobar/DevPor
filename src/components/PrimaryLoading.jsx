import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, Shield, Play } from "lucide-react";

const archLogo = [
  "                  -`",
  "                 .o+`",
  "                `ooo/",
  "               `+oooo:",
  "              `+oooooo:",
  "              -+oooooo+:",
  "            `/:-:++oooo+:",
  "           `/++++/+++++++:",
  "          `/++++++++++++++:",
  "         `/+++ooooooooooooo/`",
  "        ./ooosssso++osssssso+`",
  "       .oossssso-````/ossssss+`",
  "      -osssssso.      :ssssssso.",
  "     :osssssss/        osssso+++.",
  "    /ossssssss/        +ssssooo/-",
  "  `/ossssso+/:-        -:/+osssso+-",
  " `+sso+:-`                 `.-/+oso:",
  " `++:.                           `-/+/",
  " .`                                 `/"
];

const bootSequence = [
  "[    0.000000] Linux version 6.7.4-arch1-1 (gcc 13.2.1)",
  "[    0.012345] Command line: BOOT_IMAGE=/vmlinuz-linux root=/dev/nvme0n1p2 rw quiet",
  "[    0.023456] x86/fpu: Supporting XSAVE feature 0x001",
  "[    0.034567] BIOS-provided physical RAM map:",
  "[    0.045678] RAMDISK: Loaded initramfs",
  "[    0.112233] systemd[1]: system initialization complete",
  "[  OK  ] Created slice User and Session Slice.",
  "[  OK  ] Started Dispatch Password Requests.",
  "[  OK  ] Started Journal Service.",
  "[  OK  ] Started Load Kernel Modules.",
  "[  OK  ] Mounted Kernel Configuration File System.",
  "[  OK  ] Mounted POSIX Message Queue File System.",
  "[  OK  ] Started Apply Kernel Variables.",
  "[  OK  ] Started udev Kernel Device Manager.",
  "[  OK  ] Started Network Manager.",
  "[  OK  ] Reached target Network.",
  "[  OK  ] Started Authorization Manager.",
  "[  OK  ] Started Login Service.",
  "[  OK  ] Started Hostname Service.",
  "[  OK  ] Mounted /boot.",
  "[  OK  ] Mounted /home.",
  "[  OK  ] Reached target Local File Systems.",
  "[  OK  ] Started Update UTMP about System Boot/Shutdown.",
  "[  OK  ] Reached target System Initialization.",
  "[  OK  ] Started GNOME Display Manager.",
  "[  OK  ] Reached target Graphical Interface.",
  "",
  "Arch Linux 6.7.4-arch1-1 (tty1)",
  "",
  "archlinux login: root",
  "Password: ********",
  "",
  "Last login: Tue Feb 24 11:42:31 on tty1",
  "",
  "[root@archlinux ~]# pacman -Syyu --noconfirm",
];

const PrimaryLoading = () => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [linkComplete, setLinkComplete] = useState(false);
  
  const navigate = useNavigate();
  const consoleEndRef = useRef(null);

  const disclaimer =
    "Yeh website poori tarah se mere sapno, imagination, aur countless late-night coding sessions se inspired hai. Har element, har animation, aur har pixel carefully design kiya gaya hai taaki aapko sirf ek website nahi, balki ek experience mile. Agar kahin thodi imperfections dikhe, toh samajh lijiye ki reality abhi bhi perfection ko catch up kar rahi hai. Yeh space meri creativity, learning, aur growth ka digital reflection hai — so scroll kariye, explore kariye, aur iss journey ka hissa baniye.";

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, progress]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    let currentVal = 0;
    
    const interval = setInterval(() => {
      let increment = 1;
      if (currentVal < 30) {
        increment = Math.floor(Math.random() * 8) + 4;
      } else if (currentVal >= 30 && currentVal < 70) {
        increment = Math.floor(Math.random() * 4) + 1;
      } else if (currentVal >= 70 && currentVal < 88) {
        increment = Math.random() > 0.8 ? 1 : 0; 
      } else if (currentVal >= 88 && currentVal < 98) {
        increment = Math.random() > 0.65 ? 1 : 0; 
      } else {
        increment = Math.floor(Math.random() * 2) + 1;
      }

      currentVal = Math.min(currentVal + increment, 100);
      setProgress(currentVal);

      if (currentVal <= 70) {
        const linesToShow = Math.floor((currentVal / 70) * bootSequence.length);
        setLines(bootSequence.slice(0, linesToShow));
      } else {
        setLines(bootSequence);
      }

      if (currentVal === 100) {
        setLinkComplete(true);
        clearInterval(interval);
      }
    }, 85);

    return () => clearInterval(interval);
  }, []);

  const drawBar = (pct) => {
    const width = 20;
    const filled = Math.floor((pct / 100) * width);
    const empty = width - filled;
    return `[${"=".repeat(filled)}${filled < width ? ">" : ""}${" ".repeat(Math.max(0, empty - 1))}] ${pct}%`;
  };

  const corePct = Math.min(100, Math.floor(Math.max(0, (progress - 70) / 10) * 100));
  const extraPct = Math.min(100, Math.floor(Math.max(0, (progress - 80) / 10) * 100));
  const commPct = Math.min(100, Math.floor(Math.max(0, (progress - 90) / 10) * 100));

  return (
    <div className="min-h-screen w-screen bg-[#070514] relative overflow-hidden flex flex-col items-center justify-center font-mono text-slate-200 select-none scanline-overlay">
      

      
      <div className="w-full h-screen bg-[#101D29]/92 backdrop-blur-md flex flex-col z-10 relative overflow-hidden">
        
        <header className="h-10 bg-[#152331] border-b border-slate-700/60 px-4 flex justify-between items-center text-slate-300 text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF5A5A]" />
            <span className="w-3 h-3 rounded-full bg-[#E1C340]" />
            <span className="w-3 h-3 rounded-full bg-[#52C452]" />
          </div>
          <div className="flex items-center gap-1.5 font-bold font-mono tracking-wide text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>root@archlinux: ~/bootloader</span>
          </div>
          <div className="w-14" />
        </header>

        
        <div className="flex-1 p-6 flex overflow-hidden bg-[#101D29]/95 text-xs text-green-400 font-mono">
          
          <div className="hidden md:block text-[#00AEEF] whitespace-pre text-[10px] leading-tight select-none mr-6">
            {archLogo.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto terminal-scroll space-y-1 pr-2">
              {lines.map((line, i) => {
                const isOk = line.startsWith("[  OK  ]");
                return (
                  <div key={i}>
                    {isOk ? (
                      <span>
                        [ <span className="text-cyan-400 font-bold">OK</span> ]{line.slice(8)}
                      </span>
                    ) : (
                      line
                    )}
                  </div>
                );
              })}

              
              {progress >= 70 && (
                <div className="space-y-1 mt-2 border-t border-cyan-500/20 pt-2 text-[#00AEEF]">
                  <div>:: Synchronizing package databases...</div>
                  <div>
                    {"  "}core.db{"      "}{drawBar(corePct)} ( 133.5 KiB/s )
                  </div>
                  {progress >= 80 && (
                    <div>
                      {"  "}extra.db{"     "}{drawBar(extraPct)} (   2.4 MiB/s )
                    </div>
                  )}
                  {progress >= 90 && (
                    <div>
                      {"  "}community.db{" "}{drawBar(commPct)} (   4.1 MiB/s )
                    </div>
                  )}
                </div>
              )}

              
              {progress === 100 && (
                <div className="space-y-1 mt-2 text-green-400">
                  <div>:: Starting full system upgrade...</div>
                  <div className="text-slate-400 font-medium"> there is nothing to do</div>
                  <div className="flex items-center gap-1 mt-1 text-cyan-400">
                    <span>[root@archlinux ~]# ./enter_experience.sh</span>
                    <span className="text-cyan-400 font-bold">{cursor ? "█" : " "}</span>
                  </div>
                </div>
              )}

              <div ref={consoleEndRef} />
            </div>
          </div>
        </div>

        
        <footer className="h-16 bg-[#152331] border-t border-slate-700/60 px-5 flex justify-between items-center z-10">
          <button
            onClick={() => setDisclaimerOpen(true)}
            className="flex items-center gap-2 border border-yellow-500/40 hover:border-yellow-400 bg-yellow-950/20 hover:bg-yellow-900/30 px-4 py-2 rounded-lg text-yellow-400 text-xs font-semibold tracking-wider transition-all duration-300 shadow-md cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
            READ DISCLAIMER
          </button>

          {linkComplete ? (
            <button
              onClick={() => navigate("/landing")}
              className="flex items-center gap-2 border-2 border-cyan-400 bg-cyan-500/10 hover:bg-cyan-400 hover:text-slate-950 px-6 py-2.5 rounded-lg text-cyan-300 font-extrabold text-xs tracking-widest transition-all duration-300 shadow-lg shadow-cyan-500/30 animate-pulse cursor-pointer animate-none"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              RUN LINK
            </button>
          ) : (
            <div className="flex items-center gap-1.5 border border-slate-700/50 bg-slate-800/20 px-5 py-2.5 rounded-lg text-slate-500 text-xs tracking-wider">
              <span>SYSTEM BOOTING {progress}%</span>
            </div>
          )}
        </footer>
      </div>

      
      {disclaimerOpen && (
        <div className="fixed inset-0 z-[300] bg-black/75 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel-heavy rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col relative animate-in zoom-in-95 duration-200">
            
            <div className="border-b border-cyan-500/20 px-4 py-3 flex justify-between items-center text-cyan-300 text-xs font-bold bg-[#152331]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-yellow-500" />
                <span>COGNITIVE COMPLIANCE</span>
              </div>
              <button
                onClick={() => setDisclaimerOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer font-bold"
              >
                [X]
              </button>
            </div>

            
            <div className="p-6 flex-1 text-xs text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-cyan-500/20 bg-[#101D29]">
              <p className="indent-4 text-justify text-slate-300 leading-relaxed">
                {disclaimer}
              </p>
            </div>

            
            <div className="bg-[#152331] px-4 py-3 border-t border-cyan-500/20 flex justify-end">
              <button
                onClick={() => setDisclaimerOpen(false)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-md shadow-cyan-950/30"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimaryLoading;
