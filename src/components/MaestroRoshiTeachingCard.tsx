import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, RotateCcw, Eye, X, Minimize2, Maximize2, Gem, Zap } from 'lucide-react';
import {
  advanceGlobalRoshiInteraction,
  CELEBRATION_GIF_URLS,
  cleanRoshiTitleText,
  clearGlobalTwoMistakesVideoTrigger,
  didGlobalTriggerTwoMistakesVideo,
  getCurrentGlobalRoshiSpec,
  getGlobalConsecutiveMistakes,
  getGlobalCurrentMistakeRewardDialogue,
  getProgressiveTextSlice,
  getTypewriterProgressPct,
  INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL,
  peekNextGlobalPracticeWinVideo,
  PERVERTED_ANIMATION_IDS,
  PERVERTED_ROSHI_GIF_URLS,
  resolveCharacterRewardDialogueMeta,
  ROSHI_ESPECIAL_1_VIDEO_URL,
  ROSHI_ESPECIAL_2_VIDEO_URL,
  ROSHI_MUSICA_1_VIDEO_URL,
  ROSHI_MUSICA_2_VIDEO_URL,
  ROSHI_MUSICA_3_VIDEO_URL,
  ROSHI_MUSICA_4_VIDEO_URL,
  ROSHI_MUSICA_5_VIDEO_URL,
  ROSHI_MUSICA_6_VIDEO_URL,
  ROSHI_MUSICA_7_VIDEO_URL,
  ROSHI_MUSICA_8_VIDEO_URL,
  ROSHI_MUSICA_9_VIDEO_URL,
  ROSHI_MUSICA_10_VIDEO_URL,
  ROSHI_MUSICA_11_PART_1_VIDEO_URL,
  ROSHI_MUSICA_11_PART_2_VIDEO_URL,
  ROSHI_MUSICA_12_VIDEO_URL,
  ROSHI_MUSICA_13_VIDEO_URL,
  ROSHI_MUSICA_14_VIDEO_URL,
  ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL,
  ROSHI_GRADUACION_PART_1_VIDEO_URL,
  ROSHI_GRADUACION_PART_2_VIDEO_URL,
  ROSHI_GRADUACION_PART_3_VIDEO_URL,
  ROSHI_GRADUACION_PART_4_VIDEO_URL,
  ROSHI_GRADUACION_PART_5_VIDEO_URL,
  ROSHI_GRADUACION_PART_6_VIDEO_URL,
  ROSHI_GRADUACION_PART_7_VIDEO_URL,
  ROSHI_GRADUACION_PART_8_VIDEO_URL,
  ROSHI_GRADUACION_PART_9_VIDEO_URL,
  ROSHI_GRADUACION_PART_10_VIDEO_URL,
  ROSHI_GRADUACION_PART_11_VIDEO_URL,
  ROSHI_GRADUACION_PART_12_VIDEO_URL,
  ROSHI_GRADUACION_PART_13_VIDEO_URL,
  ROSHI_GRADUACION_PART_14_VIDEO_URL,
  ROSHI_GRADUACION_PART_15_VIDEO_URL,
  ROSHI_GRADUACION_PART_16_VIDEO_URL,
  ROSHI_RESET_PROGRESS_VIDEO_URL,
  ROSHI_SPRITE_CATALOG,
  ROSHI_TITLE_PROMOTION_VIDEO_URL,
  ROSHI_TWO_MISTAKES_DIALOGUE,
  ROSHI_TWO_MISTAKES_TITLE,
  ROSHI_TWO_MISTAKES_VIDEO_URL,
  resolveSpecialVideoSequence,
  RoshiAnimationCategory,
  RoshiAnimationId,
  RoshiSpriteSpec,
  shouldAutoOpenSpotlightForTrigger,
} from '../utils/roshiSpriteScheduler';
import {
  getRoshiMoodPitchOffset,
  playRoshiAnimationSound,
  soundFX,
} from '../utils/sound';

// Global priority state for Special Rewards & Celebration Overlays so they always take
// immediate precedence over Maestro Roshi's spotlight and typewriter audio blips.
const activeCelebrationOverlayIds = new Set<symbol>();
const celebrationPriorityListeners = new Set<() => void>();
let lastSpecialRewardPriorityAtMs = 0;

export function notifySpecialRewardPriority(): void {
  lastSpecialRewardPriorityAtMs = Date.now();
  celebrationPriorityListeners.forEach((fn) => fn());
}

export function isCelebrationPriorityActive(): boolean {
  if (activeCelebrationOverlayIds.size > 0) return true;
  if (Date.now() - lastSpecialRewardPriorityAtMs < 350) return true;
  if (typeof document !== 'undefined') {
    const el = document.querySelector(
      '[data-testid="celebration-gif-overlay"], [data-testid="special-video-reward-overlay"], [data-testid="two-mistakes-video-reward-overlay"], [data-testid*="celebration-overlay"]'
    );
    if (el) return true;
  }
  return false;
}

// Eagerly warm up the special reward videos, celebration/perverted GIFs, and sprite sheets in browser memory
// so there is zero loading or extraction delay when an animation or GIF appears.
let hasPreloadedSpecialMedia = false;
const preloadedGifElements: HTMLImageElement[] = [];
const preloadedSpriteImages = new Map<RoshiAnimationId, HTMLImageElement>();
const preloadedVideoElements = new Map<string, HTMLVideoElement>();
const preloadedVideoBlobUrls = new Map<string, string>();
const inFlightVideoBlobPromises = new Map<string, Promise<string>>();
const videoBlobReadyListeners = new Set<() => void>();
const videoBlobDownloadQueue: Array<{
  url: string;
  resolve: (resolvedUrl: string) => void;
}> = [];
let activeVideoBlobFetches = 0;
const MAX_CONCURRENT_VIDEO_BLOB_FETCHES = 2;

function notifyVideoBlobReady(): void {
  videoBlobReadyListeners.forEach((fn) => fn());
}

/**
 * Returns the in-memory `blob:...` URL if the video has already been downloaded into RAM,
 * or falls back to the original asset URL. Playing from a `blob:` URL in RAM eliminates
 * mid-playback network buffering/stuttering completely.
 */
export function getResolvedRewardVideoSrc(url: string): string {
  return preloadedVideoBlobUrls.get(url) ?? url;
}

function drainVideoBlobDownloadQueue(): void {
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
    while (videoBlobDownloadQueue.length > 0) {
      const item = videoBlobDownloadQueue.shift()!;
      item.resolve(item.url);
    }
    return;
  }

  while (
    activeVideoBlobFetches < MAX_CONCURRENT_VIDEO_BLOB_FETCHES &&
    videoBlobDownloadQueue.length > 0
  ) {
    const nextItem = videoBlobDownloadQueue.shift()!;
    const { url, resolve } = nextItem;

    if (preloadedVideoBlobUrls.has(url)) {
      resolve(preloadedVideoBlobUrls.get(url)!);
      continue;
    }

    activeVideoBlobFetches += 1;
    window
      .fetch(url, { cache: 'force-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function' && blob.size > 0) {
          const blobUrl = URL.createObjectURL(blob);
          preloadedVideoBlobUrls.set(url, blobUrl);
          const existingVid = preloadedVideoElements.get(url);
          if (existingVid) {
            existingVid.preload = 'auto';
            existingVid.src = blobUrl;
          }
          notifyVideoBlobReady();
          resolve(blobUrl);
          return;
        }
        resolve(url);
      })
      .catch(() => {
        resolve(url);
      })
      .finally(() => {
        activeVideoBlobFetches = Math.max(0, activeVideoBlobFetches - 1);
        drainVideoBlobDownloadQueue();
      });
  }
}

/**
 * Downloads a reward video file into an in-memory `Blob` URL (`blob:...`) so that once loaded,
 * playback runs 100% from RAM with zero network range-request stalls or mid-video stutters.
 */
export function preloadRewardVideoIntoRam(
  url: string,
  highPriority: boolean = false
): Promise<string> {
  if (!url) return Promise.resolve('');
  if (preloadedVideoBlobUrls.has(url)) {
    return Promise.resolve(preloadedVideoBlobUrls.get(url)!);
  }
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
    return Promise.resolve(url);
  }

  const existingPromise = inFlightVideoBlobPromises.get(url);
  if (existingPromise) {
    if (highPriority) {
      const qIdx = videoBlobDownloadQueue.findIndex((item) => item.url === url);
      if (qIdx > 0) {
        const [item] = videoBlobDownloadQueue.splice(qIdx, 1);
        videoBlobDownloadQueue.unshift(item);
      }
    }
    return existingPromise;
  }

  const promise = new Promise<string>((resolve) => {
    const queueEntry = { url, resolve };
    if (highPriority) {
      videoBlobDownloadQueue.unshift(queueEntry);
    } else {
      videoBlobDownloadQueue.push(queueEntry);
    }
    drainVideoBlobDownloadQueue();
  });

  inFlightVideoBlobPromises.set(url, promise);
  return promise;
}

/**
 * Controls whether developer/test reward buttons ("Probar recompensa", "Probar ascenso", etc.)
 * are visible in the UI. Kept false for public release so users do not see test buttons.
 */
export const SHOW_REWARD_TEST_BUTTONS = false;

/**
 * Preload delay (1500ms) used EXCLUSIVELY when triggering a reward from a test button ("Probar recompensa"),
 * giving the browser dedicated time to buffer the selected video into RAM before opening the overlay.
 * Normal app rewards never use this delay because their videos are preloaded predictively during gameplay.
 */
export const TEST_REWARD_PRELOAD_DELAY_MS = 1500;

export function warmUpRewardVideoUrls(
  videoUrl?: string,
  videoUrls?: readonly string[],
  highPriority: boolean = false
): HTMLVideoElement[] {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return [];
  }
  const sequence = resolveSpecialVideoSequence(videoUrl, videoUrls);
  const elements: HTMLVideoElement[] = [];

  // If highPriority is requested, enqueue in reverse onto the front of the queue so part 0 is at index 0
  const orderedForQueue = highPriority ? [...sequence].reverse() : sequence;
  orderedForQueue.forEach((url) => {
    if (url) {
      preloadRewardVideoIntoRam(url, highPriority);
    }
  });

  sequence.forEach((url, idx) => {
    if (!url) return;
    const targetPreload: 'auto' | 'metadata' = idx <= 2 ? 'auto' : 'metadata';
    const resolvedSrc = getResolvedRewardVideoSrc(url);
    let vid = preloadedVideoElements.get(url);
    if (!vid) {
      vid = document.createElement('video');
      vid.muted = true;
      vid.playsInline = true;
      vid.preload = targetPreload;
      vid.src = resolvedSrc;
      if (targetPreload === 'auto') {
        vid.load();
      }
      preloadedVideoElements.set(url, vid);
    } else {
      if (vid.src !== resolvedSrc && resolvedSrc.startsWith('blob:')) {
        vid.src = resolvedSrc;
      }
      if (targetPreload === 'auto' && vid.preload !== 'auto') {
        vid.preload = 'auto';
        vid.load();
      }
    }
    elements.push(vid);
  });
  return elements;
}

export function triggerTestRewardWithPreloadDelay(
  videoUrl: string | undefined,
  onReady: () => void,
  onLoadingChange?: (loading: boolean) => void,
  delayMs: number = TEST_REWARD_PRELOAD_DELAY_MS
): void {
  notifySpecialRewardPriority();
  warmUpRewardVideoUrls(videoUrl, undefined, true);
  if (typeof window === 'undefined') {
    onReady();
    return;
  }
  onLoadingChange?.(true);

  const sequence = resolveSpecialVideoSequence(videoUrl);
  const firstPartUrl = sequence[0];
  const minDelayPromise = new Promise<void>((resolve) => {
    window.setTimeout(resolve, delayMs);
  });
  const firstBlobReadyPromise = firstPartUrl
    ? Promise.race([
        preloadRewardVideoIntoRam(firstPartUrl, true).then(() => {}),
        new Promise<void>((resolve) => window.setTimeout(resolve, Math.max(delayMs, 2200))),
      ])
    : Promise.resolve();

  Promise.all([minDelayPromise, firstBlobReadyPromise]).then(() => {
    onLoadingChange?.(false);
    notifySpecialRewardPriority();
    onReady();
  });
}

function ensureSpecialRewardVideosAndAnimationsPreloaded(): void {
  if (hasPreloadedSpecialMedia || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  hasPreloadedSpecialMedia = true;
  try {
    // 1a. Immediately preload into RAM (Blob URLs) the next-up videos that can trigger during normal gameplay:
    // - Today's next Practice Win reward video (starts the day with "roshi especial.webm")
    // - The 2-consecutive-mistakes / practice-loss video ("estupido.mp4")
    // - The rank/title promotion video ("gohan grito.mp4")
    // - The Hoy / Daily mission reward video ("roshi especial 2.mp4")
    const immediatePriorityVideos = Array.from(
      new Set([
        peekNextGlobalPracticeWinVideo(),
        ROSHI_TWO_MISTAKES_VIDEO_URL,
        ROSHI_TITLE_PROMOTION_VIDEO_URL,
        ROSHI_ESPECIAL_2_VIDEO_URL,
      ])
    );
    immediatePriorityVideos.forEach((url) => {
      warmUpRewardVideoUrls(url, undefined, false);
    });

    // 1b. Register metadata for all special reward videos
    [
      ROSHI_ESPECIAL_1_VIDEO_URL,
      ROSHI_ESPECIAL_2_VIDEO_URL,
      ROSHI_MUSICA_1_VIDEO_URL,
      ROSHI_MUSICA_2_VIDEO_URL,
      ROSHI_MUSICA_3_VIDEO_URL,
      ROSHI_MUSICA_4_VIDEO_URL,
      ROSHI_MUSICA_5_VIDEO_URL,
      ROSHI_MUSICA_6_VIDEO_URL,
      ROSHI_MUSICA_7_VIDEO_URL,
      ROSHI_MUSICA_8_VIDEO_URL,
      ROSHI_MUSICA_9_VIDEO_URL,
      ROSHI_MUSICA_10_VIDEO_URL,
      ROSHI_MUSICA_11_PART_1_VIDEO_URL,
      ROSHI_MUSICA_11_PART_2_VIDEO_URL,
      ROSHI_MUSICA_12_VIDEO_URL,
      ROSHI_MUSICA_13_VIDEO_URL,
      ROSHI_MUSICA_14_VIDEO_URL,
      ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL,
      ROSHI_GRADUACION_PART_1_VIDEO_URL,
      ROSHI_GRADUACION_PART_2_VIDEO_URL,
      ROSHI_GRADUACION_PART_3_VIDEO_URL,
      ROSHI_GRADUACION_PART_4_VIDEO_URL,
      ROSHI_GRADUACION_PART_5_VIDEO_URL,
      ROSHI_GRADUACION_PART_6_VIDEO_URL,
      ROSHI_GRADUACION_PART_7_VIDEO_URL,
      ROSHI_GRADUACION_PART_8_VIDEO_URL,
      ROSHI_GRADUACION_PART_9_VIDEO_URL,
      ROSHI_GRADUACION_PART_10_VIDEO_URL,
      ROSHI_GRADUACION_PART_11_VIDEO_URL,
      ROSHI_GRADUACION_PART_12_VIDEO_URL,
      ROSHI_GRADUACION_PART_13_VIDEO_URL,
      ROSHI_GRADUACION_PART_14_VIDEO_URL,
      ROSHI_GRADUACION_PART_15_VIDEO_URL,
      ROSHI_GRADUACION_PART_16_VIDEO_URL,
      INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL,
      ROSHI_TITLE_PROMOTION_VIDEO_URL,
      ROSHI_TWO_MISTAKES_VIDEO_URL,
      ROSHI_RESET_PROGRESS_VIDEO_URL,
    ].forEach((url) => {
      if (!preloadedVideoElements.has(url)) {
        const vid = document.createElement('video');
        vid.preload = 'metadata';
        vid.muted = true;
        vid.playsInline = true;
        vid.src = getResolvedRewardVideoSrc(url);
        preloadedVideoElements.set(url, vid);
      }
    });

    // 2. Eagerly preload all perverted Roshi GIFs and celebration GIFs into browser cache
    const allGifUrls = Array.from(new Set([...PERVERTED_ROSHI_GIF_URLS, ...CELEBRATION_GIF_URLS]));
    allGifUrls.forEach((gifUrl) => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = gifUrl;
      preloadedGifElements.push(img);
    });

    // 3. Eagerly fetch all sprite sheet PNGs and progressively pre-slice them into extractedFramesCache
    const allSpecs = Object.values(ROSHI_SPRITE_CATALOG);
    const pendingExtractQueue: Array<{ img: HTMLImageElement; spec: RoshiSpriteSpec }> = [];
    let isDrainingQueue = false;

    const drainNextSpriteExtraction = () => {
      if (pendingExtractQueue.length === 0) {
        isDrainingQueue = false;
        return;
      }
      isDrainingQueue = true;
      const item = pendingExtractQueue.shift()!;
      if (!extractedFramesCache.has(item.spec.id)) {
        try {
          extractFramesFromSpriteSheet(item.img, item.spec);
        } catch {
          // Ignore canvas errors in headless environments
        }
      }
      setTimeout(drainNextSpriteExtraction, 12);
    };

    allSpecs.forEach((spec) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = spec.src;
      preloadedSpriteImages.set(spec.id, img);
      img.onload = () => {
        if (spec.id === 'HABLANDO') {
          try {
            extractFramesFromSpriteSheet(img, spec);
          } catch {
            // Ignore
          }
          return;
        }
        pendingExtractQueue.push({ img, spec });
        if (!isDrainingQueue) {
          setTimeout(drainNextSpriteExtraction, 12);
        }
      };
    });
  } catch {
    // Ignore preloading errors in non-browser test environments
  }
}

if (typeof window !== 'undefined') {
  ensureSpecialRewardVideosAndAnimationsPreloaded();
}


// Module-level cache of extracted and centered sprite frames per animation ID
const extractedFramesCache = new Map<RoshiAnimationId, HTMLCanvasElement[]>();

function extractFramesFromSpriteSheet(
  img: HTMLImageElement,
  spec: RoshiSpriteSpec
): HTMLCanvasElement[] {
  const cached = extractedFramesCache.get(spec.id);
  if (cached && cached.length > 0) return cached;

  const rawW = img.naturalWidth || img.width;
  const rawH = img.naturalHeight || img.height;
  if (!rawW || !rawH) return [];

  const frames: HTMLCanvasElement[] = [];
  const TARGET_SIZE = 240;

  // Fast-path for pre-aligned 240x240 transparent sprite sheets (e.g. 1200x240 5x1):
  // Directly copies each cell 1:1 with zero pixel scanning, preserving exact jump height and transparency.
  if (spec.preAlignedCells) {
    const cellW = rawW / spec.cols;
    const cellH = rawH / spec.rows;
    for (let row = 0; row < spec.rows; row++) {
      for (let col = 0; col < spec.cols; col++) {
        if (frames.length >= spec.totalFrames) break;
        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = TARGET_SIZE;
        frameCanvas.height = TARGET_SIZE;
        const fCtx = frameCanvas.getContext('2d');
        if (!fCtx) continue;
        fCtx.drawImage(
          img,
          Math.round(col * cellW),
          Math.round(row * cellH),
          Math.round(cellW),
          Math.round(cellH),
          0,
          0,
          TARGET_SIZE,
          TARGET_SIZE
        );
        frames.push(frameCanvas);
      }
    }
    extractedFramesCache.set(spec.id, frames);
    return frames;
  }

  // Downscale ultra-wide high-res sprite sheets (e.g. 2750x536) before pixel scanning
  // so bounding-box detection runs 4-5x faster without any visual loss at TARGET_SIZE=240.
  const maxOptimalWidth = spec.cols * 260;
  const downscaleRatio = rawW > maxOptimalWidth ? maxOptimalWidth / rawW : 1;
  const W = Math.max(spec.cols * 32, Math.round(rawW * downscaleRatio));
  const H = Math.max(spec.rows * 32, Math.round(rawH * downscaleRatio));

  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = W;
  srcCanvas.height = H;
  const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
  if (!srcCtx) return [];
  srcCtx.drawImage(img, 0, 0, W, H);

  const fullImageData = srcCtx.getImageData(0, 0, W, H);
  const data = fullImageData.data;

  const isInkOrColor = (x: number, y: number): boolean => {
    const idx = (y * W + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];
    if (a < 30) return false;
    return r < 236 || g < 236 || b < 236;
  };

  for (let row = 0; row < spec.rows; row++) {
    for (let col = 0; col < spec.cols; col++) {
      if (frames.length >= spec.totalFrames) break;

      const inset = Math.round((spec.cellInsetPx ?? 0) * downscaleRatio);
      const rawCellX0 = Math.floor((col * W) / spec.cols);
      const rawCellX1 = Math.floor(((col + 1) * W) / spec.cols);
      const rawCellY0 = Math.floor((row * H) / spec.rows);
      const rawCellH = H / spec.rows;
      const rawCellY1 = Math.floor(rawCellY0 + rawCellH * spec.cropBottomRatio);

      const cellX0 = Math.min(rawCellX1 - 4, rawCellX0 + inset);
      const cellX1 = Math.max(cellX0 + 4, rawCellX1 - inset);
      const cellY0 = Math.min(rawCellY1 - 4, rawCellY0 + inset);
      const cellY1 = Math.max(cellY0 + 4, rawCellY1 - inset);

      // Step 1: Find outer non-white bounding box in cell
      let minX = cellX1;
      let maxX = cellX0;
      let minY = cellY1;
      let maxY = cellY0;

      for (let y = cellY0; y < cellY1; y++) {
        for (let x = cellX0; x < cellX1; x++) {
          if (isInkOrColor(x, y)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (minX >= maxX || minY >= maxY) {
        minX = cellX0 + 8;
        maxX = cellX1 - 8;
        minY = cellY0 + 8;
        maxY = cellY1 - 8;
      }

      // Step 2: If sheet has a thin black manga panel border (roshi_hablando / roshi_pervertido),
      // inset past the panel border and re-tighten to Roshi's silhouette
      if (spec.hasPanelBorder) {
        const panelInsetX = Math.max(4, Math.round(9 * downscaleRatio));
        const panelInsetY = Math.max(3, Math.round(7 * downscaleRatio));
        const insetX0 = Math.min(maxX - 10, minX + panelInsetX);
        const insetX1 = Math.max(insetX0 + 10, maxX - panelInsetX);
        const insetY0 = Math.min(maxY - 10, minY + panelInsetY);
        const insetY1 = Math.max(insetY0 + 10, maxY - panelInsetY);

        let innerMinX = insetX1;
        let innerMaxX = insetX0;
        let innerMinY = insetY1;
        let innerMaxY = insetY0;

        for (let y = insetY0; y <= insetY1; y++) {
          for (let x = insetX0; x <= insetX1; x++) {
            if (isInkOrColor(x, y)) {
              if (x < innerMinX) innerMinX = x;
              if (x > innerMaxX) innerMaxX = x;
              if (y < innerMinY) innerMinY = y;
              if (y > innerMaxY) innerMaxY = y;
            }
          }
        }

        if (innerMinX < innerMaxX && innerMinY < innerMaxY) {
          minX = innerMinX;
          maxX = innerMaxX;
          minY = innerMinY;
          maxY = innerMaxY;
        } else {
          minX = insetX0;
          maxX = insetX1;
          minY = insetY0;
          maxY = insetY1;
        }
      }

      const cropW = Math.max(1, maxX - minX + 1);
      const cropH = Math.max(1, maxY - minY + 1);

      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = TARGET_SIZE;
      frameCanvas.height = TARGET_SIZE;
      const fCtx = frameCanvas.getContext('2d', { willReadFrequently: true });
      if (!fCtx) continue;

      const pad = 10;
      const avail = TARGET_SIZE - pad * 2;
      const scale = Math.min(avail / cropW, avail / cropH);
      const drawW = Math.round(cropW * scale);
      const drawH = Math.round(cropH * scale);
      const dx = Math.round((TARGET_SIZE - drawW) / 2);
      // Align near bottom so feet/turtle stay grounded across frames
      const dy = Math.round(TARGET_SIZE - pad - drawH);

      fCtx.drawImage(srcCanvas, minX, minY, cropW, cropH, dx, dy, drawW, drawH);

      // Step 3: Flood-fill outer white background from frame borders so Roshi sits cleanly on any dojo palette
      const fImg = fCtx.getImageData(0, 0, TARGET_SIZE, TARGET_SIZE);
      const fData = fImg.data;
      const visited = new Uint8Array(TARGET_SIZE * TARGET_SIZE);
      const queue = new Int32Array(TARGET_SIZE * TARGET_SIZE);
      let qHead = 0;
      let qTail = 0;

      const isOuterWhite = (idx4: number): boolean => {
        const a = fData[idx4 + 3];
        if (a === 0) return true;
        return fData[idx4] > 238 && fData[idx4 + 1] > 238 && fData[idx4 + 2] > 238;
      };

      const pushIfWhite = (px: number, py: number) => {
        const pos = py * TARGET_SIZE + px;
        if (visited[pos]) return;
        const idx4 = pos * 4;
        if (isOuterWhite(idx4)) {
          visited[pos] = 1;
          queue[qTail++] = pos;
        }
      };

      for (let x = 0; x < TARGET_SIZE; x++) {
        pushIfWhite(x, 0);
        pushIfWhite(x, TARGET_SIZE - 1);
      }
      for (let y = 0; y < TARGET_SIZE; y++) {
        pushIfWhite(0, y);
        pushIfWhite(TARGET_SIZE - 1, y);
      }

      while (qHead < qTail) {
        const pos = queue[qHead++];
        fData[pos * 4 + 3] = 0; // Make outer background pixel transparent
        const px = pos % TARGET_SIZE;
        const py = (pos - px) / TARGET_SIZE;
        if (px > 0) pushIfWhite(px - 1, py);
        if (px < TARGET_SIZE - 1) pushIfWhite(px + 1, py);
        if (py > 0) pushIfWhite(px, py - 1);
        if (py < TARGET_SIZE - 1) pushIfWhite(px, py + 1);
      }

      fCtx.putImageData(fImg, 0, 0);
      frames.push(frameCanvas);
    }
  }

  extractedFramesCache.set(spec.id, frames);
  return frames;
}

export interface MaestroRoshiSpriteAvatarProps {
  spec: RoshiSpriteSpec;
  isTalking?: boolean;
  popKey?: number | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  floating?: boolean;
}

export const MaestroRoshiSpriteAvatar: React.FC<MaestroRoshiSpriteAvatarProps> = ({
  spec,
  isTalking = true,
  popKey = 0,
  size = 'md',
  floating = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frames, setFrames] = useState<HTMLCanvasElement[]>(() => {
    const cached = extractedFramesCache.get(spec.id);
    if (cached && cached.length > 0) return cached;
    const preloadedImg = preloadedSpriteImages.get(spec.id);
    if (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0) {
      return extractFramesFromSpriteSheet(preloadedImg, spec);
    }
    return [];
  });
  const [frameIdx, setFrameIdx] = useState<number>(0);
  const [isPopping, setIsPopping] = useState<boolean>(false);
  const [gifErrorIdx, setGifErrorIdx] = useState<number>(0);
  const [useCanvasFallback, setUseCanvasFallback] = useState<boolean>(false);

  const isPervertedAnim = (PERVERTED_ANIMATION_IDS as readonly string[]).includes(spec.id);
  const resolvedGifUrl = useMemo(() => {
    if (!isPervertedAnim) return undefined;
    if (gifErrorIdx === 0 && spec.gifUrl) return spec.gifUrl;
    if (PERVERTED_ROSHI_GIF_URLS.length > 0) {
      return PERVERTED_ROSHI_GIF_URLS[gifErrorIdx % PERVERTED_ROSHI_GIF_URLS.length];
    }
    return undefined;
  }, [isPervertedAnim, spec.gifUrl, gifErrorIdx]);

  // Trigger pop entrance animation whenever popKey or spec.id changes
  useEffect(() => {
    setIsPopping(true);
    setFrameIdx(0);
    setGifErrorIdx(0);
    setUseCanvasFallback(false);
    const t = setTimeout(() => setIsPopping(false), 520);
    return () => clearTimeout(t);
  }, [popKey, spec.id, spec.gifUrl]);

  // Load and slice sprite sheet (instant if already cached or preloaded)
  useEffect(() => {
    let cancelled = false;
    const cached = extractedFramesCache.get(spec.id);
    if (cached && cached.length > 0) {
      setFrames(cached);
      return;
    }

    const preloadedImg = preloadedSpriteImages.get(spec.id);
    if (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0) {
      const extracted = extractFramesFromSpriteSheet(preloadedImg, spec);
      setFrames(extracted);
      return;
    }

    const img = preloadedImg ?? new Image();
    if (!preloadedImg) {
      img.decoding = 'async';
      img.src = spec.src;
      preloadedSpriteImages.set(spec.id, img);
    }
    const handleLoad = () => {
      if (cancelled) return;
      const extracted = extractFramesFromSpriteSheet(img, spec);
      setFrames(extracted);
    };
    img.addEventListener('load', handleLoad);
    return () => {
      cancelled = true;
      img.removeEventListener('load', handleLoad);
    };
  }, [spec]);

  // Frame animation loop
  useEffect(() => {
    if (frames.length === 0) return;

    const activeSequence =
      spec.id === 'HABLANDO'
        ? isTalking
          ? [0, 2, 3, 4, 5, 2, 5, 6, 7, 8]
          : [0, 1, 2, 1, 7, 8]
        : Array.from({ length: frames.length }, (_, i) => i);

    const intervalMs =
      spec.id === 'HABLANDO' && !isTalking
        ? 420
        : Math.round(1000 / Math.max(4, spec.fps));

    let step = 0;
    const timer = setInterval(() => {
      step = (step + 1) % activeSequence.length;
      const nextFrameIndex = activeSequence[step] % frames.length;
      setFrameIdx(nextFrameIndex);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [frames, spec, isTalking]);

  // Draw active frame onto visible canvas synchronously before browser paint
  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const activeFrame = frames[frameIdx % frames.length] ?? frames[0];
    if (activeFrame) {
      ctx.drawImage(activeFrame, 0, 0, canvas.width, canvas.height);
    }
  }, [frames, frameIdx]);

  const sizeClasses =
    size === 'xs'
      ? 'w-11 h-11 rounded-xl'
      : size === 'sm'
      ? 'w-20 h-20 md:w-24 md:h-24 rounded-2xl'
      : size === 'lg'
      ? 'w-28 h-28 md:w-36 md:h-36 rounded-2xl'
      : 'w-24 h-24 md:w-28 md:h-28 rounded-2xl';

  const isSurprise = spec.isSurprise;
  const isMistake = spec.isMistake;
  const showGifInsideFrame = isPervertedAnim && Boolean(resolvedGifUrl) && !useCanvasFallback;

  return (
    <div
      data-testid="roshi-sprite-avatar"
      data-animation-id={spec.id}
      data-category={spec.category}
      data-is-surprise={isSurprise ? 'true' : 'false'}
      data-is-mistake={isMistake ? 'true' : 'false'}
      data-gif-active={showGifInsideFrame ? 'true' : 'false'}
      title={spec.name}
      className={`relative ${sizeClasses} ${
        (isSurprise || isMistake) && size !== 'xs' ? 'mt-3' : ''
      } border-2 ${
        isSurprise
          ? 'border-[#D97706] bg-[var(--app-roshi-avatar-surprise-bg)] ring-2 ring-[#F59E0B]/40'
          : isMistake
          ? 'border-[#DC2626] bg-[#FEF2F2] ring-2 ring-[#EF4444]/35'
          : 'border-[var(--app-primary)] bg-[var(--app-roshi-avatar-bg)]'
      } shadow-sm flex items-center justify-center shrink-0 select-none overflow-visible transition-transform duration-300 ${
        isPopping ? 'roshi-pop-enter' : floating && size !== 'xs' ? 'roshi-avatar-float' : ''
      }`}
    >
      {/* Decorative Warm Dojo Ki Aura Disk behind Roshi */}
      <div
        className={`w-3/4 h-3/4 rounded-full absolute pointer-events-none transition-colors ${
          isSurprise
            ? 'bg-[#F59E0B]/30 roshi-ki-aura'
            : isMistake
            ? 'bg-[#EF4444]/25 roshi-ki-aura'
            : 'bg-[#D97706]/20 roshi-ki-aura'
        }`}
      />

      {showGifInsideFrame ? (
        <div className="relative z-10 w-full h-full overflow-hidden rounded-[inherit] p-0.5">
          <img
            src={resolvedGifUrl}
            alt={spec.name}
            data-testid="roshi-perverted-gif"
            onError={() => {
              if (gifErrorIdx + 1 < PERVERTED_ROSHI_GIF_URLS.length) {
                setGifErrorIdx((i) => i + 1);
              } else {
                setUseCanvasFallback(true);
              }
            }}
            className="w-full h-full object-cover rounded-[inherit]"
          />
        </div>
      ) : null}

      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        aria-label={spec.name}
        className={`relative z-10 w-full h-full object-contain p-0.5 ${
          showGifInsideFrame ? 'hidden' : ''
        }`}
      />

      {/* Top Surprise or Mistake Badge when a non-conversational animation appears */}
      {(isSurprise || isMistake) && size !== 'xs' && (
        <div className="absolute -top-3 inset-x-0 z-20 flex justify-center pointer-events-none">
          <span
            data-testid={isMistake ? 'roshi-mistake-badge' : 'roshi-surprise-badge'}
            className={`px-2 py-0.5 rounded-full text-white shadow-xs text-[9px] font-bold tracking-wide whitespace-nowrap inline-flex items-center gap-1 roshi-badge-pop ${
              isMistake ? 'bg-[#DC2626]' : 'bg-[#D97706]'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 shrink-0" />
            <span>{spec.badgeLabel}</span>
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Strips repeated "Maestro Roshi" / "Roshi" / "Enseñanza" mentions from message titles so that
 * the card can display a single "Maestro Roshi" badge alongside a concise context subtitle.
 */
export function formatCleanRoshiContextTitle(rawTitle: string): string {
  return cleanRoshiTitleText(rawTitle);
}

let activeScrollAnimFrame: number | null = null;
let isProgrammaticScrolling = false;
let lastProgrammaticScrollTime = 0;

export function animateScrollToElement(
  targetEl: HTMLElement,
  block: 'center' | 'start' = 'center',
  durationMs: number = 520
): void {
  if (typeof window === 'undefined') return;

  if (activeScrollAnimFrame !== null) {
    cancelAnimationFrame(activeScrollAnimFrame);
    activeScrollAnimFrame = null;
  }

  const rect = targetEl.getBoundingClientRect();
  const currentScrollY = window.scrollY || window.pageYOffset || 0;
  const viewportH = window.innerHeight || 800;
  const headerEl = document.querySelector<HTMLElement>('header');
  const stickyHeaderOffset = (headerEl ? headerEl.getBoundingClientRect().height : 78) + 8;

  let targetScrollY: number;
  if (block === 'start' || rect.height > viewportH * 0.82) {
    targetScrollY = currentScrollY + rect.top - stickyHeaderOffset;
  } else {
    const elementCenterDocY = currentScrollY + rect.top + rect.height / 2;
    targetScrollY = elementCenterDocY - viewportH / 2 - 10;
  }

  const maxScrollY = Math.max(
    0,
    (document.documentElement.scrollHeight || document.body.scrollHeight || 0) - viewportH
  );
  targetScrollY = Math.max(0, Math.min(maxScrollY, targetScrollY));

  const distance = targetScrollY - currentScrollY;
  if (Math.abs(distance) < 6) return;

  isProgrammaticScrolling = true;
  lastProgrammaticScrollTime = performance.now();
  const startTime = performance.now();

  // Slow and gentle at the start, then accelerates rapidly to position the target section
  const easeSlowStartFastCenter = (t: number): number => {
    if (t < 0.52) {
      return 0.42 * Math.pow(t / 0.52, 2.5);
    }
    const u = (t - 0.52) / 0.48;
    return 0.42 + 0.58 * (1 - Math.pow(1 - u, 3.4));
  };

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    const eased = easeSlowStartFastCenter(progress);
    window.scrollTo(0, Math.round(currentScrollY + distance * eased));

    if (progress < 1) {
      activeScrollAnimFrame = requestAnimationFrame(step);
    } else {
      activeScrollAnimFrame = null;
      lastProgrammaticScrollTime = performance.now();
      setTimeout(() => {
        isProgrammaticScrolling = false;
      }, 140);
    }
  };

  activeScrollAnimFrame = requestAnimationFrame(step);
}

export function centerTopInfoSectionInView(options?: { fallbackScrollTop?: boolean }): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  requestAnimationFrame(() => {
    const topInfos = Array.from(
      document.querySelectorAll<HTMLElement>('[data-testid="board-top-info-section"]')
    );
    const visibleTopInfo = topInfos.find((el) => el.offsetParent !== null);
    if (visibleTopInfo) {
      animateScrollToElement(visibleTopInfo, 'start', 460);
    } else if (options?.fallbackScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

export function centerActiveGoBoardInView(options?: { fallbackScrollTop?: boolean }): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  requestAnimationFrame(() => {
    const boards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-testid="go-board-container"]')
    );
    const visibleBoard = boards.find((el) => el.offsetParent !== null);
    if (visibleBoard) {
      animateScrollToElement(visibleBoard, 'center', 520);
    } else if (options?.fallbackScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/**
 * Hook that assists the user in moving quickly between the top text section
 * ([data-testid="board-top-info-section"]) and the Go board ([data-testid="go-board-container"])
 * when scrolling down or up, with a slow-start -> fast-center animation.
 */
export function useQuickBoardSectionScrollAssist(stepKey: string): void {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let touchStartY: number | null = null;

    const getVisibleLandmarks = () => {
      const spotlight = document.querySelector('[data-testid="roshi-spotlight-overlay"]');
      if (spotlight) return null;

      const topInfos = Array.from(
        document.querySelectorAll<HTMLElement>('[data-testid="board-top-info-section"]')
      );
      const boards = Array.from(
        document.querySelectorAll<HTMLElement>('[data-testid="go-board-container"]')
      );
      const topInfoEl = topInfos.find((el) => el.offsetParent !== null) ?? null;
      const boardEl = boards.find((el) => el.offsetParent !== null) ?? null;
      if (!topInfoEl || !boardEl) return null;

      // Only assist when topInfo and board are vertically separated (e.g. stacked layout or scrolled)
      const topRect = topInfoEl.getBoundingClientRect();
      const boardRect = boardEl.getBoundingClientRect();
      const topCenterY = topRect.top + topRect.height / 2;
      const boardCenterY = boardRect.top + boardRect.height / 2;
      if (Math.abs(boardCenterY - topCenterY) < 90) {
        return null;
      }

      return { topInfoEl, boardEl, topCenterY, boardCenterY };
    };

    const triggerDirectionalAssist = (direction: 'DOWN' | 'UP'): boolean => {
      const now = performance.now();
      if (isProgrammaticScrolling || now - lastProgrammaticScrollTime < 620) {
        return false;
      }

      const landmarks = getVisibleLandmarks();
      if (!landmarks) return false;

      const viewportCenterY = (window.innerHeight || 800) / 2;
      const { topInfoEl, boardEl, topCenterY, boardCenterY } = landmarks;

      if (direction === 'DOWN') {
        // User is above the board (reading top text) and wants to go down to the board
        if (boardCenterY > viewportCenterY + 65 && topCenterY < viewportCenterY + 140) {
          animateScrollToElement(boardEl, 'center', 540);
          return true;
        }
      } else {
        // User is at the board and wants to go up to read the text above the board
        if (topCenterY < viewportCenterY - 65 && boardCenterY > viewportCenterY - 180) {
          animateScrollToElement(topInfoEl, 'start', 500);
          return true;
        }
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 16) return;
      const dir = e.deltaY > 0 ? 'DOWN' : 'UP';
      if (triggerDirectionalAssist(dir)) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null || e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // > 0 means swiping up (scrolling down)
      if (Math.abs(deltaY) < 26) return;
      const dir = deltaY > 0 ? 'DOWN' : 'UP';
      if (triggerDirectionalAssist(dir)) {
        touchStartY = null;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [stepKey]);
}

export interface MaestroRoshiTeachingCardProps {
  /** Heading or context label above the message */
  title: string;
  /** Primary teaching, instruction, feedback, or narration spoken by Maestro Roshi */
  message: string;
  /** Optional secondary tip, principle, or deep-dive note */
  subMessage?: string;
  subMessageLabel?: string;
  /** Optional tone styling for exercises/puzzles */
  tone?: 'DEFAULT' | 'SUCCESS' | 'WARNING' | 'SURPRISE';
  /**
   * Explicit animation category for Maestro Roshi:
   * - 'CONVERSATION': normal talking sprite ('HABLANDO')
   * - 'SURPRISE': shuffled surprise pose (correct answers, correct stone placements, captures/wins in Practice, unlocking colors)
   * - 'MISTAKE': shuffled negative/correction pose (wrong answers, wrong/illegal stone placements)
   * If omitted, defaults based on `tone` ('SUCCESS'/'SURPRISE' -> 'SURPRISE', 'WARNING' -> 'MISTAKE', 'DEFAULT' -> 'CONVERSATION').
   */
  animationCategory?: RoshiAnimationCategory;
  /** Optional custom interaction trigger key; when it changes, advances the scheduler */
  interactionKey?: string | number;
  /** Avatar size */
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg';
  /** Optional forced animation override */
  forcedAnimationId?: RoshiAnimationId;
  /** Optional forced flavor note override for special one-off moments (e.g. Onboarding first stone or Academia shuffle dialogues) without altering the sprite catalog */
  forcedFlavorNote?: string;
  /** When true, hides the context subtitle (e.g. "Clase # en turno") below/next to the "Maestro Roshi" badge */
  hideContextTitle?: boolean;
  /** Custom label for the button that dismisses Maestro Roshi's overlay to observe the board/lesson */
  dismissLabel?: string;
  /** Whether to automatically pop open the blurred Spotlight Overlay when interactionKey changes */
  autoOpenSpotlight?: boolean;
  /** Whether dismissing the spotlight should center the active GoBoard in the viewport */
  centerBoardOnDismiss?: boolean;
  /** Whether even the first mount of this card (e.g. inside LessonPlayer steps) should center the board on dismiss */
  alwaysCenterBoardOnDismiss?: boolean;
  /**
   * Key identifying the text/instructions above the board.
   * When this key changes (new text appeared above the board), dismissing Roshi centers
   * on the new text above the board rather than skipping straight to the board.
   */
  topInfoKey?: string | number;
  /**
   * When two buttons are shown (children action button + dismiss button),
   * controls whether the action button (children) has priority and appears on the RIGHT
   * with the attention-grabbing animation while the dismiss/observe button stays on the LEFT.
   * Defaults to true when children are provided. Set to false when the dismiss button should
   * have priority on the right (e.g., before solving a review board in Hoy).
   */
  prioritizeActionOnRight?: boolean;
  /**
   * When true, Maestro Roshi's message does not appear on initial entry into the view;
   * it waits until the user scrolls down or centers/interacts with the Go board.
   */
  deferInitialSpotlightUntilScroll?: boolean;
  /**
   * Optional delay in milliseconds (e.g. 1500ms after placing a stone on the board)
   * before Maestro Roshi's message appears, allowing the user to observe their stone on the board first.
   */
  spotlightDelayMs?: number;
  /**
   * When true, renders the card in compact miniature mode on desktop as well as mobile,
   * so only the miniature Roshi button is shown until the user chooses to expand it.
   */
  defaultMinimized?: boolean;
  /** Optional callback invoked when the spotlight overlay is dismissed */
  onDismissSpotlight?: () => void;
  /** Optional extra footer or action buttons */
  children?: React.ReactNode;
  testId?: string;
}

let lastGlobalProcessedTrigger: string | null = null;

export const MaestroRoshiTeachingCard: React.FC<MaestroRoshiTeachingCardProps> = ({
  title,
  message,
  subMessage,
  subMessageLabel = 'Principio del Maestro:',
  tone = 'DEFAULT',
  animationCategory,
  interactionKey,
  avatarSize = 'md',
  forcedAnimationId,
  forcedFlavorNote,
  hideContextTitle = false,
  dismissLabel = 'Entendido',
  autoOpenSpotlight = true,
  centerBoardOnDismiss = true,
  alwaysCenterBoardOnDismiss = false,
  topInfoKey,
  prioritizeActionOnRight = true,
  deferInitialSpotlightUntilScroll = false,
  spotlightDelayMs = 0,
  defaultMinimized = false,
  onDismissSpotlight,
  children,
  testId = 'roshi-teaching-card',
}) => {
  const resolvedCategory: RoshiAnimationCategory = useMemo(() => {
    if (animationCategory) return animationCategory;
    if (tone === 'SUCCESS' || tone === 'SURPRISE') return 'SURPRISE';
    if (tone === 'WARNING') return 'MISTAKE';
    return 'CONVERSATION';
  }, [animationCategory, tone]);

  const effectiveTrigger = useMemo(
    () => (interactionKey !== undefined ? String(interactionKey) : `${title}::${message}`),
    [interactionKey, title, message]
  );

  const [activeSpec, setActiveSpec] = useState<RoshiSpriteSpec>(() => {
    const baseSpec = forcedAnimationId
      ? ROSHI_SPRITE_CATALOG[forcedAnimationId]
      : resolvedCategory === 'CONVERSATION'
      ? ROSHI_SPRITE_CATALOG.HABLANDO
      : getCurrentGlobalRoshiSpec();
    return forcedFlavorNote ? { ...baseSpec, flavorNote: forcedFlavorNote } : baseSpec;
  });
  const [popCounter, setPopCounter] = useState<number>(1);
  const [visibleChars, setVisibleChars] = useState<number>(0);

  // Spotlight Overlay state: pops over the board/lesson with blurred backdrop, and can be dismissed to observe the board
  const prevTriggerRef = useRef<string | null>(null);
  // Tracks the last topInfoKey for which the user already dismissed Roshi and read the top text
  const lastSeenTopInfoKeyRef = useRef<string | null>(null);
  // Tracks whether the current spotlight opening was the initial tab entry (false = stay at top) or a subsequent interaction (true = center board)
  const shouldCenterOnCurrentSpotlightRef = useRef<boolean>(alwaysCenterBoardOnDismiss);
  const [hasRevealedDeferred, setHasRevealedDeferred] = useState<boolean>(
    !deferInitialSpotlightUntilScroll
  );
  const [isWaitingForDelay, setIsWaitingForDelay] = useState<boolean>(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(
    autoOpenSpotlight && !deferInitialSpotlightUntilScroll && spotlightDelayMs <= 0
  );
  const [isSpotlightClosing, setIsSpotlightClosing] = useState<boolean>(false);
  const [isDesktopCardMinimized, setIsDesktopCardMinimized] = useState<boolean>(defaultMinimized);
  const [showTwoMistakesVideoOverlay, setShowTwoMistakesVideoOverlay] = useState<boolean>(false);
  const [twoMistakesDialogue, setTwoMistakesDialogue] = useState<string>(
    ROSHI_TWO_MISTAKES_DIALOGUE
  );

  // If deferInitialSpotlightUntilScroll is active and not yet revealed, listen for user scrolling down or centering on the board
  useEffect(() => {
    if (!deferInitialSpotlightUntilScroll || hasRevealedDeferred) return;
    if (typeof window === 'undefined') return;

    const mountTime = performance.now();
    let baselineY = window.scrollY || window.pageYOffset || 0;
    let touchStartY: number | null = null;

    const triggerDeferredReveal = () => {
      setHasRevealedDeferred(true);
      shouldCenterOnCurrentSpotlightRef.current = true;
      centerActiveGoBoardInView();
      if (autoOpenSpotlight) {
        setIsSpotlightClosing(false);
        setIsSpotlightOpen(true);
        setPopCounter((c) => c + 1);
        setVisibleChars(0);
        playRoshiAnimationSound(activeSpec.id);
      }
    };

    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY || window.pageYOffset || 0;

      // Ignore programmatic scroll or initial tab-switch scroll reset during the first 220ms after mount
      if (isProgrammaticScrolling || now - mountTime < 220) {
        baselineY = currentY;
        return;
      }

      if (currentY < baselineY) {
        baselineY = currentY;
        return;
      }

      if (currentY > baselineY + 10 && currentY > 12) {
        triggerDeferredReveal();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (performance.now() - mountTime < 120) return;
      if (e.deltaY > 6) {
        triggerDeferredReveal();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (performance.now() - mountTime < 120) return;
      if (touchStartY === null || e.touches.length !== 1) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 12) {
        triggerDeferredReveal();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [deferInitialSpotlightUntilScroll, hasRevealedDeferred, autoOpenSpotlight, activeSpec.id]);

  // Listen for special reward / celebration priority so any active Roshi spotlight or typewriter yields immediately
  useEffect(() => {
    const handlePriorityPreempt = () => {
      if (isCelebrationPriorityActive()) {
        setIsSpotlightOpen(false);
        setIsSpotlightClosing(false);
        setIsWaitingForDelay(false);
        setVisibleChars(message ? message.length : 0);
      }
    };
    celebrationPriorityListeners.add(handlePriorityPreempt);
    return () => {
      celebrationPriorityListeners.delete(handlePriorityPreempt);
    };
  }, [message]);

  // Advance scheduler on every new teaching/message interaction across the app
  useEffect(() => {
    const isInitialMountOfCard = prevTriggerRef.current === null;
    const prevTrigger = prevTriggerRef.current;

    // On initial mount when deferInitialSpotlightUntilScroll is enabled, wait for the scroll listener
    if (isInitialMountOfCard && deferInitialSpotlightUntilScroll && !hasRevealedDeferred) {
      prevTriggerRef.current = effectiveTrigger;
      return;
    }

    // If a subsequent trigger happens (e.g. user placed a stone on the board directly), mark deferred as revealed
    if (!isInitialMountOfCard && !hasRevealedDeferred) {
      setHasRevealedDeferred(true);
    }

    // Resolve the sprite spec and consecutive-mistake counter immediately when a new trigger arrives
    // so rapid consecutive attempts are accurately counted even before spotlightDelayMs elapses.
    let preResolvedSpec: RoshiSpriteSpec;
    let triggeredTwoMistakesNow = false;

    if (forcedAnimationId) {
      preResolvedSpec = ROSHI_SPRITE_CATALOG[forcedAnimationId];
      if (lastGlobalProcessedTrigger !== effectiveTrigger) {
        lastGlobalProcessedTrigger = effectiveTrigger;
        advanceGlobalRoshiInteraction({ category: resolvedCategory });
        triggeredTwoMistakesNow = didGlobalTriggerTwoMistakesVideo();
        if (triggeredTwoMistakesNow) {
          clearGlobalTwoMistakesVideoTrigger();
        }
      }
    } else if (lastGlobalProcessedTrigger !== effectiveTrigger) {
      lastGlobalProcessedTrigger = effectiveTrigger;
      preResolvedSpec = advanceGlobalRoshiInteraction({ category: resolvedCategory });
      triggeredTwoMistakesNow = didGlobalTriggerTwoMistakesVideo();
      if (triggeredTwoMistakesNow) {
        clearGlobalTwoMistakesVideoTrigger();
      }
    } else {
      const currentSpec = getCurrentGlobalRoshiSpec();
      if (currentSpec.category !== resolvedCategory) {
        preResolvedSpec = advanceGlobalRoshiInteraction({ category: resolvedCategory });
        triggeredTwoMistakesNow = didGlobalTriggerTwoMistakesVideo();
        if (triggeredTwoMistakesNow) {
          clearGlobalTwoMistakesVideoTrigger();
        }
      } else {
        preResolvedSpec = currentSpec;
      }
    }

    if (forcedFlavorNote) {
      preResolvedSpec = { ...preResolvedSpec, flavorNote: forcedFlavorNote };
    }

    // If the student just made their first mistake, immediately ensure the 2-mistakes reward video is in RAM
    if (getGlobalConsecutiveMistakes() >= 1) {
      warmUpRewardVideoUrls(ROSHI_TWO_MISTAKES_VIDEO_URL, undefined, true);
    }

    // When the user commits 2 consecutive mistakes, immediately play the special video reward
    // with priority (no 650ms spotlight delay and no background typewriter audio).
    if (triggeredTwoMistakesNow) {
      prevTriggerRef.current = effectiveTrigger;
      notifySpecialRewardPriority();
      setActiveSpec(preResolvedSpec);
      setPopCounter((c) => c + 1);
      setIsWaitingForDelay(false);
      setIsSpotlightOpen(false);
      setIsSpotlightClosing(false);
      setVisibleChars(message ? message.length : 0);
      setTwoMistakesDialogue(getGlobalCurrentMistakeRewardDialogue());
      setShowTwoMistakesVideoOverlay(true);
      return;
    }

    const applyTriggerActivation = () => {
      prevTriggerRef.current = effectiveTrigger;
      setActiveSpec(preResolvedSpec);
      setPopCounter((c) => c + 1);
      setIsWaitingForDelay(false);

      // If a special reward / celebration overlay has priority or autoOpenSpotlight is disabled,
      // do NOT play Roshi's animation sound or typewriter blips in the background.
      if (isCelebrationPriorityActive() || !autoOpenSpotlight) {
        setVisibleChars(message ? message.length : 0);
        setIsSpotlightOpen(false);
        return;
      }

      setVisibleChars(0);
      playRoshiAnimationSound(preResolvedSpec.id);

      if (shouldAutoOpenSpotlightForTrigger(prevTrigger, effectiveTrigger, autoOpenSpotlight)) {
        shouldCenterOnCurrentSpotlightRef.current = isInitialMountOfCard
          ? alwaysCenterBoardOnDismiss
          : true;
        setIsSpotlightClosing(false);
        setIsSpotlightOpen(true);
      }
    };

    if (isCelebrationPriorityActive() || !autoOpenSpotlight) {
      applyTriggerActivation();
      return;
    }

    if (!isInitialMountOfCard && spotlightDelayMs > 0) {
      setIsSpotlightOpen(false);
      setIsWaitingForDelay(true);
      setVisibleChars(message ? message.length : 0);
      const timer = setTimeout(applyTriggerActivation, spotlightDelayMs);
      return () => clearTimeout(timer);
    }

    applyTriggerActivation();
  }, [
    effectiveTrigger,
    resolvedCategory,
    forcedAnimationId,
    forcedFlavorNote,
    autoOpenSpotlight,
    alwaysCenterBoardOnDismiss,
    deferInitialSpotlightUntilScroll,
    spotlightDelayMs,
  ]);

  // Allow dismissing spotlight with Escape key
  useEffect(() => {
    if (!isSpotlightOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismissSpotlight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpotlightOpen]);

  // Progressive typewriter effect with retro RPG voice blip every 3 non-empty characters
  useEffect(() => {
    if (!message) {
      setVisibleChars(0);
      return;
    }

    const totalLen = message.length;

    // Never run background typewriter sound while waiting for delay, while a special reward is open,
    // or when autoOpenSpotlight is disabled.
    if (isWaitingForDelay || isCelebrationPriorityActive() || !autoOpenSpotlight) {
      setVisibleChars(totalLen);
      return;
    }

    const pitchOffset = getRoshiMoodPitchOffset(activeSpec.id, tone);
    const charsPerTick = Math.max(1, Math.ceil(totalLen / 65));
    const tickMs = 24;
    let nonEmptyCount = 0;

    const interval = setInterval(() => {
      if (isCelebrationPriorityActive()) {
        clearInterval(interval);
        setVisibleChars(totalLen);
        return;
      }
      setVisibleChars((prev) => {
        if (prev >= totalLen) {
          clearInterval(interval);
          return totalLen;
        }
        const next = Math.min(totalLen, prev + charsPerTick);
        let shouldPlayBlip = false;
        for (let i = prev; i < next; i++) {
          const ch = message[i];
          if (ch && ch.trim().length > 0) {
            nonEmptyCount += 1;
            if (nonEmptyCount % 3 === 0) {
              shouldPlayBlip = true;
            }
          }
        }
        if (shouldPlayBlip && !isCelebrationPriorityActive()) {
          soundFX.playVoiceBlip(pitchOffset);
        }
        return next;
      });
    }, tickMs);

    return () => clearInterval(interval);
  }, [message, popCounter, activeSpec.id, tone, isWaitingForDelay, autoOpenSpotlight]);

  const isTyping = visibleChars < message.length;
  const progressPct = getTypewriterProgressPct(message, visibleChars);
  const revealedSlice = getProgressiveTextSlice(message, visibleChars);
  const hiddenSlice = message.slice(visibleChars);

  const handleReplayMessage = () => {
    setPopCounter((c) => c + 1);
    setVisibleChars(0);
    playRoshiAnimationSound(activeSpec.id);
  };

  const handleOpenSpotlight = () => {
    shouldCenterOnCurrentSpotlightRef.current = true;
    setIsSpotlightClosing(false);
    setIsSpotlightOpen(true);
    setPopCounter((c) => c + 1);
    setVisibleChars(0);
    playRoshiAnimationSound(activeSpec.id);
  };

  const handleDismissSpotlight = () => {
    const shouldCenter = centerBoardOnDismiss && shouldCenterOnCurrentSpotlightRef.current;
    const resolvedTopInfoKey = topInfoKey !== undefined ? String(topInfoKey) : null;
    const hasNewTopInfoAboveBoard =
      resolvedTopInfoKey !== null && lastSeenTopInfoKeyRef.current !== resolvedTopInfoKey;

    if (resolvedTopInfoKey !== null) {
      lastSeenTopInfoKeyRef.current = resolvedTopInfoKey;
    }

    setIsSpotlightClosing(true);
    setTimeout(() => {
      setIsSpotlightOpen(false);
      setIsSpotlightClosing(false);
      if (onDismissSpotlight) {
        onDismissSpotlight();
      }
      if (hasNewTopInfoAboveBoard) {
        // Exception: when new text has appeared above the board, center on the text section so the user reads it first
        centerTopInfoSectionInView();
      } else if (shouldCenter) {
        centerActiveGoBoardInView();
      }
    }, 160);
  };

  const toneContainerClasses =
    tone === 'SUCCESS'
      ? 'bg-[var(--answer-correct-bg)] border-[var(--answer-correct-border)] text-[var(--answer-correct-text)]'
      : tone === 'WARNING'
      ? 'bg-[var(--answer-wrong-bg)] border-[var(--answer-wrong-border)] text-[var(--answer-wrong-text)]'
      : !activeSpec.isConversational
      ? 'bg-[var(--app-roshi-surprise-bg)] border-[var(--app-roshi-surprise-border)] text-[var(--app-text)]'
      : 'bg-[var(--app-roshi-bg)] border-[var(--app-roshi-border)] text-[var(--app-text)]';

  const hasTwoButtons = Boolean(children);
  const actionHasRightPriority = hasTwoButtons && prioritizeActionOnRight;
  const resolvedDismissLabel =
    hasTwoButtons || dismissLabel.startsWith('Entendido') ? 'Entendido' : dismissLabel;
  const cleanContextTitle = formatCleanRoshiContextTitle(title);

  return (
    <>
      {showTwoMistakesVideoOverlay && (
        <CelebrationGifOverlay
          open={showTwoMistakesVideoOverlay}
          videoUrl={ROSHI_TWO_MISTAKES_VIDEO_URL}
          congratsTitle={ROSHI_TWO_MISTAKES_TITLE}
          accomplishmentText={ROSHI_TWO_MISTAKES_TITLE}
          specialLevelDialogue={twoMistakesDialogue}
          actionLabel="Entendido"
          onClose={() => setShowTwoMistakesVideoOverlay(false)}
          testId="two-mistakes-video-reward-overlay"
        />
      )}

      {/* 1. SPOTLIGHT OVERLAY WITH BLURRED BACKGROUND (Portaled to document.body so it always renders centered above all sections/headers) */}
      {isSpotlightOpen &&
        (() => {
          const spotlightModal = (
            <div
              role="dialog"
              aria-modal="false"
              aria-label={title}
              data-testid="roshi-spotlight-overlay"
              data-animation-id={activeSpec.id}
              onClick={handleDismissSpotlight}
              className={`fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-[#071A14]/55 backdrop-blur-md ${
                isSpotlightClosing ? 'roshi-backdrop-exit' : 'roshi-backdrop-enter'
              }`}
            >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (isTyping) {
                setVisibleChars(message.length);
              }
            }}
            data-testid="roshi-spotlight-card"
            className={`relative w-full max-w-lg rounded-3xl border-2 p-5 sm:p-6 shadow-2xl overflow-visible space-y-4 ${toneContainerClasses} ${
              isSpotlightClosing ? 'roshi-spotlight-exit' : 'roshi-spotlight-enter'
            }`}
          >
            {/* Contained Decorative Overlay for Shimmer Sweep & Top Progress Bar so child badges are never clipped */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[22px] overflow-hidden"
            >
              {/* Subtle Shimmer Sweep on Entrance */}
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent roshi-shimmer-sweep" />

              {/* Typewriter Speech Progress Bar at Top */}
              <div className="absolute top-0 inset-x-0 h-1 bg-black/10 overflow-hidden">
                <div
                  className="h-full bg-[var(--app-primary)] transition-all duration-100"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Spotlight Header: Animated Avatar + Title + Replay & Close Controls */}
            <div className="relative z-10 flex items-start justify-between gap-3.5 pt-1">
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <MaestroRoshiSpriteAvatar
                  spec={activeSpec}
                  isTalking={isTyping}
                  popKey={`spotlight-${popCounter}`}
                  size="md"
                  floating={true}
                />

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      data-testid="roshi-single-label"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--app-primary)] shrink-0"
                    >
                      <Sparkles className="w-3 h-3 text-[#D97706] shrink-0" />
                      <span>Maestro Roshi</span>
                    </span>
                  </div>

                  {(!activeSpec.isConversational || Boolean(forcedFlavorNote)) &&
                    activeSpec.flavorNote && (
                      <p
                        data-testid="roshi-flavor-note"
                        className="text-xs font-semibold text-[var(--app-roshi-surprise-accent)] italic leading-snug whitespace-normal break-words"
                      >
                        «{activeSpec.flavorNote}»
                      </p>
                    )}

                  {!hideContextTitle && (
                    <h3
                      className={`text-sm sm:text-base font-display font-bold leading-snug whitespace-normal break-words ${
                        tone === 'SUCCESS'
                          ? 'text-[var(--answer-correct-text)]'
                          : tone === 'WARNING'
                          ? 'text-[var(--answer-wrong-text)]'
                          : 'text-[var(--app-text)]'
                      }`}
                    >
                      {cleanContextTitle}
                    </h3>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReplayMessage();
                  }}
                  title="Repetir animación y voz"
                  aria-label="Repetir animación y voz"
                  className="p-2 rounded-xl bg-[var(--app-surface)]/80 border border-[var(--app-border)] text-[var(--app-muted)] hover:text-[var(--app-primary)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissSpotlight();
                  }}
                  title="Quitar mensaje para ver el tablero"
                  aria-label="Quitar mensaje del Maestro Roshi"
                  data-testid="roshi-spotlight-close-btn"
                  className="p-2 rounded-xl bg-[var(--app-surface)]/80 border border-[var(--app-border)] text-[var(--app-text)] hover:border-[var(--app-primary)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progressive Typewriter Dialogue Body */}
            <div className="rounded-2xl bg-[var(--app-surface)]/75 border border-[var(--app-border)] p-3.5 sm:p-4 space-y-2.5">
              <p className="text-xs sm:text-sm leading-relaxed font-normal text-[var(--app-text)]">
                <span>{revealedSlice}</span>
                {isTyping && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-0 h-0 relative align-baseline after:content-[''] after:absolute after:left-0.5 after:-top-3 after:w-1.5 after:h-3.5 after:bg-[#D97706] after:animate-pulse after:rounded-xs"
                  />
                )}
                {hiddenSlice && (
                  <span className="opacity-0 select-none pointer-events-none">{hiddenSlice}</span>
                )}
              </p>

              {subMessage && (
                <div className="pt-2 border-t border-[var(--app-border)] text-xs text-[var(--app-muted)] leading-relaxed">
                  <strong className="font-semibold text-[var(--app-text)]">{subMessageLabel}</strong>{' '}
                  {subMessage}
                </div>
              )}
            </div>

            {/* Footer Actions:
                - When actionHasRightPriority is true: Left = Dismiss/Observe button (secondary), Right = Action/Continue button (children, with roshi-cta-ready animation).
                - When actionHasRightPriority is false: Left = Secondary action button (children), Right = Dismiss/Observe button (primary, with roshi-cta-ready animation).
            */}
            <div
              data-testid="roshi-spotlight-footer"
              data-priority-side={actionHasRightPriority ? 'action-right' : 'dismiss-right'}
              className="flex flex-wrap items-center justify-between gap-2.5 pt-1"
            >
              {actionHasRightPriority ? (
                <>
                  {/* Left: Observe / Dismiss button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDismissSpotlight();
                    }}
                    data-testid="roshi-dismiss-spotlight-btn"
                    className="px-3.5 py-2.5 rounded-xl bg-[var(--app-surface)] hover:border-[var(--app-primary)] border border-[var(--app-border)] text-[var(--app-text)] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4 shrink-0 text-[var(--app-primary)]" />
                    <span>{resolvedDismissLabel}</span>
                  </button>

                  {/* Right: Priority Advance / Continue button with attention animation */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSpotlightOpen(false);
                    }}
                    data-testid="roshi-priority-action-slot"
                    className="ml-auto inline-flex items-center rounded-xl roshi-cta-ready"
                  >
                    {children}
                  </div>
                </>
              ) : (
                <>
                  {/* Left: Optional secondary action */}
                  {children ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSpotlightOpen(false);
                      }}
                      data-testid="roshi-secondary-action-slot"
                      className="inline-flex items-center"
                    >
                      {children}
                    </div>
                  ) : (
                    <div />
                  )}

                  {/* Right: Priority Dismiss / Observe Board button with attention animation */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDismissSpotlight();
                    }}
                    data-testid="roshi-dismiss-spotlight-btn"
                    className="ml-auto px-4 py-2.5 rounded-xl bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs roshi-cta-ready"
                  >
                    <Eye className="w-4 h-4 shrink-0" />
                    <span>{resolvedDismissLabel}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
          );
          return typeof document !== 'undefined' && document.body
            ? createPortal(spotlightModal, document.body)
            : spotlightModal;
        })()}

      {/* 2. DOCKED IN-FLOW REPRESENTATION (Compact 1-line Pill on Mobile so Board stays right under Title; Full/Collapsible Card on PC) */}
      <div
        data-testid={testId}
        data-animation-id={activeSpec.id}
        data-spotlight-open={isSpotlightOpen ? 'true' : 'false'}
        data-deferred-revealed={hasRevealedDeferred ? 'true' : 'false'}
        data-waiting-delay={isWaitingForDelay ? 'true' : 'false'}
        className="w-full"
      >
        {!hasRevealedDeferred ? null : (
          <>
            {/* Mobile & Minimized Compact Bar: Takes minimal height so Title + Board fit on one phone screen without scrolling */}
            <div
              className={`${
                isDesktopCardMinimized ? 'flex' : 'flex lg:hidden'
              } items-center justify-between gap-2.5 rounded-2xl border px-3 py-2 shadow-2xs transition-all ${toneContainerClasses}`}
            >
              <button
                type="button"
                onClick={handleOpenSpotlight}
                className="flex items-center gap-2.5 min-w-0 text-left flex-1 cursor-pointer"
              >
                <MaestroRoshiSpriteAvatar
                  spec={activeSpec}
                  isTalking={false}
                  popKey={popCounter}
                  size="xs"
                  floating={false}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold text-[var(--app-primary)] truncate">
                    Maestro Roshi
                    {!hideContextTitle && (
                      <>
                        {' · '}
                        <span className="text-[var(--app-text)] font-semibold">
                          {cleanContextTitle}
                        </span>
                      </>
                    )}
                    {hideContextTitle && forcedFlavorNote && (
                      <>
                        {' · '}
                        <span className="text-[var(--app-roshi-surprise-accent)] italic font-semibold">
                          «{forcedFlavorNote}»
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-[var(--app-text)]/85 truncate">
                    {message}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleOpenSpotlight}
                data-testid="roshi-open-spotlight-btn"
                title="Expandir mensaje"
                aria-label="Expandir mensaje"
                className="px-2.5 py-1.5 rounded-xl bg-[var(--app-primary)] text-white text-[11px] font-bold inline-flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Abrir</span>
              </button>
            </div>

            {/* Desktop Side-by-Side Card (Preserves the beloved PC layout, with Spotlight & Minimize buttons) */}
            {!isDesktopCardMinimized && (
              <div
                className={`hidden lg:flex flex-row items-start gap-4 transition-all ${
                  popCounter > 0 ? 'roshi-card-pop' : ''
                }`}
              >
            <MaestroRoshiSpriteAvatar
              spec={activeSpec}
              isTalking={isTyping}
              popKey={popCounter}
              size={avatarSize === 'xs' ? 'sm' : avatarSize}
              floating={true}
            />

            <div
              onClick={() => {
                if (isTyping) setVisibleChars(message.length);
              }}
              className={`flex-1 w-full rounded-2xl border p-4 md:p-5 space-y-2.5 shadow-2xs transition-colors relative ${toneContainerClasses}`}
            >
              {/* Top Header Row: Single Maestro Roshi Badge + Clean Context Title + Controls */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--app-surface)]/80 border border-[var(--app-border)] text-[11px] font-mono font-bold text-[var(--app-primary)] shrink-0">
                      <Sparkles className="w-2.5 h-2.5 text-[#D97706] shrink-0" />
                      <span>Maestro Roshi</span>
                    </span>
                    {!hideContextTitle && (
                      <span
                        className={`text-xs font-bold whitespace-normal break-words ${
                          tone === 'SUCCESS'
                            ? 'text-[var(--answer-correct-text)]'
                            : tone === 'WARNING'
                            ? 'text-[var(--answer-wrong-text)]'
                            : 'text-[var(--app-text)]'
                        }`}
                      >
                        · {cleanContextTitle}
                      </span>
                    )}
                  </div>
                  {(!activeSpec.isConversational || Boolean(forcedFlavorNote)) &&
                    activeSpec.flavorNote && (
                      <p
                        data-testid="roshi-desktop-flavor-note"
                        className="text-xs font-semibold text-[var(--app-roshi-surprise-accent)] italic leading-snug whitespace-normal break-words"
                      >
                        «{activeSpec.flavorNote}»
                      </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSpotlight();
                    }}
                    title="Mostrar en pantalla central con fondo difuminado"
                    className="text-[11px] font-semibold text-[var(--app-primary)] hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Destacar</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReplayMessage();
                    }}
                    className="text-[11px] font-medium text-[var(--app-muted)] hover:text-[var(--app-primary)] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Repetir</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDesktopCardMinimized(true);
                    }}
                    title="Minimizar mensaje"
                    aria-label="Minimizar mensaje del Maestro Roshi"
                    className="text-[11px] font-medium text-[var(--app-muted)] hover:text-[var(--app-text)] inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Minimize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Progressive Typewriter Text Container (with constant minimum height so typing never shifts elements below) */}
              <p
                data-testid="roshi-progressive-message"
                className="text-xs md:text-sm leading-relaxed font-normal min-h-[2.6rem]"
              >
                <span>{revealedSlice}</span>
                {isTyping && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-[#D97706] animate-pulse rounded-xs"
                  />
                )}
                {hiddenSlice && (
                  <span className="opacity-0 select-none pointer-events-none">{hiddenSlice}</span>
                )}
              </p>

              {/* Optional Sub-Message / Master Principle */}
              {subMessage && (
                <div className="pt-2 border-t border-[var(--app-border)] text-xs opacity-90 leading-relaxed">
                  <strong className="font-semibold">{subMessageLabel}</strong> {subMessage}
                </div>
              )}

              {children && (
                <div
                  className={`pt-1 flex items-center ${
                    actionHasRightPriority ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={actionHasRightPriority && !isTyping ? 'roshi-cta-ready rounded-xl' : ''}>
                    {children}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </>
  );
};

export interface CelebrationGifOverlayProps {
  open: boolean;
  gifUrl?: string;
  videoUrl?: string;
  /** Optional explicit multi-part video sequence to play back-to-back as a single continuous video */
  videoUrls?: readonly string[];
  congratsTitle: string;
  subtitle?: string;
  xpEarned?: number;
  totalJade?: number;
  /** When provided (e.g. for special video rewards), displays the title inside the golden star box at the top */
  accomplishmentText?: string;
  specialLevelDialogue?: string;
  /** Optional score text displayed at the very bottom after Maestro Roshi's dialogue */
  bottomScoreText?: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
  extraActions?: React.ReactNode;
  testId?: string;
}

export const CelebrationGifOverlay: React.FC<CelebrationGifOverlayProps> = ({
  open,
  gifUrl = CELEBRATION_GIF_URLS[0],
  videoUrl,
  videoUrls,
  congratsTitle,
  subtitle,
  xpEarned = 20,
  totalJade = 2,
  accomplishmentText,
  specialLevelDialogue,
  bottomScoreText,
  onClose,
  actionLabel = 'Continuar',
  onAction,
  extraActions,
  testId = 'celebration-gif-overlay',
}) => {
  const [fallbackIdx, setFallbackIdx] = useState<number>(0);
  const [activeVideoPartIdx, setActiveVideoPartIdx] = useState<number>(0);
  const [, setBlobCacheVersion] = useState<number>(0);
  const partVideoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);
  const lockedPartSrcsRef = React.useRef<Record<number, string>>({});
  const overlayInstanceSymbolRef = React.useRef<symbol>(Symbol('celebration-overlay'));

  const videoSequence = useMemo(
    () => resolveSpecialVideoSequence(videoUrl, videoUrls),
    [videoUrl, videoUrls]
  );

  // Subscribe to RAM Blob cache updates so upcoming video parts automatically upgrade to `blob:...` URLs
  useEffect(() => {
    if (!open || videoSequence.length === 0) return;
    const handleBlobUpdate = () => {
      setBlobCacheVersion((v) => v + 1);
    };
    videoBlobReadyListeners.add(handleBlobUpdate);
    return () => {
      videoBlobReadyListeners.delete(handleBlobUpdate);
    };
  }, [open, videoSequence.length]);

  // Synchronously register celebration priority during render so sibling MaestroRoshiTeachingCard
  // effects in the same commit see that a celebration is active and yield immediately.
  if (open) {
    activeCelebrationOverlayIds.add(overlayInstanceSymbolRef.current);
    lastSpecialRewardPriorityAtMs = Date.now();
  } else {
    activeCelebrationOverlayIds.delete(overlayInstanceSymbolRef.current);
  }

  useEffect(() => {
    const sym = overlayInstanceSymbolRef.current;
    if (open) {
      activeCelebrationOverlayIds.add(sym);
      notifySpecialRewardPriority();
    } else {
      activeCelebrationOverlayIds.delete(sym);
      if (activeCelebrationOverlayIds.size === 0) {
        lastSpecialRewardPriorityAtMs = 0;
      }
    }
    return () => {
      activeCelebrationOverlayIds.delete(sym);
      if (activeCelebrationOverlayIds.size === 0) {
        lastSpecialRewardPriorityAtMs = 0;
      }
    };
  }, [open]);

  useEffect(() => {
    setFallbackIdx(0);
    setActiveVideoPartIdx(0);
    lockedPartSrcsRef.current = {};
    if (open && videoSequence.length > 0) {
      warmUpRewardVideoUrls(videoUrl, videoUrls, true);
    }
  }, [gifUrl, videoUrl, videoUrls, open, videoSequence.length]);

  useEffect(() => {
    if (!open || videoSequence.length === 0) return;
    // Prioritize downloading the active and next 2 parts into RAM
    for (let lookahead = 0; lookahead <= 2; lookahead++) {
      const targetUrl = videoSequence[activeVideoPartIdx + lookahead];
      if (targetUrl) {
        preloadRewardVideoIntoRam(targetUrl, true);
      }
    }

    const vid = partVideoRefs.current[activeVideoPartIdx];
    if (vid) {
      vid.muted = false;
      vid.currentTime = 0;
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // If autoplay with audio is blocked by browser policy, retry muted so the video always plays
          if (vid) {
            vid.muted = true;
            vid.play().catch(() => {});
          }
        });
      }
    }
    // Pre-buffer the next 2 parts in the sequence while the current part is playing
    for (let offset = 1; offset <= 2; offset++) {
      const nextVid = partVideoRefs.current[activeVideoPartIdx + offset];
      if (nextVid) {
        nextVid.preload = 'auto';
        nextVid.muted = true;
        if (nextVid.readyState === 0) {
          nextVid.load();
        }
      }
    }
  }, [open, videoSequence, activeVideoPartIdx]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const effectiveGifUrl =
    fallbackIdx === 0
      ? gifUrl
      : CELEBRATION_GIF_URLS[fallbackIdx % Math.max(1, CELEBRATION_GIF_URLS.length)] ?? gifUrl;

  const hasVideoReward = videoSequence.length > 0;
  const isSpecialVideoMode = Boolean(hasVideoReward && accomplishmentText);
  const topGoldenTitle = accomplishmentText || congratsTitle;

  const overlayNode = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={topGoldenTitle}
      data-testid={testId}
      onClick={onClose}
      className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-[#04120E]/75 backdrop-blur-lg roshi-backdrop-enter"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="celebration-frame-enter relative w-full max-w-3xl max-h-[92vh] flex flex-col items-center justify-between gap-3 sm:gap-4 rounded-3xl bg-[#091F18]/90 border border-white/25 p-4 sm:p-6 shadow-2xl overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar celebración"
          data-testid="celebration-overlay-close-btn"
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/50 hover:bg-black/75 border border-white/25 text-white/90 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Heading: Golden Box with Star Icon ONLY (for Special Video Rewards) OR Standard Heading + Subtitle (for GIF Rewards and Advanced Class Video Rewards) */}
        {isSpecialVideoMode ? (
          <div className="celebration-title-anim flex justify-center px-6">
            <h2
              data-testid="celebration-congrats-title"
              className="celebration-xp-anim inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/55 text-amber-100 font-sans font-bold text-sm sm:text-lg shadow-sm text-center max-w-xl"
            >
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span data-testid="celebration-accomplishment-badge">{topGoldenTitle}</span>
            </h2>
          </div>
        ) : (
          <div className="celebration-title-anim text-center space-y-1 px-6">
            <h2
              data-testid="celebration-congrats-title"
              className="text-xl sm:text-3xl font-display font-bold text-white tracking-tight drop-shadow-md"
            >
              {congratsTitle}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm font-medium text-amber-200/90 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Large Centered GIF or Seamless Multi-Part Special Video with Thin Distinct Frame */}
        <div
          data-testid="celebration-gif-frame"
          className="relative w-full max-w-2xl aspect-video max-h-[54vh] rounded-2xl overflow-hidden border border-amber-300/65 shadow-[0_0_35px_rgba(245,158,11,0.28)] bg-black/80 flex items-center justify-center"
        >
          {hasVideoReward ? (
            videoSequence.map((partUrl, idx) => {
              // Mount the active video part and pre-mount the next 2 parts so they buffer seamlessly in RAM
              if (idx < activeVideoPartIdx || idx > activeVideoPartIdx + 2) {
                return null;
              }
              const isActivePart = idx === activeVideoPartIdx;
              if (isActivePart && !lockedPartSrcsRef.current[idx]) {
                lockedPartSrcsRef.current[idx] = getResolvedRewardVideoSrc(partUrl);
              }
              const effectivePartSrc = isActivePart
                ? lockedPartSrcsRef.current[idx] ?? getResolvedRewardVideoSrc(partUrl)
                : getResolvedRewardVideoSrc(partUrl);
              return (
                <video
                  key={`${partUrl}-${idx}`}
                  ref={(el) => {
                    partVideoRefs.current[idx] = el;
                  }}
                  src={effectivePartSrc}
                  data-canonical-src={partUrl}
                  preload="auto"
                  autoPlay={isActivePart}
                  muted={!isActivePart}
                  playsInline
                  onCanPlay={(e) => {
                    if (isActivePart && e.currentTarget.paused) {
                      e.currentTarget.play().catch(() => {});
                    }
                  }}
                  onEnded={() => {
                    if (!isActivePart) return;
                    if (idx + 1 < videoSequence.length) {
                      setActiveVideoPartIdx(idx + 1);
                    } else if (onAction) {
                      onAction();
                    } else {
                      onClose();
                    }
                  }}
                  data-testid={isActivePart ? 'celebration-video-player' : `celebration-video-preload-${idx}`}
                  data-part-index={idx}
                  data-total-parts={videoSequence.length}
                  className={
                    isActivePart
                      ? 'w-full h-full object-contain select-none'
                      : 'hidden pointer-events-none'
                  }
                />
              );
            })
          ) : (
            <img
              src={effectiveGifUrl}
              alt={congratsTitle}
              data-testid="celebration-gif-image"
              onError={() => {
                if (fallbackIdx + 1 <= CELEBRATION_GIF_URLS.length) {
                  setFallbackIdx((i) => i + 1);
                }
              }}
              className="w-full h-full object-contain select-none"
            />
          )}
        </div>

        {/* Distinct Animated XP & Jade Badges (for GIF Rewards only) */}
        {!isSpecialVideoMode && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div
              data-testid="celebration-xp-badge"
              className="celebration-xp-anim inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/55 text-amber-200 font-mono font-bold text-sm sm:text-base shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+{xpEarned} XP</span>
            </div>

            <div
              data-testid="celebration-jade-badge"
              className="celebration-jade-anim inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/55 text-emerald-200 font-mono font-bold text-sm sm:text-base shadow-sm"
            >
              <Gem className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{totalJade} Jade total</span>
            </div>
          </div>
        )}

        {/* Special Master / Character Dialogue at the bottom (prepared for future character PNG portraits) */}
        {specialLevelDialogue &&
          (() => {
            const characterMeta = resolveCharacterRewardDialogueMeta(specialLevelDialogue);
            const formattedDialogue = specialLevelDialogue.includes('«')
              ? specialLevelDialogue
              : `«${specialLevelDialogue}»`;
            return (
              <div
                data-testid="celebration-special-level-dialogue"
                data-character-id={characterMeta?.characterId}
                className="celebration-quote-anim max-w-2xl text-center px-4 py-2.5 rounded-2xl bg-white/10 border border-amber-300/35 text-xs sm:text-sm text-amber-100 italic leading-relaxed flex items-center justify-center gap-3"
              >
                {characterMeta?.characterImageUrl && (
                  <img
                    src={characterMeta.characterImageUrl}
                    alt={characterMeta.characterName}
                    data-testid="celebration-character-portrait"
                    className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0 select-none"
                  />
                )}
                <span>{formattedDialogue}</span>
              </div>
            );
          })()}

        {/* Bottom Score (placed at the very bottom after Maestro Roshi's dialogue when winning a game) */}
        {bottomScoreText && (
          <div
            data-testid="celebration-bottom-score"
            className="celebration-xp-anim inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/55 text-emerald-100 font-mono font-bold text-xs sm:text-sm shadow-sm text-center"
          >
            <span>{bottomScoreText}</span>
          </div>
        )}

        {/* Action Button(s) */}
        <div className="pt-0.5 flex flex-wrap items-center justify-center gap-2.5">
          {extraActions}
          <button
            type="button"
            onClick={() => {
              if (onAction) {
                onAction();
              } else {
                onClose();
              }
            }}
            data-testid="celebration-action-btn"
            className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#071A14] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' && document.body
    ? createPortal(overlayNode, document.body)
    : overlayNode;
};

