import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "../components/Button";
import Windows from "./Windows";

gsap.registerPlugin(ScrollTrigger);

const MAX_CACHE = 120;

const Landing = () => {
  const canvasRef = useRef(null);
  const frame = useRef({ current: 0 });

  const cache = useRef({});
  const currentImage = useRef(null);

  const [button, setButton] = useState(false);
  const [boot, setBoot] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const checkBreakpoint = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile !== isMobileOrTablet) {
        setIsMobileOrTablet(isMobile);
      }
    };
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [isMobileOrTablet]);

  useEffect(() => {
    cache.current = {};

    const totalFrames = isMobileOrTablet ? 192 : 480;
    const getFrameSrc = (index) =>
      isMobileOrTablet
        ? `/frames/mobile_webp50/frame_${index.toString().padStart(4, "0")}.webp`
        : `/frames/webp50/frame_${index.toString().padStart(4, "0")}.webp`;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let canvasWidth = 0;
    let canvasHeight = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvasWidth = rect.width;
      canvasHeight = rect.height;

      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      render(frame.current.current);
    };

    const render = (index) => {
      index = Math.floor(index);

      if (!cache.current[index]) {
        const img = new Image();
        img.src = getFrameSrc(index + 1);
        cache.current[index] = img;
      }

      const img = cache.current[index];

      if (!img.complete) {
        img.onload = () => render(index);
        return;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const scale = Math.max(
        canvasWidth / img.width,
        canvasHeight / img.height,
      );

      const x = (canvasWidth - img.width * scale) / 2;
      const y = (canvasHeight - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      currentImage.current = img;

      for (let i = 1; i <= 6; i++) {
        const nextIndex = index + i;

        if (nextIndex < totalFrames && !cache.current[nextIndex]) {
          const nextImg = new Image();
          nextImg.src = getFrameSrc(nextIndex + 1);
          cache.current[nextIndex] = nextImg;
        }
      }

      const keys = Object.keys(cache.current);

      if (keys.length > MAX_CACHE) {
        delete cache.current[keys[0]];
      }
    };

    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);


    gsap.to(frame.current, {
      current: totalFrames - 1,
      ease: "none",

      scrollTrigger: {
        trigger: canvas,
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true,

        onLeave: (self) => {
          frame.current.current = totalFrames - 1;
          render(frame.current.current);

          self.disable();
          setButton(true);
        },
      },

      onUpdate: () => render(frame.current.current),
    });

    return () => {
      window.removeEventListener("resize", setCanvasSize);

      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobileOrTablet]);

  return (
    <div className="h-[400vh] relative">
      <canvas ref={canvasRef} className="sticky top-0 w-full h-screen" />

      <Button
        onClick={() => setBoot(!boot)}
        show={button}
        className="border-2 border-black"
      />

      <Windows show={boot} />
    </div>
  );
};

export default Landing;
