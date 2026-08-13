const TOTAL_FRAMES = 240;
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const loadingContainer = document.getElementById('loading-bar-container');
const loadingBar = document.getElementById('loading-bar');

const frames = [];
let loadedCount = 0;
let currentFrameIndex = 0;
let targetFrameIndex = 0;
let isAnimationRunning = false;

// Format frame index with 4-digit padding: e.g. 1 -> "0001"
function getFramePath(index) {
  const paddedIndex = String(index).padStart(4, '0');
  return `/frames/frame_${paddedIndex}.webp`;
}

// Preload all frames
function preloadFrames() {
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFramePath(i);

    img.onload = () => {
      loadedCount++;
      const progress = (loadedCount / TOTAL_FRAMES) * 100;
      if (loadingBar) {
        loadingBar.style.width = `${progress}%`;
      }

      // Draw first frame immediately when ready
      if (loadedCount === 1) {
        renderFrame(0);
      }

      if (loadedCount === TOTAL_FRAMES) {
        if (loadingContainer) {
          loadingContainer.classList.add('loaded');
        }
      }
    };

    img.onerror = () => {
      console.warn(`Failed to load frame ${i} at ${img.src}`);
      loadedCount++;
    };

    frames.push(img);
  }
}

// Fit canvas to window size respecting device pixel ratio
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  renderFrame(Math.round(currentFrameIndex));
}

// Find nearest loaded frame if specific frame is still loading
function getBestFrame(targetIdx) {
  const rounded = Math.min(Math.max(0, Math.round(targetIdx)), TOTAL_FRAMES - 1);
  if (frames[rounded] && frames[rounded].complete && frames[rounded].naturalWidth > 0) {
    return frames[rounded];
  }
  // Fallback search nearby loaded frames
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
}

// Draw frame centered inside canvas ensuring 100% of the video frame is visible
function renderFrame(index) {
  const img = getBestFrame(index);
  if (!img) return;

  const cw = canvas.width;
  const ch = canvas.height;

  ctx.clearRect(0, 0, cw, ch);

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = cw / ch;

  let drawW, drawH, drawX, drawY;

  // Use contain fitting so 100% of the video frame is completely visible without cropping
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
}

// Calculate scroll position percentage across entire page height
function updateTargetFrame() {
  const docElem = document.documentElement;
  const body = document.body;

  const scrollHeight = Math.max(docElem.scrollHeight, body.scrollHeight);
  const clientHeight = window.innerHeight || docElem.clientHeight;
  const maxScroll = Math.max(1, scrollHeight - clientHeight);

  const scrollTop = window.scrollY || window.pageYOffset || docElem.scrollTop || body.scrollTop || 0;
  const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
  
  targetFrameIndex = scrollFraction * (TOTAL_FRAMES - 1);
}

// Smooth render loop with LERP interpolation
function animate() {
  const diff = targetFrameIndex - currentFrameIndex;
  
  if (Math.abs(diff) > 0.005) {
    currentFrameIndex += diff * 0.3;
  } else {
    currentFrameIndex = targetFrameIndex;
  }
  
  renderFrame(currentFrameIndex);
  requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('scroll', updateTargetFrame, { passive: true });
window.addEventListener('resize', () => {
  resizeCanvas();
  updateTargetFrame();
});

window.addEventListener('wheel', () => {
  requestAnimationFrame(updateTargetFrame);
}, { passive: true });

window.addEventListener('touchmove', () => {
  requestAnimationFrame(updateTargetFrame);
}, { passive: true });

window.addEventListener('keydown', () => {
  setTimeout(updateTargetFrame, 10);
});

// Initialize
preloadFrames();
resizeCanvas();
updateTargetFrame();
requestAnimationFrame(animate);


