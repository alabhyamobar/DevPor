let audioCtx = null;
let masterGain = null;
let isAudioMuted = false;
let isStarted = false;
let listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((fn) => fn(isAudioMuted));
};

export const subscribeAudioState = (listener) => {
  listeners.add(listener);
  listener(isAudioMuted);
  return () => listeners.delete(listener);
};

export const initSoothingAudio = () => {
  if (isStarted) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(isAudioMuted ? 0 : 0.12, audioCtx.currentTime);

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(420, audioCtx.currentTime);

    masterGain.connect(filter);
    filter.connect(audioCtx.destination);

    const freqs = [138.59, 207.65, 277.18, 329.63, 415.3, 554.37];

    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.03, audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(0.03, audioCtx.currentTime);

      lfo.connect(oscGain.gain);
      lfo.start();

      oscGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
    });

    isStarted = true;
  } catch (err) {
    console.warn("AudioContext init warning:", err);
  }
};

export const toggleGlobalMute = () => {
  if (!isStarted) {
    initSoothingAudio();
  }
  isAudioMuted = !isAudioMuted;

  if (audioCtx && masterGain) {
    if (audioCtx.state === "suspended" && !isAudioMuted) {
      audioCtx.resume();
    }
    masterGain.gain.linearRampToValueAtTime(
      isAudioMuted ? 0 : 0.12,
      audioCtx.currentTime + 0.3
    );
  }

  notifyListeners();
  return isAudioMuted;
};

export const isGlobalMuted = () => isAudioMuted;
