import { useEffect, useState, useRef } from "react";

export function useScratchCard(canvasRef, {
  brushSize = 25,
  revealThreshold = 45,
  theme = "dark",
  onRevealComplete = () => {}
} = {}) {
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas internal resolution to match display size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      if (canvas.width !== Math.round(rect.width) || canvas.height !== Math.round(rect.height)) {
        canvas.width = Math.round(rect.width);
        canvas.height = Math.round(rect.height);
        drawOverlay();
      }
    };

    const drawOverlay = () => {
      const width = canvas.width;
      const height = canvas.height;
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);

      if (theme === "dark") {
        // Luxury Dark Metallic Bronze/Espresso Gradient matching the Hero floral background
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, "#26150D");
        grad.addColorStop(0.35, "#3C2317");
        grad.addColorStop(0.7, "#2D1910");
        grad.addColorStop(1, "#1C0E08");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtle Gold Sparkle / Shimmer Specks
        ctx.fillStyle = "rgba(232, 215, 184, 0.18)";
        for (let i = 0; i < 28; i++) {
          const sx = (Math.sin(i * 137.5) * 0.5 + 0.5) * width;
          const sy = (Math.cos(i * 92.3) * 0.5 + 0.5) * height;
          ctx.beginPath();
          ctx.arc(sx, sy, (i % 3) * 0.8 + 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Gold Dotted / Dashed Inner Frame
        ctx.strokeStyle = "rgba(211, 193, 170, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(6, 6, width - 12, height - 12);
        ctx.setLineDash([]);

        // Subtle Gold Corner L-accents
        ctx.strokeStyle = "rgba(232, 215, 184, 0.8)";
        ctx.lineWidth = 1.8;
        const cornerLen = 8;
        // Top-Left
        ctx.beginPath();
        ctx.moveTo(6, 6 + cornerLen);
        ctx.lineTo(6, 6);
        ctx.lineTo(6 + cornerLen, 6);
        ctx.stroke();
        // Top-Right
        ctx.beginPath();
        ctx.moveTo(width - 6 - cornerLen, 6);
        ctx.lineTo(width - 6, 6);
        ctx.lineTo(width - 6, 6 + cornerLen);
        ctx.stroke();
        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(6, height - 6 - cornerLen);
        ctx.lineTo(6, height - 6);
        ctx.lineTo(6 + cornerLen, height - 6);
        ctx.stroke();
        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(width - 6 - cornerLen, height - 6);
        ctx.lineTo(width - 6, height - 6);
        ctx.lineTo(width - 6, height - 6 - cornerLen);
        ctx.stroke();
      } else {
        // Solid cream/beige overlay
        ctx.fillStyle = "#F6EEDD"; 
        ctx.fillRect(0, 0, width, height);

        // Gold dotted border around scratch area
        ctx.strokeStyle = "rgba(184, 163, 105, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(10, 10, width - 20, height - 20);
        ctx.setLineDash([]);
      }
    };

    // Initialize dimensions
    resizeCanvas();

    // Listen to resize
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef, theme]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    return { x, y };
  };

  const draw = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || hasTriggeredRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let cleared = 0;
      const step = 20; // Performance sampling step
      let totalSamples = 0;

      for (let i = 0; i < data.length; i += 4 * step) {
        totalSamples++;
        if (data[i + 3] === 0) {
          cleared++;
        }
      }

      const percent = (cleared / totalSamples) * 100;
      setScratchPercent(percent);

      if (percent >= revealThreshold && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setIsScratched(true);
        onRevealComplete();
      }
    } catch (e) {
      console.error("Error reading canvas image data:", e);
    }
  };

  const handleStart = (e) => {
    if (e.cancelable) e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    draw(x, y);
  };

  const handleMove = (e) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getCoordinates(e);
    draw(x, y);
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    checkPercentage();
  };

  return {
    isScratched,
    scratchPercent,
    handlers: {
      onMouseDown: handleStart,
      onMouseMove: handleMove,
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: handleStart,
      onTouchMove: handleMove,
      onTouchEnd: handleEnd
    }
  };
}

export default useScratchCard;
