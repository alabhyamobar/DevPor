import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Shield, Play, Volume2, Coffee, Moon } from "lucide-react";

const PrimaryLoading = () => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState("Brewing tea...");
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [linkComplete, setLinkComplete] = useState(false);
  
  const navigate = useNavigate();
  const logsEndRef = useRef(null);

  const disclaimer =
    "Yeh website poori tarah se mere sapno, imagination, aur countless late-night coding sessions se inspired hai. Har element, har animation, aur har pixel carefully design kiya gaya hai taaki aapko sirf ek website nahi, balki ek experience mile. Agar kahin thodi imperfections dikhe, toh samajh lijiye ki reality abhi bhi perfection ko catch up kar rahi hai. Yeh space meri creativity, learning, aur growth ka digital reflection hai — so scroll kariye, explore kariye, aur iss journey ka hissa baniye.";

  const addLog = (text, type = "normal") => {
    setLogs((prev) => [...prev, { text, type, id: Math.random() }]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    let currentVal = 0;
    
    const logPool = [
      { text: "Tuning ambient synthesizers...", type: "sys" },
      { text: "Dimming workspace lighting...", type: "sys" },
      { text: "Brewing warm green tea (late_night.sys)...", type: "tea" },
      { text: "Softening contrast and neon borders...", type: "sys" },
      { text: "Aligning stars in creative orbit...", type: "star" },
      { text: "Injecting lo-fi frequencies...", type: "sys" },
      { text: "Warming up WebGL geometries...", type: "sys" },
      { text: "Ensuring dream index level is optimal...", type: "sys" },
      { text: "Space synchronized. Welcome, developer.", type: "success" },
    ];

    addLog("Initializing chill workspace...", "sys");

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

      const prevVal = currentVal;
      currentVal = Math.min(currentVal + increment, 100);
      setProgress(currentVal);

      if (currentVal >= 10 && prevVal < 10) addLog(logPool[0].text, logPool[0].type);
      if (currentVal >= 22 && prevVal < 22) addLog(logPool[1].text, logPool[1].type);
      if (currentVal >= 38 && prevVal < 38) addLog(logPool[2].text, logPool[2].type);
      if (currentVal >= 50 && prevVal < 50) addLog(logPool[3].text, logPool[3].type);
      if (currentVal >= 64 && prevVal < 64) addLog(logPool[4].text, logPool[4].type);
      if (currentVal >= 75 && prevVal < 75) addLog(logPool[5].text, logPool[5].type);
      if (currentVal >= 85 && prevVal < 85) addLog(logPool[6].text, logPool[6].type);
      if (currentVal >= 88 && prevVal < 88) addLog("Checking tea temperature... Still hot.", "tea");
      if (currentVal >= 94 && prevVal < 94) addLog(logPool[7].text, logPool[7].type);
      
      if (currentVal < 25) setCurrentStep("Warming up system core...");
      else if (currentVal < 50) setCurrentStep("Reading design manifesto...");
      else if (currentVal < 75) setCurrentStep("Tuning audio frequencies...");
      else if (currentVal < 90) setCurrentStep("Gathering late night thoughts...");
      else if (currentVal < 100) setCurrentStep("Calibrating workspace link...");
      else {
        setCurrentStep("Link complete. Ready to enter.");
        addLog(logPool[8].text, logPool[8].type);
        setLinkComplete(true);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const circum = 2 * Math.PI * 65;
  const strokeOffset = circum - (progress / 100) * circum;

  return (
    <div className="min-h-screen w-screen bg-[#070514] relative overflow-hidden flex flex-col items-center justify-center font-sans text-slate-100 select-none">
      
      <style>{`
        @keyframes float-slow-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(60px, -40px) scale(1.15); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-50px, 70px) scale(0.95); }
        }
        @keyframes float-slow-3 {
          0%, 100% { transform: translate(0px, 0px) scale(0.95); }
          50% { transform: translate(40px, 50px) scale(1.1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-float-1 {
          animation: float-slow-1 18s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-slow-2 22s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-slow-3 15s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .glass-panel {
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-panel-heavy {
          background: rgba(11, 10, 22, 0.85);
          backdrop-filter: blur(32px);
          border: 1px solid rgba(6, 182, 212, 0.25);
        }
        .text-glow-cyan {
          text-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
        }
        .text-glow-purple {
          text-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
        }
        .glow-circle {
          box-shadow: 0 0 40px rgba(6, 182, 212, 0.15);
        }
      `}</style>

      
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/35 blur-[120px] animate-float-1 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-cyan-900/25 blur-[140px] animate-float-2 pointer-events-none" />
      <div className="absolute top-[30%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-indigo-900/20 blur-[130px] animate-float-3 pointer-events-none" />

      
      <main className="w-[90%] max-w-lg glass-panel rounded-3xl p-8 flex flex-col items-center gap-8 shadow-2xl relative z-10">
        
        <header className="w-full flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">
              Late Night Study Workspace
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-400/20 text-[10px] text-cyan-300 font-semibold font-mono">
            <Volume2 className="w-3 h-3 text-cyan-400" />
            <span>LO-FI CHILL</span>
          </div>
        </header>

        
        <div className="flex flex-col items-center py-4 relative w-full">
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full glow-circle">
            
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="65"
                className="stroke-slate-800/40 fill-none"
                strokeWidth="4"
              />
              <circle
                cx="80"
                cy="80"
                r="65"
                className="stroke-cyan-400 fill-none"
                strokeWidth="4.5"
                strokeDasharray={circum}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.15s ease" }}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-cyan-300 tracking-tight text-glow-cyan font-mono">
                {progress}%
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase font-mono mt-1 flex items-center gap-1">
                <Coffee className="w-2.5 h-2.5 text-amber-400/90" />
                loading
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-semibold text-slate-200 tracking-wide flex items-center justify-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              {currentStep}
            </p>
          </div>
        </div>

        
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={() => setDisclaimerOpen(true)}
              className="flex items-center gap-2 border border-slate-700/60 hover:border-slate-600 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl text-slate-300 text-xs font-semibold tracking-wide transition-all cursor-pointer font-mono"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              DISCLAIMER STATEMENT
            </button>

            {linkComplete ? (
              <button
                onClick={() => navigate("/landing")}
                className="flex items-center gap-2 border border-cyan-400/60 bg-cyan-500/20 hover:bg-cyan-400 hover:text-slate-950 px-6 py-2.5 rounded-xl text-cyan-300 font-extrabold text-xs tracking-wider transition-all duration-300 shadow-lg shadow-cyan-950/40 cursor-pointer font-mono"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                ENTER SPACE
              </button>
            ) : (
              <div className="flex items-center gap-2 border border-slate-800/80 bg-slate-900/10 px-6 py-2.5 rounded-xl text-slate-500 text-xs font-semibold tracking-wider font-mono">
                LOCKED
              </div>
            )}
          </div>

          
          <div className="w-full h-24 bg-slate-950/40 border border-white/5 rounded-xl p-3 font-mono text-[10px] flex flex-col justify-start relative shadow-inner overflow-hidden">
            <div className="absolute top-1 right-2 text-[8px] text-slate-500 tracking-widest uppercase">System logs</div>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-none">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-1.5">
                  <span className="text-cyan-500/50">&gt;</span>
                  <span
                    className={
                      log.type === "tea"
                        ? "text-amber-300"
                        : log.type === "star"
                        ? "text-purple-300 font-bold"
                        : log.type === "success"
                        ? "text-cyan-300 font-bold"
                        : "text-slate-400"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      </main>

      
      {disclaimerOpen && (
        <div className="fixed inset-0 z-[300] bg-black/75 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel-heavy rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col relative animate-in zoom-in-95 duration-200">
            
            <div className="border-b border-cyan-500/20 px-4 py-3 flex justify-between items-center text-cyan-300 text-xs font-bold bg-slate-950/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>COGNITIVE COMPLIANCE</span>
              </div>
              <button
                onClick={() => setDisclaimerOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer font-bold"
              >
                [X]
              </button>
            </div>

            
            <div className="p-6 flex-1 text-xs text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-cyan-500/20">
              <p className="indent-4 text-justify font-sans text-slate-300 leading-relaxed">
                {disclaimer}
              </p>
            </div>

            
            <div className="bg-slate-950/80 px-4 py-3 border-t border-cyan-500/20 flex justify-end">
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
