import React from "react";
import ProjectsContent from "../components/ProjectsContent";
import { Folder, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#0B132B] flex flex-col">
      
      <div className="h-10 bg-[#1E293B] border-b border-slate-700 px-4 flex justify-between items-center text-slate-200 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-cyan-400" />
          <span>File Manager - /home/alabhya/projects</span>
        </div>
        <button
          onClick={() => navigate("/devpor/desktop")}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Desktop
        </button>
      </div>

      
      <div className="flex-1 overflow-hidden">
        <ProjectsContent />
      </div>
    </div>
  );
};

export default Projects;