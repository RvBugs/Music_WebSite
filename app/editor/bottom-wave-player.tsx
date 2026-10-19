
import { useEffect, useRef, useState } from "react";

const Em = [40, 47, 52, 55, 59, 64];
const Bm = [47, 54, 59, 62, 66];
const C = [48, 52, 55, 60, 64];

const chords = [Em, Bm, C];

export default function BottomWavePlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number>(0);

  function playChords() {
    const ctx = new AudioContext();
    audioRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.15;
    master.connect(ctx.destination);

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    master.connect(analyser);

    const bufferLength = analyser.fftSize;
    const data = new Uint8Array(bufferLength);

    chords.forEach((chord, chordIndex) => {
      const start = ctx.currentTime + chordIndex * 1.5;
      const duration = 1.5;

      chord.forEach((midi) => {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value =
          440 * Math.pow(2, (midi - 69) / 12);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.12 / chord.length, start + 0.05);
        gain.gain.setValueAtTime(
          0.12 / chord.length,
          start + duration - 0.1
        );
        gain.gain.linearRampToValueAtTime(0, start + duration);

        oscillator.connect(gain);
        gain.connect(master);

        oscillator.start(start);
        oscillator.stop(start + duration);
      });
    });

    setPlaying(true);

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const canvasCtx = canvas.getContext("2d");
      if (!canvasCtx) return;

      const { width, height } = canvas;
      analyser.getByteTimeDomainData(data);

      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.beginPath();
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#8b5cf6";

      for (let i = 0; i < bufferLength; i++) {
        const x = (i / (bufferLength - 1)) * width;
        const y = (data[i] / 255) * height;

        if (i === 0) canvasCtx.moveTo(x, y);
        else canvasCtx.lineTo(x, y);
      }

      canvasCtx.stroke();
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.setTimeout(() => {
      cancelAnimationFrame(animationRef.current);
      ctx.close();
      setPlaying(false);
    }, chords.length * 1500 + 200);
  }

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
      audioRef.current?.close();
    };
  }, []);

  return (
    <div className="w-full space-y-3 rounded-xl border p-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={180}
        className="h-36 w-full rounded-lg bg-muted"
      />

      <button
        onClick={playChords}
        disabled={playing}
        className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
      >
        {playing ? "Playing chords..." : "Play chord wave"}
      </button>

      <div className="flex gap-2 text-sm text-muted-foreground">
        <span>Em</span>
        <span>→</span>
        <span>Bm</span>
        <span>→</span>
        <span>C</span>
      </div>
    </div>
  );
}
