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

const bootSequence = [

  "[    0.000000] Linux version 6.7.4-arch1-1 (gcc 13.2.1)",
  "[    0.012345] Command line: BOOT_IMAGE=/vmlinuz-linux root=/dev/nvme0n1p2 rw quiet",
  "[    0.023456] x86/fpu: Supporting XSAVE feature 0x001",
  "[    0.034567] BIOS-provided physical RAM map:",
  "[    0.045678] RAMDISK: Loaded initramfs",

  "[    0.112233] systemd[1]: system initialization complete",

  "[  OK  ] Created slice User and Session Slice",
  "[  OK  ] Started Dispatch Password Requests",
  "[  OK  ] Started Journal Service",
  "[  OK  ] Started Load Kernel Modules",

  "[  OK  ] Mounted Kernel Configuration File System",
  "[  OK  ] Mounted POSIX Message Queue File System",

  "[  OK  ] Started Apply Kernel Variables",

  "[  OK  ] Started udev Kernel Device Manager",

  "[  OK  ] Started Network Manager",

  "[  OK  ] Reached target Network",

  "[  OK  ] Started Authorization Manager",

  "[  OK  ] Started Login Service",

  "[  OK  ] Started Hostname Service",

  "[  OK  ] Mounted /boot",

  "[  OK  ] Mounted /home",

  "[  OK  ] Reached target Local File Systems",

  "[  OK  ] Started Update UTMP about System Boot/Shutdown",

  "[  OK  ] Reached target System Initialization",

  "[  OK  ] Started Daily Cleanup of Temporary Directories",

  "[  OK  ] Started Daily rotation of log files",

  "[  OK  ] Started GNOME Display Manager",

  "[  OK  ] Reached target Graphical Interface",

  "",

  "Arch Linux 6.7.4-arch1-1 (tty1)",

  "",

  "archlinux login: root",

  "Password: ********",

  "",

  "Last login: Tue Feb 24 11:42:31 on tty1",

  "",

  "[root@archlinux ~]# uname -a",

  "Linux archlinux 6.7.4-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",

  "",

  "[root@archlinux ~]# pacman -Syu",

  ":: Synchronizing package databases...",

  " core.db downloaded",

  " extra.db downloaded",

  " community.db downloaded",

  ":: Starting full system upgrade...",

  " there is nothing to do",

  "",

  "[root@archlinux ~]# █"

];
const BootLoader = ({onComplete}) => {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);
  const terminalRef = useRef(null);
  console.log(bootSequence.length);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setLines(prev => {
        if (i >= bootSequence.length) {
          clearInterval(interval);
          return prev;
        }
        return [...prev, bootSequence[i++]];
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, []);

 useEffect(() => {

  let i = 0;
  const halfIndex = Math.floor(bootSequence.length / 2);
  let hasCalledComplete = false;

  const interval = setInterval(() => {

    setLines(prev => {

      const newLines = [...prev, bootSequence[i]];

      // call onComplete when half printed
      if (!hasCalledComplete && i >= halfIndex) {
        hasCalledComplete = true;

        // small delay makes it feel natural
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }

      return newLines;
    });

    i++;

    if (i >= bootSequence.length) {
      clearInterval(interval);
    }

  }, 80);

  return () => clearInterval(interval);

}, [onComplete]);useEffect(() => {

  let i = 0;
  const onefourthIndex = Math.floor(bootSequence.length / 4);
  let hasCalledComplete = false;

  const interval = setInterval(() => {

    setLines(prev => {

      const newLines = [...prev, bootSequence[i]];

      
      if (!hasCalledComplete && i >= onefourthIndex) {
        hasCalledComplete = true;

        setTimeout(() => {
          onComplete?.();
        }, 300);
      }

      return newLines;
    });

    i++;

    if (i >= bootSequence.length) {
      clearInterval(interval);
    }

  }, 80);

  return () => clearInterval(interval);

}, [onComplete]);

  return (
    <div className="w-full h-full rotate-1  bg-black text-green-400 font-mono p-6 overflow-hidden">

      <div className="text-[#00AEEF] mb-4 leading-tight text-xs md:text-sm">
        {archLogo.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
          </div>
        ))}
      </div>

      
      <div ref={terminalRef} className="text-xs md:text-sm">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        
        <span className="text-green-400">
          {cursor ? "█" : " "}
        </span>
      </div>

    </div>
  );
};

export default BootLoader;