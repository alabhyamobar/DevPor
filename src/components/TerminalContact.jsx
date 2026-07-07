import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, CheckCircle2, RefreshCw, HelpCircle, CornerDownLeft } from "lucide-react";

const archAscii = `
       /\\         OS: Arch Linux x86_64
      /  \\        Host: DevPor OS v2.0
     /\\   \\       Kernel: 6.8.9-arch1-1
    /      \\      Shell: zsh 5.9
   /   ,,   \\     WM: Hyprland / Arch Desktop
  /   |  |  -\\    Developer: Alabhya Mobar
 /_-''    ''-_\\   Packages: 1337 (pacman)
`;

const TerminalContact = ({ onOpenWindow, onCycleWallpaper, onCloseWindow }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [activeStep, setActiveStep] = useState(0); 
  const [history, setHistory] = useState([
    { type: "sys", text: "Arch Linux 6.8.9-arch1-1 x86_64 Terminal (tty1)" },
    { type: "sys", text: "Type 'help' for available CLI commands or follow the prompt to send a message." },
    { type: "sys", text: "--------------------------------------------------------" },
    { type: "prompt", text: "./contact.sh --init" }
  ]);
  const [cmdInput, setCmdInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, activeStep, isSubmitting]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      if (!formData.name.trim()) return;
      setHistory((prev) => [
        ...prev,
        { type: "input", label: "[?] Enter your Name:", value: formData.name },
        { type: "sys", text: "[OK] Name captured." }
      ]);
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (!formData.email.trim()) return;
      setHistory((prev) => [
        ...prev,
        { type: "input", label: "[?] Enter your Email:", value: formData.email },
        { type: "sys", text: "[OK] Email captured." }
      ]);
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (!formData.message.trim()) return;
      submitMessage();
    }
  };

  const submitMessage = () => {
    setIsSubmitting(true);
    setHistory((prev) => [
      ...prev,
      { type: "input", label: "[?] Enter your Message:", value: formData.message },
      { type: "sys", text: "[*] Packaging transmission to Alabhya Mobar..." }
    ]);

    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        { type: "sys", text: "[OK] Establishing secure TLS socket..." },
        { type: "sys", text: "[OK] Encrypting message payload..." }
      ]);
    }, 600);

    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        { type: "success", text: "✔ [SUCCESS 200] Message sent successfully to Alabhya Mobar!" },
        { type: "sys", text: "Thank you for reaching out! I will reply to your email shortly." },
        { type: "sys", text: "Type 'reset' or click below to send another message." }
      ]);
      setIsSubmitting(false);
      setActiveStep(3);
    }, 1500);
  };

  const handleCustomCommand = (e) => {
    if (e.key === "Enter" && cmdInput.trim()) {
      const rawCmd = cmdInput.trim();
      const cmd = rawCmd.toLowerCase();
      const newHistory = [...history, { type: "cmd", text: `alabhya@archlinux ~ $ ${rawCmd}` }];

      if (cmd === "help") {
        newHistory.push(
          { type: "sys", text: "Available Arch Linux CLI Commands:" },
          { type: "sys", text: "  ls / dir         - List all desktop applications & files" },
          { type: "sys", text: "  about / open about - Launch About Me window" },
          { type: "sys", text: "  projects / open projects - Launch Projects Explorer window" },
          { type: "sys", text: "  flappy / game    - Launch Flappy Arch Arcade Game" },
          { type: "sys", text: "  wallpaper / chbg - Cycle Japanese & Arch desktop wallpapers" },
          { type: "sys", text: "  neofetch         - Display Arch Linux system specs" },
          { type: "sys", text: "  matrix           - Run green digital rain simulation" },
          { type: "sys", text: "  github           - Open GitHub profile page" },
          { type: "sys", text: "  linkedin         - Open LinkedIn profile page" },
          { type: "sys", text: "  instagram        - Open Instagram profile page" },
          { type: "sys", text: "  cat info / info  - Show direct email & social contacts" },
          { type: "sys", text: "  whoami           - Display developer bio summary" },
          { type: "sys", text: "  contact / reset  - Start interactive contact form" },
          { type: "sys", text: "  clear            - Clear terminal screen" },
          { type: "sys", text: "  reboot           - Restart desktop environment" }
        );
      } else if (cmd === "ls" || cmd === "dir" || cmd === "ls -la") {
        newHistory.push(
          { type: "sys", text: "drwxr-xr-x 2 alabhya desktop 4096 Jul  6 12:00 ." },
          { type: "sys", text: "-rwxr-xr-x 1 alabhya desktop  128 About Me.desktop" },
          { type: "sys", text: "-rwxr-xr-x 1 alabhya desktop  256 Projects.desktop" },
          { type: "sys", text: "-rwxr-xr-x 1 alabhya desktop  512 contact.sh*" },
          { type: "sys", text: "-rwxr-xr-x 1 alabhya desktop 1024 Flappy Bird.game*" },
          { type: "sys", text: "-rwxr-xr-x 1 alabhya desktop  128 Wallpaper.desktop" },
          { type: "sys", text: "-rw-r--r-- 1 alabhya desktop   64 GitHub.link" },
          { type: "sys", text: "-rw-r--r-- 1 alabhya desktop   64 LinkedIn.link" },
          { type: "sys", text: "-rw-r--r-- 1 alabhya desktop   64 Instagram.link" }
        );
      } else if (cmd === "about" || cmd === "open about") {
        if (onOpenWindow) onOpenWindow("about");
        newHistory.push({ type: "success", text: "[+] Opened About Me Window." });
      } else if (cmd === "projects" || cmd === "open projects") {
        if (onOpenWindow) onOpenWindow("projects");
        newHistory.push({ type: "success", text: "[+] Opened Projects Explorer Window." });
      } else if (cmd === "flappy" || cmd === "game" || cmd === "open flappy") {
        if (onOpenWindow) onOpenWindow("flappy");
        newHistory.push({ type: "success", text: "[+] Launched Flappy Arch Arcade Game." });
      } else if (cmd === "wallpaper" || cmd === "chbg" || cmd === "wallpaper next") {
        if (onCycleWallpaper) onCycleWallpaper();
        newHistory.push({ type: "success", text: "[+] Switched Desktop Wallpaper." });
      } else if (cmd === "neofetch" || cmd === "fastfetch") {
        newHistory.push({ type: "sys", text: archAscii });
      } else if (cmd === "matrix") {
        newHistory.push(
          { type: "sys", text: "01000001 01001100 01000001 01000010 01001000 01011001 01000001" },
          { type: "sys", text: "01001101 01001111 01000010 01000001 01010010" },
          { type: "success", text: "Wake up, Neo... Arch Linux has you. Follow the white rabbit. 🐇" }
        );
      } else if (cmd === "github") {
        window.open("https://github.com/alabhyamobar", "_blank");
        newHistory.push({ type: "success", text: "[+] Opened GitHub profile in new tab." });
      } else if (cmd === "linkedin") {
        window.open("https://www.linkedin.com/in/alabhya-mobar-8b44b3307/", "_blank");
        newHistory.push({ type: "success", text: "[+] Opened LinkedIn profile in new tab." });
      } else if (cmd === "instagram") {
        window.open("https://www.instagram.com/alabhyamobar/", "_blank");
        newHistory.push({ type: "success", text: "[+] Opened Instagram profile in new tab." });
      } else if (cmd === "cat info" || cmd === "cat contact.txt" || cmd === "info") {
        newHistory.push(
          { type: "sys", text: "--------------------------------------------------------" },
          { type: "sys", text: "📧 Direct Email : alabhyamobar@gmail.com" },
          { type: "sys", text: "🐙 GitHub       : https://github.com/alabhyamobar" },
          { type: "sys", text: "💼 LinkedIn     : https://www.linkedin.com/in/alabhya-mobar-8b44b3307/" },
          { type: "sys", text: "📸 Instagram    : https://www.instagram.com/alabhyamobar/" },
          { type: "sys", text: "--------------------------------------------------------" }
        );
      } else if (cmd === "whoami") {
        newHistory.push({ type: "sys", text: "Alabhya Mobar - Full Stack Web Developer & Creative Engineer." });
      } else if (cmd === "clear") {
        setHistory([]);
        setCmdInput("");
        return;
      } else if (cmd === "reboot" || cmd === "reload") {
        window.location.reload();
        return;
      } else if (cmd === "reset" || cmd === "contact") {
        setFormData({ name: "", email: "", message: "" });
        setActiveStep(0);
        newHistory.push({ type: "sys", text: "[+] Contact session restarted." });
      } else {
        newHistory.push({ type: "err", text: `bash: command not found: '${rawCmd}'. Type 'help' to view all commands.` });
      }

      setHistory(newHistory);
      setCmdInput("");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setActiveStep(0);
    setHistory([
      { type: "sys", text: "Arch Linux 6.8.9-arch1-1 x86_64 Terminal (tty1)" },
      { type: "sys", text: "--------------------------------------------------------" },
      { type: "prompt", text: "./contact.sh --init" }
    ]);
  };

  return (
    <div className="h-full w-full bg-[#090D16] text-emerald-400 font-mono p-4 md:p-6 flex flex-col justify-between overflow-y-auto select-text">
      
      <div className="space-y-2 mb-4 text-xs md:text-sm">
        <div className="text-cyan-400 font-bold mb-3 tracking-wider flex items-center gap-2 border-b border-cyan-900/40 pb-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>alabhya@archlinux: ~/contact.sh</span>
        </div>

        
        {history.map((item, index) => {
          if (item.type === "prompt") {
            return (
              <div key={index} className="text-cyan-400 font-semibold flex items-center gap-2">
                <span className="text-green-500">alabhya@archlinux</span>
                <span className="text-slate-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-slate-200">$ {item.text}</span>
              </div>
            );
          }
          if (item.type === "cmd") {
            return <div key={index} className="text-slate-200">{item.text}</div>;
          }
          if (item.type === "input") {
            return (
              <div key={index} className="flex gap-2">
                <span className="text-yellow-400 font-semibold">{item.label}</span>
                <span className="text-white">{item.value}</span>
              </div>
            );
          }
          if (item.type === "success") {
            return <div key={index} className="text-emerald-400 font-bold bg-emerald-950/40 p-2 rounded border border-emerald-500/30 my-1">{item.text}</div>;
          }
          if (item.type === "err") {
            return <div key={index} className="text-red-400 font-semibold">{item.text}</div>;
          }
          return <div key={index} className="text-slate-300 opacity-90">{item.text}</div>;
        })}
      </div>

      
      <div className="mt-4 border-t border-cyan-900/50 pt-4">
        {activeStep < 3 && !isSubmitting && (
          <form onSubmit={handleNextStep} className="space-y-3">
            {activeStep === 0 && (
              <div className="flex flex-col gap-1.5">
                <label className="text-yellow-400 text-xs md:text-sm font-semibold flex items-center gap-1.5">
                  <span className="text-cyan-400">[?]</span> Enter your Name:
                </label>
                <div className="flex items-center gap-2 bg-[#111827] border border-cyan-500/40 focus-within:border-cyan-400 px-3 py-2 rounded-lg transition-all">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Linus Torvalds"
                    className="w-full bg-transparent text-white focus:outline-none text-xs md:text-sm font-mono"
                    autoFocus
                  />
                  <button type="submit" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold px-2 py-1 rounded bg-cyan-950/60 border border-cyan-800 flex items-center gap-1">
                    Next <CornerDownLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="flex flex-col gap-1.5">
                <label className="text-yellow-400 text-xs md:text-sm font-semibold flex items-center gap-1.5">
                  <span className="text-cyan-400">[?]</span> Enter your Email:
                </label>
                <div className="flex items-center gap-2 bg-[#111827] border border-cyan-500/40 focus-within:border-cyan-400 px-3 py-2 rounded-lg transition-all">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. linus@kernel.org"
                    className="w-full bg-transparent text-white focus:outline-none text-xs md:text-sm font-mono"
                    autoFocus
                  />
                  <button type="submit" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold px-2 py-1 rounded bg-cyan-950/60 border border-cyan-800 flex items-center gap-1">
                    Next <CornerDownLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="flex flex-col gap-1.5">
                <label className="text-yellow-400 text-xs md:text-sm font-semibold flex items-center gap-1.5">
                  <span className="text-cyan-400">[?]</span> Enter your Message:
                </label>
                <div className="flex flex-col gap-2 bg-[#111827] border border-cyan-500/40 focus-within:border-cyan-400 p-3 rounded-lg transition-all">
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your project inquiry or hello..."
                    className="w-full bg-transparent text-white focus:outline-none text-xs md:text-sm font-mono resize-none"
                    autoFocus
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Transmit Message
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        )}

        {isSubmitting && (
          <div className="flex items-center gap-3 text-cyan-400 animate-pulse text-xs md:text-sm my-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Transmitting packet over TCP/IP... Please wait.</span>
          </div>
        )}

        {activeStep === 3 && (
          <div className="flex gap-3 mt-2">
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Send Another Message
            </button>
          </div>
        )}

        
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs md:text-sm">
          <span className="text-cyan-400 font-bold">cmd &gt;</span>
          <input
            type="text"
            value={cmdInput}
            onChange={(e) => setCmdInput(e.target.value)}
            onKeyDown={handleCustomCommand}
            placeholder="Type 'help', 'about', 'projects', 'flappy', 'ls', or 'wallpaper'..."
            className="w-full bg-transparent text-slate-300 focus:outline-none font-mono"
          />
        </div>
      </div>
      <div ref={terminalEndRef} />
    </div>
  );
};

export default TerminalContact;
