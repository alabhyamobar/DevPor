import React, { useState, useEffect } from "react";
import BootLoader from "../components/BootLoader";
import ArchWindow from "../components/ArchWindow";

function getTransformToQuad(x0, y0, x1, y1, x2, y2, x3, y3) {
  const dx1 = x1 - x2, dy1 = y1 - y2;
  const dx2 = x3 - x2, dy2 = y3 - y2;
  const sx = x0 - x1 + x2 - x3;
  const sy = y0 - y1 + y2 - y3;

  const g = (sx * dy2 - dx2 * sy) / (dx1 * dy2 - dx2 * dy1);
  const h = (dx1 * sy - sx * dy1) / (dx1 * dy2 - dx2 * dy1);

  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + h * x3;
  const c = x0;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + h * y3;
  const f = y0;

  return [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1];
}

const relativeCorners = [
  { rx: 505 / 1536, ry: 97 / 864 },
  { rx: 1341 / 1536, ry: 70 / 864 },
  { rx: 1344 / 1536, ry: 759 / 864 },
  { rx: 515 / 1536, ry: 710 / 864 },
];

const Windows = ({ show }) => {
  const [bootComplete, setBootComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!show) return null;

  const corners = relativeCorners.map(c => ({
    x: c.rx * windowSize.w,
    y: c.ry * windowSize.h,
  }));

  const w = 700;
  const h = 540;
  
  const m = getTransformToQuad(
    corners[0].x, corners[0].y,
    corners[1].x, corners[1].y,
    corners[2].x, corners[2].y,
    corners[3].x, corners[3].y
  );
  
  const matrixStr = `matrix3d(${m.map(v => v.toFixed(6)).join(", ")})`;

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none">
      <div
        className="absolute pointer-events-auto"
        style={{
          left: "0px",
          top: "0px",
          width: `${windowSize.w}px`,
          height: `${windowSize.h}px`,
        }}
      >
        <div
          className="absolute bg-black overflow-hidden"
          style={{
            width: `${w}px`,
            height: `${h}px`,
            transformOrigin: "0 0",
            transform: `${matrixStr} scale3d(${1/w}, ${1/h}, 1)`
          }}
        >
          {bootComplete ? null : (<BootLoader onComplete={() => setBootComplete(true)} />)}
          {bootComplete ? (<ArchWindow />) : null}
        </div>
      </div>
    </div>
  );
};

export default Windows;