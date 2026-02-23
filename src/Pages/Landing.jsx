import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 480;
const AUTOPLAY_END = 384;

const Landing = () => {

    const canvasRef = useRef(null);
    const images = useRef([]);
    const frame = useRef({ current: 0 });

    const getFrameSrc = (index) =>
        `/frames/webp/frame_${index.toString().padStart(4, '0')}.webp`;

    useEffect(() => {

        for (let i = 1; i <= TOTAL_FRAMES; i++) {

            const img = new Image();
            img.src = getFrameSrc(i);
            images.current.push(img);

        }

    }, []);

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = () => {

            const img = images.current[Math.floor(frame.current.current)];

            if (!img || !img.complete) return;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.max(
                canvas.width / img.width,
                canvas.height / img.height
            );

            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            context.drawImage(
                img,
                x,
                y,
                img.width * scale,
                img.height * scale
            );
        };

        render();

        gsap.to(frame.current, {

            current: AUTOPLAY_END,

            duration: AUTOPLAY_END / 60,

            ease: "none",

            onUpdate: render,

            onComplete: () => {

                gsap.to(frame.current, {

                    current: TOTAL_FRAMES - 1,

                    ease: "none",

                    scrollTrigger: {

                        trigger: canvas,

                        start: "top top",

                        end: "+=2000",

                        scrub: true,

                        pin: true

                    },

                    onUpdate: render

                });

            }

        });

    }, []);

    return (

        <div className="h-[300vh]">

            <canvas
                ref={canvasRef}
                style={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh'
                }}
            />


        </div>

    );

}

export default Landing;