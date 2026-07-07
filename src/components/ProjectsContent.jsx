import React, { useState } from "react";
import {
  Folder,
  ExternalLink,
  Github,
  Star,
  Code,
  Sparkles,
  Search,
  LayoutGrid,
  List,
  Terminal,
  Copy,
  Check,
  X,
  ShieldCheck,
  Cpu,
  Layers,
  Tag,
  ArrowUpRight,
  Eye,
  GitFork,
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";

const projectList = [
  {
    id: "devpor-os",
    title: "DevPor Arch Linux OS",
    category: "Web Applications",
    version: "v2.5.0",
    status: "PRODUCTION",
    image: "/images/devpor_os_preview.png",
    description:
      "An interactive Arch Linux-inspired Desktop portfolio featuring custom window manager, neofetch, terminal contact form, bootloader simulation, and responsive quad matrix mapping.",
    longDescription:
      "DevPor is a full-featured Arch Linux web operating system built right into the browser. It features a window management system with drag & drop support, floating windows, interactive z-indexing, terminal emulator, audio system, wallpaper customizer, and an embedded Flappy Bird mini-game.",
    architecture: [
      "React 19 Window Management Engine",
      "TailwindCSS & Glassmorphic UI System",
      "GSAP Timeline Animations",
      "HTML5 Web Audio & Interactive Canvas"
    ],
    features: [
      "Draggable, Minimizable & Maximizable desktop windows",
      "Interactive Bash shell terminal with command execution",
      "Dynamic Wallpaper Switcher with custom theme support",
      "Retro Arcade Mini-Game (Flappy Arch)"
    ],
    command: "git clone https://github.com/alabhyamobar/devpor.git && cd devpor && npm install && npm run dev",
    tags: ["React 19", "TailwindCSS", "GSAP", "Vite", "JavaScript"],
    github: "https://github.com/alabhyamobar/devpor",
    demo: "https://alabhyamobar.github.io/devpor",
    featured: true,
    stars: 142,
    forks: 38
  },
  {
    id: "3d-canvas-app",
    title: "Interactive 3D Web Experience",
    category: "3D Experiences",
    version: "v1.8.2",
    status: "ACTIVE",
    image: "/images/webgl_3d_preview.png",
    description:
      "High-performance WebGL & Three.js canvas featuring custom shaders, particle simulations, dynamic lighting, and camera orbit controls.",
    longDescription:
      "An immersive 3D web application exploring interactive GLSL fragment shaders, particle physics simulation, real-time audio reactivity, and 60 FPS WebGL rendering built on React Three Fiber.",
    architecture: [
      "Three.js & React Three Fiber (R3F)",
      "Custom GLSL Shader Pipelines",
      "Drei Controls & Post-Processing",
      "Web Audio API Analyzer"
    ],
    features: [
      "100,000+ interactive particle simulation running smoothly at 60fps",
      "Custom GLSL shader material with dynamic noise displacement",
      "Interactive lighting, bloom post-processing, and camera parallax",
      "Audio-reactive visual displacement mode"
    ],
    command: "git clone https://github.com/alabhyamobar/3d-canvas.git && cd 3d-canvas && npm i && npm run dev",
    tags: ["Three.js", "GLSL", "React Three Fiber", "WebGL", "Vite"],
    github: "https://github.com/alabhyamobar",
    demo: "#",
    featured: true,
    stars: 98,
    forks: 21
  },
  {
    id: "fullstack-platform",
    title: "Modern Web Platform & API",
    category: "Full-Stack",
    version: "v3.1.0",
    status: "STABLE",
    image: "/images/fullstack_app_preview.png",
    description:
      "Full-stack web application featuring user authentication, real-time data streaming, RESTful API endpoints, and dark mode interface.",
    longDescription:
      "A robust scalable web platform with automated user management, microservices backend architecture, WebSockets real-time sync, JWT auth, and interactive dark mode dashboard data visualizations.",
    architecture: [
      "Node.js & Express RESTful API backend",
      "MongoDB Atlas with Mongoose Schemas",
      "React Frontend with State Management",
      "JWT Auth & Socket.io Real-time Streams"
    ],
    features: [
      "Role-Based Access Control (RBAC) & OAuth2 authentication",
      "Real-time analytics engine with WebSocket streaming",
      "Optimized MongoDB indexing and pagination queries",
      "Automated CI/CD workflow with Docker containerization"
    ],
    command: "git clone https://github.com/alabhyamobar/fullstack-platform.git && npm run setup",
    tags: ["Node.js", "Express", "MongoDB", "React", "TailwindCSS"],
    github: "https://github.com/alabhyamobar",
    demo: "#",
    featured: false,
    stars: 64,
    forks: 15
  },
  {
    id: "terminal-tools",
    title: "Developer CLI & Utility Suite",
    category: "Web Applications",
    version: "v1.2.0",
    status: "MAINTAINED",
    image: "/images/cli_utility_preview.png",
    description:
      "A suite of developer utility scripts, custom shell commands, and automated deployment pipelines for modern web applications.",
    longDescription:
      "A productivity toolkit for full-stack developers providing automated git hooks, Arch Linux configuration scripts, system diagnostic tools, and custom terminal UI interfaces.",
    architecture: [
      "Bash Shell Scripting & POSIX Automation",
      "Python System Profiling Modules",
      "Node.js CLI Framework (Commander / Inquirer)",
      "Docker & Shell Deployment Pipelines"
    ],
    features: [
      "Automated dotfiles installer & environment bootstrap",
      "System resource diagnostic utility with rich CLI graphs",
      "Git branch clean-up & interactive commit wizard",
      "One-command multi-environment cloud deployment"
    ],
    command: "curl -sSL https://raw.githubusercontent.com/alabhyamobar/terminal-tools/main/install.sh | bash",
    tags: ["Bash", "Python", "Node.js", "Git", "Docker"],
    github: "https://github.com/alabhyamobar",
    demo: "#",
    featured: false,
    stars: 45,
    forks: 9
  }
];

const categories = ["All", "Web Applications", "3D Experiences", "Full-Stack"];

const getTagBadgeColor = (tag) => {
  switch (tag.toLowerCase()) {
    case "react 19":
    case "react":
      return "bg-cyan-500/15 text-cyan-300 border-cyan-500/40";
    case "three.js":
    case "react three fiber":
    case "webgl":
    case "glsl":
      return "bg-purple-500/15 text-purple-300 border-purple-500/40";
    case "tailwindcss":
      return "bg-sky-500/15 text-sky-300 border-sky-500/40";
    case "node.js":
    case "express":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
    case "mongodb":
      return "bg-green-500/15 text-green-300 border-green-500/40";
    case "python":
    case "bash":
      return "bg-amber-500/15 text-amber-300 border-amber-500/40";
    case "gsap":
    case "vite":
      return "bg-pink-500/15 text-pink-300 border-pink-500/40";
    default:
      return "bg-slate-800/80 text-slate-300 border-slate-700/60";
  }
};

const ProjectsContent = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); 
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [starredMap, setStarredMap] = useState({});

  const toggleStar = (id, e) => {
    e?.stopPropagation();
    setStarredMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, id, e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProjects = projectList.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const matchesQuery =
      searchQuery.trim() === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesQuery;
  });

  const totalFeatured = projectList.filter((p) => p.featured).length;

  return (
    <div className="h-full w-full bg-[#090E1A] text-slate-200 p-4 sm:p-6 md:p-8 overflow-y-auto font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      
      <div className="relative z-10 mb-6 bg-[#111C33]/90 border border-slate-700/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl shadow-cyan-950/20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          
          
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-gradient-to-br from-cyan-950 to-blue-950 border border-cyan-500/40 rounded-xl text-cyan-400 shadow-md shadow-cyan-500/10">
              <Folder className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white font-bold text-xl tracking-tight">Project Explorer</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/80">
                  LIVE REPO
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono mt-0.5 flex items-center gap-2">
                <span className="text-cyan-400">alabhya@archlinux</span>:
                <span className="text-slate-300">~/projects</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">
                  Showing {filteredProjects.length} of {projectList.length} repositories
                </span>
              </p>
            </div>
          </div>

          
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Featured:</span>
              <span className="text-amber-400 font-bold">{totalFeatured}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Status:</span>
              <span className="text-emerald-400 font-bold">100% ONLINE</span>
            </div>
            
            
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="List View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          
          
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? projectList.length
                  : projectList.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]"
                      : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive
                        ? "bg-slate-950/40 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-mono transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

      
      {filteredProjects.length === 0 ? (
        /* Empty Search Results State */
        <div className="relative z-10 bg-[#111C33]/60 border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center mt-8">
          <div className="p-4 bg-slate-900/80 rounded-full border border-slate-800 text-cyan-400 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-white text-lg font-bold mb-1">No Projects Found</h3>
          <p className="text-slate-400 text-xs font-mono max-w-md mb-6">
            No repositories matched standard query "{searchQuery}". Try adjusting your category filter or search terms.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono rounded-xl transition-all shadow-md shadow-cyan-500/20"
          >
            Reset Filters & Search
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW LAYOUT */
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isStarred = !!starredMap[project.id];

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#111C33]/80 border border-slate-700/60 hover:border-cyan-500/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-cyan-500/15 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div>
                  
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-slate-800/80 group">
                    
                    <div className="absolute top-0 inset-x-0 h-7 bg-slate-950/80 backdrop-blur-md px-3 flex items-center justify-between z-20 border-b border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">
                        {project.id}.app
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                        {project.status}
                      </span>
                    </div>

                    
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover pt-7 group-hover:scale-105 transition-transform duration-500"
                    />

                    
                    <div className="absolute inset-0 pt-7 bg-gradient-to-t from-[#111C33] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    
                    <button
                      onClick={(e) => toggleStar(project.id, e)}
                      title={isStarred ? "Starred" : "Star project"}
                      className={`absolute top-9 right-3 z-20 p-2 rounded-xl backdrop-blur-md border transition-all ${
                        isStarred
                          ? "bg-amber-500/20 border-amber-500/60 text-amber-400"
                          : "bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-amber-400 hover:border-amber-500/40"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isStarred ? "fill-amber-400" : ""
                        }`}
                      />
                    </button>
                  </div>

                  
                  <div className="p-5 sm:p-6">
                    
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                        <Code className="w-3 h-3" /> {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-amber-300 text-[11px] font-mono flex items-center gap-1 bg-amber-950/70 border border-amber-700/60 px-2 py-0.5 rounded-md font-semibold">
                          <Sparkles className="w-3 h-3 text-amber-400" /> Featured
                        </span>
                      )}
                    </div>

                    
                    <h3 className="text-white text-lg font-bold group-hover:text-cyan-300 transition-colors mb-2 flex items-center justify-between">
                      <span>{project.title}</span>
                      <span className="text-xs font-mono text-slate-500">
                        {project.version}
                      </span>
                    </h3>

                    
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-mono border px-2.5 py-0.5 rounded-md ${getTagBadgeColor(
                            tag
                          )}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                
                <div className="px-5 py-3.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Star className="w-3.5 h-3.5 text-amber-400" /> {project.stars}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <GitFork className="w-3.5 h-3.5 text-slate-400" /> {project.forks}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                      title="Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-slate-950 bg-cyan-950/80 hover:bg-cyan-400 border border-cyan-800 hover:border-cyan-400 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* COMPACT LIST VIEW LAYOUT */
        <div className="relative z-10 bg-[#111C33]/80 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Repository</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Tech Stack</th>
                  <th className="py-3 px-4 text-center">Version</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40">
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                            <span>{project.title}</span>
                            {project.featured && (
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                          <div className="text-slate-400 text-[11px] font-sans line-clamp-1 max-w-md">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px]">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-900/80 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center text-slate-400">
                      {project.version}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-2.5 py-1 text-cyan-400 hover:bg-cyan-950/80 border border-cyan-800/80 rounded-lg font-semibold text-[11px] transition-all cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111C33] border border-cyan-500/40 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/20 text-slate-200 p-6 relative flex flex-col"
          >
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900/80 border border-slate-700/80 rounded-xl transition-all cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            
            <div className="relative rounded-xl overflow-hidden border border-slate-800 mb-6 bg-slate-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111C33] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/90 border border-cyan-800 px-2.5 py-1 rounded-md">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    {selectedProject.title}
                  </h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/90 border border-emerald-800 px-2.5 py-1 rounded-md font-semibold">
                  {selectedProject.status}
                </span>
              </div>
            </div>

            
            <div className="space-y-6">
              
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Overview
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Key Architecture
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedProject.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                
                <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4">
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Major Features
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Quick Setup Command
                </h4>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between font-mono text-xs text-emerald-400 overflow-x-auto">
                  <span className="select-all truncate mr-4">
                    {selectedProject.command}
                  </span>
                  <button
                    onClick={(e) => copyToClipboard(selectedProject.command, "modal", e)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Copy command"
                  >
                    {copiedId === "modal" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-purple-400" /> Tech Stack Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-mono border px-3 py-1 rounded-lg ${getTagBadgeColor(
                        tag
                      )}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl transition-all"
              >
                <Github className="w-4 h-4" /> View Repository
              </a>

              {selectedProject.demo && selectedProject.demo !== "#" && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 border border-cyan-400 px-5 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  <ExternalLink className="w-4 h-4" /> Launch Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsContent;
