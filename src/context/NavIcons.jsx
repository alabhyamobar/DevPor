import React, { createContext } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { TbTerminal2 } from "react-icons/tb";

const NavIcons = () => {
  const IconContext = createContext();
  const Icons = [
    {
      id: "linkedin",
      icon: FaLinkedin,
      link: "https://linkedin.com/in/yourusername",
      color: "text-[#0A66C2]",
    },
    {
      id: "github",
      icon: FaGithub,
      link: "https://github.com/yourusername",
      color: "text-white",
    },
    {
      id: "instagram",
      icon: FaInstagram,
      link: "https://instagram.com/yourusername",
      color: "text-pink-500",
    },
    {
      id: "x",
      icon: FaXTwitter,
      link: "https://x.com/yourusername",
      color: "text-white",
    },
    {
      id: "vscode",
      icon: VscVscode,
      link: "https://code.visualstudio.com/",
      color: "text-[#007ACC]",
    },
    {
      id: "website",
      icon: FaGlobe,
      link: "https://yourportfolio.com",
      color: "text-green-400",
    },
    {
      id: "terminal",
      icon: TbTerminal2,
      action: "openTerminal",
      color: "text-green-500",
    },
    {
      id: "resume",
      icon: FaFileAlt,
      link: "/resume.pdf",
      color: "text-yellow-400",
    },
  ];
  return <div>NavIcons</div>;
};

export default NavIcons;
