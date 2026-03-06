import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/alabhyamobar/",
    color: "hover:text-pink-500",
    glow: "hover:shadow-pink-500/40",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/alabhya-mobar-8b44b3307/",
    color: "hover:text-blue-500",
    glow: "hover:shadow-blue-500/40",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com/alabhyamobar",
    color: "hover:text-purple-400",
    glow: "hover:shadow-purple-400/40",
  },
];

const BottomNav = () => {
  return (
    <div
      className="absolute h-[8vh] w-[40%] backdrop-blur-lg bg-white/5 border border-white/10 z-10 bottom-10 left-1/2 transform -translate-x-1/2 rounded-2xl flex justify-center items-center gap-8 shadow-xl"
    >
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative text-gray-300 text-3xl transition-all duration-300 hover:scale-125 ${link.color} ${link.glow} hover:shadow-lg p-2 rounded-full`}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default BottomNav;