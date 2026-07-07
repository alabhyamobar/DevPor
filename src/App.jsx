import React, { useEffect } from "react";
import PrimaryLoading from "./components/PrimaryLoading";
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Windows from "./Pages/Windows";
import Desktop from "./Pages/Desktop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Projects from "./Pages/Projects";
import.meta.env.VITE_BASE_URL;

const App = () => {
  function useClickCoordinates() {
    useEffect(() => {
      const handleClick = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        console.log("X:", x, "Y:", y);
      };

      window.addEventListener("click", handleClick);

      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, []);
  }

  useClickCoordinates();

  return (
    <>
      <Routes>
        <Route path={"/"} element={<PrimaryLoading />} />
        <Route path={"/devpor"} element={<PrimaryLoading />} />
        <Route path={"/landing"} element={<Landing />} />
        <Route path={"/devpor/landing"} element={<Landing />} />
        <Route path={"/desktop"} element={<Desktop />} />
        <Route path={"/devpor/desktop"} element={<Desktop />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/devpor/about"} element={<About />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/devpor/contact"} element={<Contact />} />
        <Route path={"/projects"} element={<Projects />} />
        <Route path={"/devpor/projects"} element={<Projects />} />
      </Routes>
    </>
  );
};

export default App;
