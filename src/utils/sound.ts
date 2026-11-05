// Gentle Web Audio API synthesizer for traditional Go stone clack, Maestro Roshi message pop,
// progressive typewriter blips, and classic sprite animation sound effects.

import type { RoshiAnimationId } from './roshiSpriteScheduler';

let audioCtx: AudioContext | null = null;
let lastPopSoundTimeMs = 0;
let lastTypeTickTimeMs = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Unlock AudioContext on first user gesture in browser
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  };
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
}

export function isGlobalSoundEnabled(explicitEnabled?: boolean): boolean {
  if (typeof explicitEnabled === 'boolean') return explicitEnabled;
  if (typeof document !== 'undefined' && document.documentElement?.dataset?.sound) {
    return document.documentElement.dataset.sound !== 'off';
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = window.localStorage.getItem('camino_de_go_user_state_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.profile?.soundEnabled === 'boolean') {
          return parsed.profile.soundEnabled;
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }
  return true;
}

export function playStoneSound(enabled: boolean, isCapture: boolean = false): void {
  if (!isGlobalSoundEnabled(enabled)) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isCapture ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isCapture ? 520 : 380, now);
    osc.frequency.exponentialRampToValueAtTime(isCapture ? 180 : 110, now + 0.065);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.075);
  } catch {
    // Ignore audio context errors when blocked by browser autoplay policy
  }
}

export function playSuccessChime(enabled: boolean): void {
  if (!isGlobalSoundEnabled(enabled)) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.24);
    });
  } catch {
    // Ignore
  }
}

/**
 * Standard message bubble "pop" sound played whenever Maestro Roshi's message card
 * pops onto the screen or changes teaching.
 */
export function playRoshiMessagePopSound(enabled?: boolean): void {
  if (!isGlobalSoundEnabled(enabled)) return;
  const nowMs = Date.now();
  if (nowMs - lastPopSoundTimeMs < 45) return;
  lastPopSoundTimeMs = nowMs;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Primary bubble pop (fast upward pitch sweep)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(250, now);
    osc1.frequency.exponentialRampToValueAtTime(690, now + 0.058);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.16, now + 0.012);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Subtle second harmonic overtone for crisp pop sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(520, now + 0.015);
    osc2.frequency.exponentialRampToValueAtTime(980, now + 0.065);

    gain2.gain.setValueAtTime(0.06, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.015);
    osc2.stop(now + 0.08);
  } catch {
    // Ignore autoplay errors
  }
}

/**
 * Plays a thematic sound effect matching Maestro Roshi's current animation,
 * combined with the standard message pop sound.
 */
export function playRoshiAnimationSound(
  animationId: RoshiAnimationId,
  enabled?: boolean
): void {
  if (!isGlobalSoundEnabled(enabled)) return;

  // Always play the standard message pop first
  playRoshiMessagePopSound(enabled);

  if (animationId === 'HABLANDO') {
    return;
  }

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const start = ctx.currentTime + 0.055;

    switch (animationId) {
      case 'KAMEHAMEHA_DESTELLO':
      case 'KAMEHAMEHA_ORBE':
      case 'KAMEHAMEHA_RAYO_AZUL':
      case 'KAMEHAMEHA_MAXIMO_PODER':
      case 'TRANSFORMACION_MAXIMO_PODER':
      case 'TRANSFORMACION_PIXEL_KI':
      case 'TRANSFORMACION_AURA_SUPREMA': {
        // Energy charge sweep + bright beam release
        const chargeOsc = ctx.createOscillator();
        const chargeGain = ctx.createGain();
        chargeOsc.type = 'sawtooth';
        chargeOsc.frequency.setValueAtTime(220, start);
        chargeOsc.frequency.exponentialRampToValueAtTime(880, start + 0.22);
        chargeGain.gain.setValueAtTime(0.05, start);
        chargeGain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
        chargeOsc.connect(chargeGain);
        chargeGain.connect(ctx.destination);
        chargeOsc.start(start);
        chargeOsc.stop(start + 0.26);
        break;
      }
      case 'ESTILO_CALLEJERO_CHOLO':
      case 'POSE_BANDANA_ROJA':
      case 'POSE_MAESTRO_SERIO': {
        // Deep heroic power chord
        const freqs = [196.0, 293.66, 392.0];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, start + i * 0.03);
          gain.gain.setValueAtTime(0.08, start + i * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, start + i * 0.03 + 0.26);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start + i * 0.03);
          osc.stop(start + i * 0.03 + 0.28);
        });
        break;
      }
      case 'PELEA_GRULLA':
      case 'POSE_TORBELLINO_JACKIE':
      case 'POSE_MARCIAL_OSCURA':
      case 'POSE_COMBATE_NARANJA':
      case 'POSE_KUNG_FU_CLASICO': {
        // Double martial arts whoosh
        [0, 0.09].forEach((offset, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(idx === 0 ? 640 : 780, start + offset);
          osc.frequency.exponentialRampToValueAtTime(170, start + offset + 0.075);
          gain.gain.setValueAtTime(0.09, start + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, start + offset + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start + offset);
          osc.stop(start + offset + 0.085);
        });
        break;
      }
      case 'GRITO_EMOCION':
      case 'EMOCION_BASTON':
      case 'SALTO_BASTON_ALEGRIA':
      case 'GRITO_BASTON_VICTORIA': {
        // Joyful ascending dojo fanfare
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, start + i * 0.045);
          gain.gain.setValueAtTime(0.08, start + i * 0.045);
          gain.gain.exponentialRampToValueAtTime(0.001, start + i * 0.045 + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start + i * 0.045);
          osc.stop(start + i * 0.045 + 0.15);
        });
        break;
      }
      case 'AMOR_Y_PAZ': {
        // Sunny Kame House chime
        const notes = [587.33, 739.99, 880.0];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, start + i * 0.055);
          gain.gain.setValueAtTime(0.08, start + i * 0.055);
          gain.gain.exponentialRampToValueAtTime(0.001, start + i * 0.055 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start + i * 0.055);
          osc.stop(start + i * 0.055 + 0.19);
        });
        break;
      }
      case 'FUMANDO': {
        // Mellow contemplative low chord
        const notes = [329.63, 392.0];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, start + i * 0.06);
          gain.gain.setValueAtTime(0.07, start + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, start + i * 0.06 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start + i * 0.06);
          osc.stop(start + i * 0.06 + 0.24);
        });
        break;
      }
      case 'PICARO':
      case 'PICARO_REVISTA_SORPRESA': {
        // Playful comic spring slide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(310, start);
        osc.frequency.linearRampToValueAtTime(640, start + 0.07);
        osc.frequency.linearRampToValueAtTime(420, start + 0.13);
        osc.frequency.linearRampToValueAtTime(760, start + 0.19);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.21);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.22);
        break;
      }
      case 'NEGATIVO_SUSPIRO_PIXEL':
      case 'NEGATIVO_FACEPALM':
      case 'NEGATIVO_DESCONSUELO': {
        // Gentle descending two-note sigh ("waa-waa")
        const notes = [349.23, 277.18];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, start + i * 0.085);
          osc.frequency.exponentialRampToValueAtTime(f * 0.86, start + i * 0.085 + 0.08);
          gain.gain.setValueAtTime(0.08, start + i * 0.085);
          gain.gain.exponentialRampToValueAtTime(0.001, start + i * 0.085 + 0.09);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start + i * 0.085);
          osc.stop(start + i * 0.085 + 0.095);
        });
        break;
      }
      case 'NEGATIVO_BASTON_REGANO':
      case 'NEGATIVO_TRAJE_NEGRO':
      case 'NEGATIVO_MUSCULOSO_FURIA': {
        // Energetic dojo reprimand double thud
        [0, 0.08].forEach((offset, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(idx === 0 ? 240 : 185, start + offset);
          osc.frequency.exponentialRampToValueAtTime(110, start + offset + 0.07);
          gain.gain.setValueAtTime(0.065, start + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, start + offset + 0.075);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start + offset);
          osc.stop(start + offset + 0.08);
        });
        break;
      }
    }
  } catch {
    // Ignore autoplay errors
  }
}

/**
 * Returns a pitch offset (in Hz) according to Maestro Roshi's current animation mood and card tone.
 */
export function getRoshiMoodPitchOffset(
  animationId: RoshiAnimationId = 'HABLANDO',
  tone: 'DEFAULT' | 'SUCCESS' | 'WARNING' | 'SURPRISE' = 'DEFAULT'
): number {
  let offset = 0;
  switch (animationId) {
    case 'ESTILO_CALLEJERO_CHOLO':
    case 'POSE_MAESTRO_SERIO':
    case 'NEGATIVO_MUSCULOSO_FURIA':
      offset = -30;
      break;
    case 'FUMANDO':
    case 'NEGATIVO_FACEPALM':
    case 'NEGATIVO_SUSPIRO_PIXEL':
      offset = -20;
      break;
    case 'NEGATIVO_BASTON_REGANO':
    case 'NEGATIVO_TRAJE_NEGRO':
    case 'NEGATIVO_DESCONSUELO':
      offset = -15;
      break;
    case 'GRITO_EMOCION':
    case 'EMOCION_BASTON':
    case 'SALTO_BASTON_ALEGRIA':
    case 'GRITO_BASTON_VICTORIA':
      offset = 30;
      break;
    case 'KAMEHAMEHA_DESTELLO':
    case 'KAMEHAMEHA_ORBE':
    case 'KAMEHAMEHA_RAYO_AZUL':
    case 'KAMEHAMEHA_MAXIMO_PODER':
    case 'TRANSFORMACION_MAXIMO_PODER':
    case 'TRANSFORMACION_PIXEL_KI':
    case 'TRANSFORMACION_AURA_SUPREMA':
      offset = 22;
      break;
    case 'PICARO':
    case 'PICARO_REVISTA_SORPRESA':
      offset = 25;
      break;
    case 'AMOR_Y_PAZ':
    case 'POSE_BANDANA_ROJA':
      offset = 15;
      break;
    case 'PELEA_GRULLA':
    case 'POSE_TORBELLINO_JACKIE':
    case 'POSE_MARCIAL_OSCURA':
    case 'POSE_COMBATE_NARANJA':
    case 'POSE_KUNG_FU_CLASICO':
      offset = 10;
      break;
    case 'HABLANDO':
    default:
      offset = 0;
      break;
  }

  if (tone === 'SUCCESS') offset += 12;
  else if (tone === 'WARNING') offset -= 12;

  return offset;
}

/**
 * Retro RPG-style typewriter / spoken voice blip (Web Audio API OscillatorNode + GainNode).
 * - Wave: triangle ('triangle')
 * - Frequency: 210 Hz base + random variation (±17 Hz) + pitchOffset, dropping 15% (freq * 0.85) in 0.028s
 * - Gain & Duration: 0.045 gain fading out in 0.032s (35ms total duration per pulse)
 */
export function playVoiceBlip(pitchOffset: number = 0, enabled?: boolean): void {
  if (!isGlobalSoundEnabled(enabled)) return;

  const nowMs = Date.now();
  if (nowMs - lastTypeTickTimeMs < 28) return;
  lastTypeTickTimeMs = nowMs;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const freq = 210 + pitchOffset + (Math.random() - 0.5) * 34;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.028);

    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch {
    // Ignore autoplay errors
  }
}

/**
 * Backwards-compatible wrapper that triggers playVoiceBlip for non-whitespace characters.
 */
export function playRoshiTypingTickSound(
  char: string = 'a',
  pitchOffset: number = 0,
  enabled?: boolean
): void {
  if (!isGlobalSoundEnabled(enabled)) return;
  const trimmed = char.trim();
  if (!trimmed) return;
  playVoiceBlip(pitchOffset, enabled);
}

export const soundFX = {
  playVoiceBlip,
  playPop: playRoshiMessagePopSound,
  playAnimation: playRoshiAnimationSound,
};


