import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;

export const ScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  // Format frame index: e.g. 1 -> "/frames/frame_0001.webp"
  const getFramePath = (index: number) => {
    const padded = String(index).padStart(4, '0');
    return `/frames/frame_${padded}.webp`;
  };

  // Find nearest loaded frame fallback
  const getBestFrame = (targetIdx: number): HTMLImageElement | null => {
    const frames = framesRef.current;
    const rounded = Math.min(Math.max(0, Math.round(targetIdx)), TOTAL_FRAMES - 1);

    if (frames[rounded] && frames[rounded].complete && frames[rounded].naturalWidth > 0) {
      return frames[rounded];
    }

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = rounded - offset;
      if (prev >= 0 && frames[prev] && frames[prev].complete && frames[prev].naturalWidth > 0) {
        return frames[prev];
      }
      const next = rounded + offset;
      if (next < TOTAL_FRAMES && frames[next] && frames[next].complete && frames[next].naturalWidth > 0) {
        return frames[next];
      }
    }
    return null;
  };

  // Draw frame on canvas with contain fitting
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getBestFrame(index);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    // Use contain fitting so 100% of video frame is visible without cropping
    if (canvasRatio > imgRatio) {
      drawH = ch;
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgRatio;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  // Update canvas size
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    renderFrame(currentFrameRef.current);
  };

  // Calculate target frame index from scroll position
  const updateTargetFrame = () => {
    const docElem = document.documentElement;
    const body = document.body;

    const scrollHeight = Math.max(docElem.scrollHeight, body.scrollHeight);
    const clientHeight = window.innerHeight || docElem.clientHeight;
    const maxScroll = Math.max(1, scrollHeight - clientHeight);

    const scrollTop = window.scrollY || window.pageYOffset || docElem.scrollTop || body.scrollTop || 0;
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));

    targetFrameRef.current = scrollFraction * (TOTAL_FRAMES - 1);
  };

  useEffect(() => {
    // Preload frames
    const preloadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      if (i === 1) {
        img.onload = () => {
          renderFrame(0);
        };
      }
      preloadedImages.push(img);
    }
    framesRef.current = preloadedImages;

    resizeCanvas();
    updateTargetFrame();

    let animationFrameId: number;

    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.3;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }
      renderFrame(currentFrameRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleScroll = () => updateTargetFrame();
    const handleResize = () => {
      resizeCanvas();
      updateTargetFrame();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 object-contain bg-[#05070a]"
    />
  );
};
