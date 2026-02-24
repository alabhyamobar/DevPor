import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "../components/Button";
import Windows from "./Windows";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 480;
const AUTOPLAY_END = 384;

const Landing = () => {
  const canvasRef = useRef(null);
  const frame = useRef({ current: 0 });

  // frame cache (IMPORTANT)
  const cache = useRef({});
  const currentImage = useRef(null);

  const [button, setButton] = useState(false);
  const [boot, setBoot] = useState(false);

  const getFrameSrc = (index) =>
    `/devpor/frames/webp/frame_${index.toString().padStart(4, "0")}.webp`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;

      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

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

      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const scale = Math.max(
        canvasWidth / img.width,
        canvasHeight / img.height,
      );

      const x = (canvasWidth - img.width * scale) / 2;
      const y = (canvasHeight - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      currentImage.current = img;

      for (let i = 1; i <= 5; i++) {
        const nextIndex = index + i;

        if (nextIndex < TOTAL_FRAMES && !cache.current[nextIndex]) {
          const nextImg = new Image();
          nextImg.src = getFrameSrc(nextIndex + 1);
          cache.current[nextIndex] = nextImg;
        }
      }

      const keys = Object.keys(cache.current);
      if (keys.length > 100) {
        delete cache.current[keys[0]];
      }
    };

    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);

    gsap.to(frame.current, {
      current: AUTOPLAY_END,
      duration: AUTOPLAY_END / 60,
      ease: "none",
      onUpdate: () => render(frame.current.current),

      onComplete: () => {
        gsap.to(frame.current, {
          current: TOTAL_FRAMES - 1,
          ease: "none",

          scrollTrigger: {
            trigger: canvas,
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,

            onLeave: (self) => {
              frame.current.current = TOTAL_FRAMES - 1;
              render(frame.current.current);

              self.disable();
              setButton(true);
            },
          },

          onUpdate: () => render(frame.current.current),
        });
      },
    });

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="h-[300vh] relative">
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
