import React, { useEffect } from "react";
import PrimaryLoading from "./components/PrimaryLoading";
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Windows from "./Pages/Windows";
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
        <Route path={"/devpor/"} element={<PrimaryLoading />} />
        <Route path={"/devpor/landing"} element={<Landing />} />
      </Routes>
    </>
  );
};

export default App;
