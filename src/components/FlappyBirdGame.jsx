import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Trophy, Volume2, VolumeX, Gamepad2 } from "lucide-react";
import { toggleGlobalMute, subscribeAudioState } from "../utils/soothingAudio";

const FlappyBirdGame = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("START"); 
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("flappy_high_score") || "0", 10);
  });
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsub = subscribeAudioState((muted) => setIsMuted(muted));
    return () => unsub();
  }, []);

  const gameRef = useRef({
    birdY: 180,
    velocity: 0,
    gravity: 0.45,
    jump: -7.5,
    pipes: [],
    frame: 0,
    score: 0,
    animId: null
  });

  const BIRD_X = 60;
  const BIRD_RADIUS = 12;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 125;
  const PIPE_SPEED = 2.5;

  const resetGame = () => {
    gameRef.current = {
      birdY: 180,
      velocity: 0,
      gravity: 0.45,
      jump: -7.5,
      pipes: [],
      frame: 0,
      score: 0,
      animId: null
    };
    setScore(0);
  };

  const handleJump = () => {
    if (gameState === "START") {
      resetGame();
      setGameState("PLAYING");
      gameRef.current.velocity = gameRef.current.jump;
    } else if (gameState === "PLAYING") {
      gameRef.current.velocity = gameRef.current.jump;
    } else if (gameState === "GAMEOVER") {
      resetGame();
      setGameState("PLAYING");
      gameRef.current.velocity = gameRef.current.jump;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const g = gameRef.current;

    const loop = () => {
      g.frame++;

      g.velocity += g.gravity;
      g.birdY += g.velocity;

      if (g.frame % 90 === 0) {
        const minTop = 40;
        const maxTop = canvas.height - PIPE_GAP - 60;
        const topHeight = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
        g.pipes.push({
          x: canvas.width,
          top: topHeight,
          passed: false
        });
      }

      g.pipes.forEach((p) => {
        p.x -= PIPE_SPEED;

        if (!p.passed && p.x + PIPE_WIDTH < BIRD_X) {
          p.passed = true;
          g.score += 1;
          setScore(g.score);
          if (g.score > highScore) {
            setHighScore(g.score);
            localStorage.setItem("flappy_high_score", g.score.toString());
          }
        }
      });

      g.pipes = g.pipes.filter((p) => p.x + PIPE_WIDTH > 0);

      if (g.birdY + BIRD_RADIUS >= canvas.height - 20 || g.birdY - BIRD_RADIUS <= 0) {
        setGameState("GAMEOVER");
        return;
      }

      for (let p of g.pipes) {
        if (
          BIRD_X + BIRD_RADIUS > p.x &&
          BIRD_X - BIRD_RADIUS < p.x + PIPE_WIDTH
        ) {
          if (
            g.birdY - BIRD_RADIUS < p.top ||
            g.birdY + BIRD_RADIUS > p.top + PIPE_GAP
          ) {
            setGameState("GAMEOVER");
            return;
          }
        }
      }

      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, "#0F172A");
      bgGrad.addColorStop(0.7, "#1E293B");
      bgGrad.addColorStop(1, "#090D16");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < 25; i++) {
        const starX = (i * 37 + g.frame * 0.2) % canvas.width;
        const starY = (i * 53) % (canvas.height - 40);
        ctx.fillRect(starX, starY, 2, 2);
      }

      g.pipes.forEach((p) => {
        const pipeGrad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_WIDTH, 0);
        pipeGrad.addColorStop(0, "#06B6D4");
        pipeGrad.addColorStop(0.5, "#22D3EE");
        pipeGrad.addColorStop(1, "#0891B2");
        ctx.fillStyle = pipeGrad;
        ctx.fillRect(p.x, 0, PIPE_WIDTH, p.top);
        ctx.strokeStyle = "#00F0FF";
        ctx.strokeRect(p.x, 0, PIPE_WIDTH, p.top);

        ctx.fillStyle = "#22D3EE";
        ctx.fillRect(p.x - 3, p.top - 12, PIPE_WIDTH + 6, 12);

        const bottomY = p.top + PIPE_GAP;
        const bottomH = canvas.height - bottomY - 20;
        ctx.fillStyle = pipeGrad;
        ctx.fillRect(p.x, bottomY, PIPE_WIDTH, bottomH);
        ctx.strokeRect(p.x, bottomY, PIPE_WIDTH, bottomH);

        ctx.fillStyle = "#22D3EE";
        ctx.fillRect(p.x - 3, bottomY, PIPE_WIDTH + 6, 12);
      });

      ctx.fillStyle = "#1E293B";
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
      ctx.fillStyle = "#06B6D4";
      ctx.fillRect(0, canvas.height - 20, canvas.width, 3);

      ctx.save();
      ctx.translate(BIRD_X, g.birdY);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, g.velocity * 0.08));
      ctx.rotate(angle);

      ctx.shadowColor = "#00F0FF";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#38BDF8";
      ctx.beginPath();
      ctx.arc(0, 0, BIRD_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(4, -3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0F172A";
      ctx.beginPath();
      ctx.arc(5, -3, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(15, 3);
      ctx.lineTo(8, 6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#0284C7";
      ctx.beginPath();
      ctx.ellipse(-4, 2, 6, 3, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 4;
      ctx.fillText(g.score.toString(), canvas.width / 2, 40);

      g.animId = requestAnimationFrame(loop);
    };

    g.animId = requestAnimationFrame(loop);
    return () => {
      if (g.animId) cancelAnimationFrame(g.animId);
    };
  }, [gameState, highScore]);

  return (
    <div className="h-full w-full bg-[#090D16] text-slate-100 flex flex-col items-center justify-between p-4 font-mono select-none">
      
      <div className="w-full flex justify-between items-center bg-[#0F172A] border border-cyan-500/30 px-4 py-2 rounded-xl text-xs md:text-sm shadow-md mb-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Gamepad2 className="w-4 h-4" />
          <span>Flappy Arch v1.0</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1 text-amber-400">
            <Trophy className="w-3.5 h-3.5" /> High: {highScore}
          </span>
          <button
            onClick={toggleGlobalMute}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
            title={isMuted ? "Unmute Global Audio" : "Mute Global Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
          </button>
        </div>
      </div>

      
      <div
        className="relative w-full max-w-md h-[400px] rounded-2xl border-2 border-cyan-500/40 overflow-hidden shadow-2xl bg-black cursor-pointer group"
        onClick={handleJump}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />

        
        {gameState === "START" && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg animate-bounce">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-wider">FLAPPY ARCH</h2>
              <p className="text-cyan-400 text-xs mt-1">Tap screen or Press Spacebar to Jump</p>
            </div>
            <button
              onClick={handleJump}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> START GAME
            </button>
          </div>
        )}

        
        {gameState === "GAMEOVER" && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in">
            <h2 className="text-3xl font-extrabold text-red-500 tracking-wider">GAME OVER</h2>
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl w-48 text-center space-y-2">
              <div className="text-xs text-slate-400">FINAL SCORE</div>
              <div className="text-3xl font-bold text-white">{score}</div>
              <div className="text-[11px] text-amber-400 flex items-center justify-center gap-1">
                <Trophy className="w-3 h-3" /> Best: {highScore}
              </div>
            </div>
            <button
              onClick={handleJump}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      
      <div className="text-[11px] text-slate-400 text-center mt-3 font-mono">
        <span>Controls: Click / Spacebar / Up Arrow to Jump</span>
      </div>
    </div>
  );
};

export default FlappyBirdGame;
