import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const RouteTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const columnsRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        gsap.set(columnsRef.current, { y: "-100%" });
      }
    });

    tl.to(columnsRef.current, {
      y: "0%",
      duration: 0.45,
      stagger: 0.05,
      ease: "power3.inOut"
    });

    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out"
    }, "-=0.2");

    tl.call(() => {
      setDisplayLocation(location);
    });

    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, "+=0.1");

    tl.to(columnsRef.current, {
      y: "100%",
      duration: 0.45,
      stagger: 0.05,
      ease: "power3.inOut"
    }, "-=0.1");

  }, [location, displayLocation.pathname]);

  return (
    <div className="relative w-full min-h-screen">
      <div className="w-full min-h-screen">
        {React.cloneElement(children, { location: displayLocation })}
      </div>

      <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (columnsRef.current[i] = el)}
            className="w-1/5 h-full bg-[#0c1620] border-r border-cyan-400/5 relative transform -translate-y-full flex flex-col justify-center items-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_6px] pointer-events-none opacity-40" />
          </div>
        ))}
      </div>

      <div
        ref={textRef}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center pointer-events-none opacity-0 select-none"
      >
        <div className="font-mono text-cyan-400 font-black text-sm md:text-base tracking-[0.25em] flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
          <span>CONNECTING PORTAL</span>
        </div>
        <div className="text-[9px] text-slate-500 font-mono tracking-[0.25em] mt-3 uppercase font-semibold">
          Synchronizing Secure Shell Environment
        </div>
      </div>
    </div>
  );
};

export default RouteTransition;
