import { useEffect, useState, useRef } from "react";

export function useScratchCard(canvasRef, {
  brushSize = 25,
  revealThreshold = 55,
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
      // Only set size if it hasn't been set yet or if width/height changed significantly
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        // Save current contents if we are in the middle of scratching (optional, here we re-draw since it's initial)
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawOverlay();
      }
    };

    const drawOverlay = () => {
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw solid cream/beige overlay
      ctx.fillStyle = "#F6EEDD"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw a gold dotted border around the scratch area
      ctx.strokeStyle = "rgba(184, 163, 105, 0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.setLineDash([]);
    };

    // Initialize dimensions
    resizeCanvas();

    // Listen to resize
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef]);

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

    // Scale coordinates correctly if canvas drawing size is different from display size
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
    // Disable default behavior so mobile touches don't scroll
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
