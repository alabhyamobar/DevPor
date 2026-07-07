import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, Cpu, ShieldAlert, ChevronRight, Play, Flame } from "lucide-react";

const PrimaryLoading = () => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState("ESTABLISHING NEURAL LINK...");
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [linkComplete, setLinkComplete] = useState(false);
  
  const navigate = useNavigate();
  const terminalEndRef = useRef(null);

  const disclaimer =
    "Yeh website poori tarah se mere sapno, imagination, aur countless late-night coding sessions se inspired hai. Har element, har animation, aur har pixel carefully design kiya gaya hai taaki aapko sirf ek website nahi, balki ek experience mile. Agar kahin thodi imperfections dikhe, toh samajh lijiye ki reality abhi bhi perfection ko catch up kar rahi hai. Yeh space meri creativity, learning, aur growth ka digital reflection hai — so scroll kariye, explore kariye, aur iss journey ka hissa baniye.";

  const addLog = (text, type = "sys") => {
    setLogs((prev) => [...prev, { text, type, id: Math.random() }]);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    let currentVal = 0;
    
    const logPool = [
      { text: "ESTABLISHING NEURAL INTERFACE LINK...", type: "sys" },
      { text: "DOWNLOADING CREATIVE ENGINE CORRELATIONS...", type: "sys" },
      { text: "RESOLVING COGNITIVE DISSOSANCE IN LOGIC MODULES...", type: "warn" },
      { text: "INJECTING TEA-POWERED BRAIN FUEL (LATE_NIGHT.SYS)...", type: "sys" },
      { text: "BYPASSING CONVENTIONAL DESIGN SANITY LIMITS...", type: "sys" },
      { text: "STABILIZING WEBGL INTERPOLATION CHUNKS...", type: "sys" },
      { text: "OVERCLOCKING SYSTEM CORE INTERFACES...", type: "sys" },
      { text: "LINKING GEOMETRIES AND PARTICLE DYNAMICS...", type: "sys" },
      { text: "LOAD STABLE. READY FOR COGNITIVE ENGAGEMENT.", type: "success" },
    ];

    addLog("BOOTING DEVPOR CORE ENGINE v2.0.4...", "sys");

    const interval = setInterval(() => {
      let increment = 1;
      if (currentVal < 30) {
        increment = Math.floor(Math.random() * 8) + 3;
      } else if (currentVal >= 30 && currentVal < 70) {
        increment = Math.floor(Math.random() * 3) + 1;
      } else if (currentVal >= 70 && currentVal < 88) {
        increment = Math.random() > 0.85 ? 1 : 0; 
      } else if (currentVal >= 88 && currentVal < 98) {
        increment = Math.random() > 0.7 ? 1 : 0; 
      } else {
        increment = Math.floor(Math.random() * 2) + 1;
      }

      const prevVal = currentVal;
      currentVal = Math.min(currentVal + increment, 100);
      setProgress(currentVal);

      if (currentVal >= 12 && prevVal < 12) addLog(logPool[0].text, logPool[0].type);
      if (currentVal >= 25 && prevVal < 25) addLog(logPool[1].text, logPool[1].type);
      if (currentVal >= 40 && prevVal < 40) addLog(logPool[2].text, logPool[2].type);
      if (currentVal >= 52 && prevVal < 52) addLog(logPool[3].text, logPool[3].type);
      if (currentVal >= 65 && prevVal < 65) addLog(logPool[4].text, logPool[4].type);
      if (currentVal >= 74 && prevVal < 74) addLog(logPool[5].text, logPool[5].type);
      if (currentVal >= 85 && prevVal < 85) addLog(logPool[6].text, logPool[6].type);
      if (currentVal >= 88 && prevVal < 88) addLog("RESOLVING PIXEL INDEX CHUNKS... (STALLING)", "warn");
      if (currentVal >= 93 && prevVal < 93) addLog(logPool[7].text, logPool[7].type);
      
      if (currentVal < 25) setCurrentStep("CONNECTING TO COGNITIVE CORE...");
      else if (currentVal < 50) setCurrentStep("PARSING DEVELOPMENT MANIFESTO...");
      else if (currentVal < 75) setCurrentStep("SYNCHRONIZING AUDIO AND WEBGL SHADERS...");
      else if (currentVal < 88) setCurrentStep("OPTIMIZING USER FRAME CACHE...");
      else if (currentVal < 100) setCurrentStep("FINAL NEURAL LINK INITIALIZATION...");
      else {
        setCurrentStep("SYSTEM SYNC COMPLETE // INTERFACE STABLE");
        addLog(logPool[8].text, logPool[8].type);
        setLinkComplete(true);
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  const circum = 2 * Math.PI * 70;
  const strokeOffset = circum - (progress / 100) * circum;

  return (
    <div className="min-h-screen w-screen bg-[#040814] relative overflow-hidden flex flex-col font-mono text-slate-200 select-none scanline-overlay">
      
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes pulse-cyan {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 12s linear infinite;
        }
        .scanline-overlay::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(6, 182, 212, 0.04), rgba(0, 255, 0, 0.01), rgba(6, 182, 212, 0.04));
          z-index: 99;
          background-size: 100% 4px, 6px 100%;
          pointer-events: none;
        }
        .scanline-movement {
          width: 100%;
          height: 8px;
          background: linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.2), transparent);
          position: absolute;
          z-index: 100;
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
        .glitch-hover:hover {
          animation: glitch 0.3s linear infinite;
        }
        .grid-bg {
          background-image: 
            linear-gradient(to right, rgba(6, 182, 212, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .pulse-cyan-glow {
          animation: pulse-cyan 2s infinite;
        }
      `}</style>

      
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="scanline-movement" />

      
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-cyan-500/20 bg-slate-950/40 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div>
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 font-mono">COGNITIVE COMPILING INTERFACE</h2>
            <p className="text-[10px] text-slate-500">DEVPOR_OS v2.04 // SECURE STABLE LINK</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-bold text-cyan-400/90 tracking-widest uppercase">SYNC ACTIVE</span>
        </div>
      </header>

      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8 flex flex-col items-center justify-between relative z-10">
        
        <div className="w-full flex justify-between text-[10px] text-slate-500 border-b border-cyan-500/10 pb-2">
          <span>LATENCY: 24MS // MEM_USAGE: 43%</span>
          <span>DEV_LINK: ACTIVE</span>
        </div>

        
        <div className="flex-1 flex flex-col items-center justify-center py-6 w-full relative">
          
          <div className="absolute w-[280px] h-[280px] border border-cyan-500/10 rounded-full animate-spin-slow pointer-events-none flex items-center justify-center">
            <div className="w-[260px] h-[260px] border-2 border-dashed border-cyan-500/20 rounded-full" />
          </div>
          <div className="absolute w-[320px] h-[320px] border-r-2 border-l-2 border-cyan-400/20 rounded-full animate-spin-reverse-slow pointer-events-none" />

          
          <div className="relative w-48 h-48 flex items-center justify-center bg-cyan-950/20 rounded-full border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="70"
                className="stroke-slate-800 fill-none"
                strokeWidth="6"
              />
              <circle
                cx="96"
                cy="96"
                r="70"
                className="stroke-cyan-400 fill-none drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                strokeWidth="6"
                strokeDasharray={circum}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.1s ease" }}
              />
            </svg>
            <div className="flex flex-col items-center z-10">
              <span className="text-4xl font-black text-cyan-400 tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                {progress}%
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400/70 uppercase font-semibold mt-1">
                SYNAPSE
              </span>
            </div>
          </div>

          
          <div className="mt-8 text-center max-w-md">
            <div className="text-xs font-bold text-cyan-400 tracking-widest flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              {currentStep}
            </div>
            <div className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-wider">
              EST. LOADING TIME VARIES BASED ON IMAGINATION SPARK
            </div>
          </div>
        </div>

        
        <div className="w-full flex flex-col gap-4">
          
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => setDisclaimerOpen(true)}
              className="flex items-center gap-2 border border-yellow-500/40 hover:border-yellow-400 bg-yellow-950/20 hover:bg-yellow-900/30 px-4 py-2 rounded-lg text-yellow-400 text-xs font-semibold tracking-wider transition-all duration-300 shadow-md shadow-yellow-950/40 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-yellow-500" />
              READ DEVELOPMENT DISCLAIMER
            </button>

            {linkComplete ? (
              <button
                onClick={() => navigate("/landing")}
                className="flex items-center gap-2 border-2 border-cyan-400 bg-cyan-500/10 hover:bg-cyan-400 hover:text-[#040814] px-6 py-2.5 rounded-lg text-cyan-400 font-extrabold text-sm tracking-widest transition-all duration-300 shadow-lg shadow-cyan-500/30 animate-pulse glitch-hover cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                INITIATE SYSTEM LINK
              </button>
            ) : (
              <div className="flex items-center gap-2 border border-slate-700/60 bg-slate-900/30 px-6 py-2.5 rounded-lg text-slate-500 text-sm tracking-widest cursor-not-allowed">
                <Flame className="w-4 h-4 text-slate-600 animate-pulse" />
                LINK LOCK ACTIVE
              </div>
            )}
          </div>

          
          <div className="w-full h-32 bg-slate-950/80 border border-cyan-500/30 rounded-xl p-3 font-mono text-[11px] flex flex-col justify-start relative shadow-inner overflow-hidden">
            <div className="absolute top-1 right-2 text-[9px] text-cyan-400/50">CONSOLE LOGS</div>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-cyan-500/30">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2">
                  <span className="text-cyan-500/70 select-none">&gt;</span>
                  <span
                    className={
                      log.type === "warn"
                        ? "text-yellow-400"
                        : log.type === "success"
                        ? "text-cyan-400 font-bold"
                        : "text-slate-300"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </main>

      
      <footer className="w-full px-6 py-3 border-t border-cyan-500/20 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between font-mono relative z-10">
        <span>© 2026 ALABHYA MOBAR. ALL RIGHTS SECURED.</span>
        <span>CREATIVE DIRECTIVE // ANIME EDITION</span>
      </footer>

      
      {disclaimerOpen && (
        <div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#090D16]/95 border-2 border-cyan-500 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden font-mono flex flex-col relative animate-in zoom-in-95 duration-200">
            
            <div className="bg-[#1E293B] border-b border-cyan-500/30 px-4 py-2.5 flex justify-between items-center text-cyan-400 text-xs font-bold">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-yellow-500" />
                <span>CONFIDENTIAL SYSTEM STATEMENT</span>
              </div>
              <button
                onClick={() => setDisclaimerOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                [X]
              </button>
            </div>

            
            <div className="p-6 flex-1 text-xs text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto pr-4">
              <div className="mb-4 text-yellow-400 font-bold tracking-widest text-[10px] uppercase">
                // SYSTEM MANIFESTO & DISCLAIMER
              </div>
              <p className="indent-4 mb-4 text-justify">
                {disclaimer}
              </p>
              <div className="border-t border-slate-700/60 pt-3 text-[10px] text-slate-500">
                LINK AUTHENTICITY CODE: CRATIVE-CORE-LINK-OK-2026
              </div>
            </div>

            
            <div className="bg-[#0B132B] px-4 py-3 border-t border-cyan-500/30 flex justify-end">
              <button
                onClick={() => setDisclaimerOpen(false)}
                className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-400 text-[#040814] font-black text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-md shadow-cyan-950/50"
              >
                <span>ACKNOWLEDGE STATEMENTS</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimaryLoading;
