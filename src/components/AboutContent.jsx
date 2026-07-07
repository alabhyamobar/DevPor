import React, { useState, useRef } from "react";
import { User, Cpu, Code2, Sparkles, Terminal, Layers, Bot, Database, Server, Globe, Zap, ArrowRight, CheckCircle2, Box, Layers3, Flame } from "lucide-react";
import ThreeSkillCanvas from "./ThreeSkillCanvas";
import ThreeSkillIcon from "./ThreeSkillIcon";

const skillCategories = {
  mern: {
    title: "MERN Stack Engineering",
    icon: Server,
    color: "from-cyan-500 via-blue-500 to-emerald-500",
    glow: "shadow-cyan-500/30 border-cyan-500/50 text-cyan-300",
    skills: [
      { name: "React 19 & Next.js", level: "95%", tag: "FRONTEND", desc: "Server components, hooks, state architecture, WebGL" },
      { name: "Node.js & Express.js", level: "92%", tag: "BACKEND", desc: "RESTful APIs, middleware, authentication, async streams" },
      { name: "MongoDB & Mongoose", level: "90%", tag: "DATABASE", desc: "Schema design, aggregation pipelines, Atlas cloud DB" },
      { name: "TailwindCSS & Modern UI", level: "95%", tag: "STYLING", desc: "Glassmorphism, responsive design system, animations" }
    ]
  },
  genai: {
    title: "GenAI & LLM Architecture",
    icon: Bot,
    color: "from-purple-500 via-pink-500 to-rose-500",
    glow: "shadow-purple-500/30 border-purple-500/50 text-purple-300",
    skills: [
      { name: "LLM Integration (Gemini & OpenAI)", level: "92%", tag: "GENAI", desc: "Prompt engineering, function calling, agentic workflows" },
      { name: "RAG & Vector Embeddings", level: "88%", tag: "EMBEDDINGS", desc: "Context injection, semantic search, document retrieval" },
      { name: "AI Agents & LangChain", level: "85%", tag: "AGENTS", desc: "Autonomous task execution, tool use, subagent orchestration" },
      { name: "Neural Fine-tuning", level: "82%", tag: "NEURAL", desc: "Custom knowledge retrieval and model alignment" }
    ]
  }
};

const archAscii = `
       /\\         OS: Arch Linux x86_64
      /  \\        Host: DevPor OS v2.0
     /\\   \\       Specialization: MERN Stack + GenAI (3D WebGL Skill Icons)
    /      \\      Kernel: 6.8.9-arch1-1
   /   ,,   \\     Shell: zsh 5.9
  /   |  |  -\\    WM: Hyprland / Arch Desktop
 /_-''    ''-_\\   Packages: 1337 (pacman)
`;

const Skill3DCard = ({ skill, categoryColor }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 24;
    const rotY = (x / rect.width) * 24;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group transition-all duration-300 ease-out"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative p-5 rounded-2xl border bg-[#0D1627]/90 backdrop-blur-xl transition-all duration-200 ${
          isHovered
            ? "border-cyan-400/80 shadow-2xl shadow-cyan-500/20"
            : "border-slate-700/70 shadow-lg shadow-slate-950/50"
        }`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? "25px" : "0px"})`,
          transformStyle: "preserve-3d"
        }}
      >
        
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-cyan-400/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ transform: "translateZ(10px)" }}
        />

        
        <div className="flex justify-between items-center mb-3" style={{ transform: "translateZ(25px)" }}>
          <div className="flex items-center gap-3">
            
            <ThreeSkillIcon tag={skill.tag} isHovered={isHovered} />

            <div>
              <span className="text-white font-extrabold text-sm block group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400/90 font-bold">
                {skill.tag} 3D MESH
              </span>
            </div>
          </div>

          <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/90 px-2.5 py-1 rounded-full border border-cyan-500/40 shadow-sm">
            {skill.level}
          </span>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed mb-4" style={{ transform: "translateZ(15px)" }}>
          {skill.desc}
        </p>

        
        <div className="space-y-1" style={{ transform: "translateZ(20px)" }}>
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/80 shadow-inner">
            <div
              className={`h-full bg-gradient-to-r ${categoryColor} rounded-full transition-all duration-1000 group-hover:brightness-125`}
              style={{ width: skill.level }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutContent = () => {
  const [activeTab, setActiveTab] = useState("mern");
  const [activeImg, setActiveImg] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const toggleImage = () => {
    setActiveImg((prev) => (prev === 0 ? 1 : 0));
  };

  const currentCategory = skillCategories[activeTab];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-full w-full bg-[#080D1A] text-slate-200 p-6 md:p-8 overflow-y-auto font-sans select-none"
    >
      
      <div
        className="pointer-events-none absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      
      <div className="relative group bg-[#0F172A]/90 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl p-4 md:p-6 mb-8 shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between text-cyan-400 font-mono text-xs mb-3 pb-2 border-b border-cyan-900/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>fastfetch --skills 3d-mesh-icons --stack mern,genai</span>
          </div>
          <span className="text-[10px] text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 font-bold">
            3D WEBGL ICONS: ONLINE
          </span>
        </div>
        <pre className="font-mono text-xs md:text-sm text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre font-bold">
          {archAscii}
        </pre>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
        
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-purple-950/80 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-mono mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Full-Stack MERN & GenAI Engineer</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-3">
              HI! I'M{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                ALABHYA MOBAR
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
              I architect high-performance <strong className="text-cyan-400 font-semibold">MERN Stack</strong> applications integrated with cutting-edge <strong className="text-purple-400 font-semibold">Generative AI & LLM workflows</strong>. I turn complex full-stack logic and neural APIs into ultra-fluid, interactive 3D web experiences.
            </p>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group p-4 bg-[#0F172A]/90 border border-cyan-500/30 hover:border-cyan-400/70 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                MERN Stack Engineering
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                MongoDB, Express, React 19, Node.js — building scalable APIs, state architectures, and robust cloud databases.
              </p>
            </div>

            <div className="group p-4 bg-[#0F172A]/90 border border-purple-500/30 hover:border-purple-400/70 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1 group-hover:text-purple-300 transition-colors">
                GenAI & LLM Architecture
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Prompt engineering, RAG context retrieval, AI agents, OpenAI & Gemini APIs, and autonomous subagent pipelines.
              </p>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            onClick={toggleImage}
            className="relative w-full max-w-sm h-84 rounded-2xl overflow-hidden border-2 border-cyan-500/40 hover:border-cyan-400 shadow-2xl group cursor-pointer bg-slate-900 transition-all duration-500 hover:shadow-cyan-500/25"
          >
            <img
              src={activeImg === 0 ? "/images/about.png" : "/images/about2.png"}
              alt="Alabhya Mobar"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-300 bg-slate-950/90 px-3 py-1 rounded-full border border-cyan-500/40 backdrop-blur-md">
                Avatar Mode: {activeImg === 0 ? "Default" : "Revealed"}
              </span>
              <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-500/40 flex items-center gap-1">
                Click to Swap <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <button
            onClick={toggleImage}
            className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold text-xs md:text-sm rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Layers className="w-4 h-4" /> Switch Avatar View
          </button>
        </div>
      </div>

      
      <div className="bg-[#0F172A]/90 border border-slate-700/60 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-700/60">
          <div>
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <Layers3 className="w-5 h-5 text-cyan-400" /> Technical Skills & 3D Geometries
            </h2>
            <p className="text-slate-400 text-xs font-mono mt-0.5">Real-time WebGL 3D skill icons + interactive 3D parallax cards</p>
          </div>

          
          <div className="flex flex-wrap gap-2">
            {Object.keys(skillCategories).map((key) => {
              const cat = skillCategories[key];
              const Icon = cat.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === key
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 scale-105"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-4 h-64 bg-[#080D1A]/90 border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between relative shadow-xl overflow-hidden group">
            <div className="text-[11px] font-mono text-cyan-400 font-semibold z-10 flex items-center justify-between">
              <span>WebGL 3D Core</span>
              <span className="text-[10px] text-purple-400 border border-purple-800 px-2 py-0.5 rounded bg-purple-950/60">
                {activeTab.toUpperCase()} MESH
              </span>
            </div>

            <ThreeSkillCanvas category={activeTab} />

            <div className="text-[10px] text-slate-400 font-mono text-center z-10">
              Hover cards to spin 3D WebGL Skill Icons
            </div>
          </div>

          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.skills.map((skill) => (
              <Skill3DCard
                key={skill.name}
                skill={skill}
                categoryColor={currentCategory.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
