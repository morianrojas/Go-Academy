export type RoshiAnimationCategory = 'CONVERSATION' | 'SURPRISE' | 'MISTAKE';

export type RoshiAnimationId =
  | 'HABLANDO'
  | 'AMOR_Y_PAZ'
  | 'EMOCION_BASTON'
  | 'GRITO_EMOCION'
  | 'PELEA_GRULLA'
  | 'FUMANDO'
  | 'PICARO'
  | 'KAMEHAMEHA_DESTELLO'
  | 'KAMEHAMEHA_ORBE'
  | 'KAMEHAMEHA_RAYO_AZUL'
  | 'KAMEHAMEHA_MAXIMO_PODER'
  | 'POSE_TORBELLINO_JACKIE'
  | 'SALTO_BASTON_ALEGRIA'
  | 'GRITO_BASTON_VICTORIA'
  | 'ESTILO_CALLEJERO_CHOLO'
  | 'PICARO_REVISTA_SORPRESA'
  | 'POSE_MARCIAL_OSCURA'
  | 'POSE_BANDANA_ROJA'
  | 'POSE_MAESTRO_SERIO'
  | 'POSE_COMBATE_NARANJA'
  | 'POSE_KUNG_FU_CLASICO'
  | 'TRANSFORMACION_MAXIMO_PODER'
  | 'TRANSFORMACION_PIXEL_KI'
  | 'TRANSFORMACION_AURA_SUPREMA'
  | 'NEGATIVO_SUSPIRO_PIXEL'
  | 'NEGATIVO_FACEPALM'
  | 'NEGATIVO_BASTON_REGANO'
  | 'NEGATIVO_TRAJE_NEGRO'
  | 'NEGATIVO_DESCONSUELO'
  | 'NEGATIVO_MUSCULOSO_FURIA';

export interface RoshiSpriteSpec {
  id: RoshiAnimationId;
  name: string;
  badgeLabel: string;
  src: string;
  /** Optional animated GIF URL rendered inside the Maestro Roshi frame (used exclusively for perverted animations) */
  gifUrl?: string;
  cols: number;
  rows: number;
  totalFrames: number;
  fps: number;
  category: RoshiAnimationCategory;
  isConversational: boolean;
  isSurprise: boolean;
  isMistake: boolean;
  hasPanelBorder: boolean;
  cellInsetPx?: number;
  /** When true (e.g. 1200x240 5x1 transparent sheet), each cell is sliced 1:1 without bounding-box re-centering */
  preAlignedCells?: boolean;
  cropBottomRatio: number;
  /** Fun flavor reaction line or subtitle shown subtly when a surprise or mistake animation triggers */
  flavorNote: string;
}

/**
 * Raw list of GIF links provided for Maestro Roshi's perverted animations (`PICARO` and `PICARO_REVISTA_SORPRESA`).
 */
export const PERVERTED_ROSHI_RAW_GIF_LINKS: readonly string[] = [
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGtxdnY3ZjBjMzlhcnc5YzJweW1wYXl1dnd0d2Y3MXRwY3U3ejdkcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/go3OUPg8pYvCw/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXFnYzlncnVqb3R4ZWkzZzFkeTJpcDNiNm82ZmtoMHdwbWdvYTA3cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sImBafA1QW78A/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjl0aXNwaWh2YmsxZXgzcXUwMDhlZDN1YmFia2F5cHU2b2I5ZmdsMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AKEbkxfHZIzBLEyjEb/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnJrNnRxYzcweGJoOGgyZmVlZTFwbTMxZXhqMXk4cDltcGM5eWRxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fIQkFFMOKhi8M/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG05OGk1eWxnNzJvZ3Z3ZmV3dDA1YWhrOHd5bnlqd214bzYyem9rYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nOBv4FaG7o1Hy/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW1lOHlkbDJ6cGw4dnN6aTVjZTFqdGJvZjVyeTZqMnd5MGl5NjFtaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GH7rdGafqyeQ0/giphy.gif',
];

/**
 * Playable HTTPS GIF URLs for Maestro Roshi's perverted animations (shuffled in each cycle).
 */
export const PERVERTED_ROSHI_GIF_URLS: readonly string[] = PERVERTED_ROSHI_RAW_GIF_LINKS.filter(
  (url) => url.startsWith('http://') || url.startsWith('https://')
);

/**
 * Raw list of GIF links provided for full-screen celebrations (completing a class, winning a practice game, or solving a puzzle milestone).
 */
export const CELEBRATION_RAW_GIF_LINKS: readonly string[] = [
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmpodDg0aDU1M21pcjY0dXgwM25rOG0wYjVpbTJ6YzA4YnZzMHpzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Iu5oAV0cVffQk/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm11cHdzdXJzaTE5ZnQzYmI0cGo0eG1zZTV6NDVuY3J6enVxcmJ3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JILOx1KJggOGI/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjVsdnY4eDBnM3dmOWJuOXZrMDMydXI4eW8yOXM5MjV6NjA5cmtheiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bd8dz91fyFtHCgW7Fk/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2RvcGJlM3FsaTFuNDhienhoMjJwMnd6NW05eXltb2ZqcG9sMTV6dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YSvMlTLNVrJ6/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDF0ZXZwYWUzdm92OWx0YTVnMmZ5a3VmYzUwcXlxdmgwbnJ0ZjI1dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1BLJ9tc8vy22s/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXNsOTV5cWtqc2dxcWVydzQ2N21ua3EwbWVqenZ6amNldjM4emQyMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qJVCvxP2kC3EQ/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWY5cnVrNnE5Z3N6djViaHlnZDhtbHc2djFiNWs5ZnA2OG5zcHBsaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2ysVnKmFzhsXr3VZBd/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExem01MDRzNDE0c3QxaWtlMnY0cXQ4dmEwdHBlYWJxNTF1M3JjYTUzciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uhL3OYavEMDQI/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Q4Y29rcm9kZzc4ZDE3bHRtNmZxdjBseHNpM2x4ank3dzBqcHByZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ICjp3vhRg4McDRBkzB/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnF2eHd3dnRidmhuN2lqaWVyamQ0ejBoNDB5aWIxdHkxbmwzczE0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/etruPt9Iby64I1sjHo/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzU1M21maXNiMnJscHM1Yzk3ajVmdTRqN3BwMDMwbDlvYTVueWllOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/D0vrVbItSNFAlcTBgN/giphy.gif',
];

/**
 * Playable HTTPS GIF URLs for full-screen celebrations (shuffled in each cycle and reshuffled when the cycle completes).
 */
export const CELEBRATION_GIF_URLS: readonly string[] = CELEBRATION_RAW_GIF_LINKS.filter(
  (url) => url.startsWith('http://') || url.startsWith('https://')
);

/**
 * Special reward video 1 ("roshi especial.webm"):
 * Played ONLY when completing an Academy Level (Básico, Intermedio, Avanzado) OR winning a Practice game.
 */
export const ROSHI_ESPECIAL_1_VIDEO_URL = '/assets/aistudio/roshi_especial_8163dd40.webm';

/**
 * Special reward video 2 ("roshi especial 2.mp4"):
 * Played when winning a Practice game, finishing all reviews in the HOY section, or fulfilling the Daily Mission.
 */
export const ROSHI_ESPECIAL_2_VIDEO_URL = '/assets/aistudio/roshi_especial_2_1e72f9a6.mp4';

/**
 * Sequential special reward videos for Nivel Avanzado in the Academy (starting at Clase 31 -> musica 1, Clase 32 -> musica 2, etc.)
 * and also included in the Practice win shuffle pool.
 */
export const ROSHI_MUSICA_1_VIDEO_URL = '/assets/aistudio/musica_1_457e4489.mp4';
export const ROSHI_MUSICA_2_VIDEO_URL = '/assets/aistudio/musica_2_8699520d.mp4';
export const ROSHI_MUSICA_3_VIDEO_URL = '/assets/aistudio/musica_3_5b87dda8.mp4';
export const ROSHI_MUSICA_4_VIDEO_URL = '/assets/aistudio/musica_4_e2c8550a.mp4';
export const ROSHI_MUSICA_5_VIDEO_URL = '/assets/aistudio/musica_5_43c3d3cd.mp4';
export const ROSHI_MUSICA_6_VIDEO_URL = '/assets/aistudio/musica_6_f2e1a78c.mp4';
export const ROSHI_MUSICA_7_VIDEO_URL = '/assets/aistudio/musica_7_4e243810.mp4';
export const ROSHI_MUSICA_8_VIDEO_URL = '/assets/aistudio/musica_8_c36c5f38.mp4';
export const ROSHI_MUSICA_9_VIDEO_URL = '/assets/aistudio/musica_9_ac96b8a5.mp4';
export const ROSHI_MUSICA_10_VIDEO_URL = '/assets/aistudio/musica_10_0f760fce.mp4';
export const ROSHI_MUSICA_11_PART_1_VIDEO_URL = '/assets/aistudio/musica_11_parte_1_61cf36f9.mp4';
export const ROSHI_MUSICA_11_PART_2_VIDEO_URL = '/assets/aistudio/musica_11_parte_2_cbe972a1.mp4';
export const ROSHI_MUSICA_11_VIDEO_PARTS: readonly string[] = [
  ROSHI_MUSICA_11_PART_1_VIDEO_URL,
  ROSHI_MUSICA_11_PART_2_VIDEO_URL,
];
/**
 * Identifier URL for the combined 2-part Musica 11 reward (Clase 41 & Practice win shuffle).
 * Automatically resolved into its 2 sequential video parts by `resolveSpecialVideoSequence`.
 */
export const ROSHI_MUSICA_11_VIDEO_URL = ROSHI_MUSICA_11_PART_1_VIDEO_URL;
export const ROSHI_MUSICA_12_VIDEO_URL = '/assets/aistudio/musica_12_382a1d72.mp4';
export const ROSHI_MUSICA_13_VIDEO_URL = '/assets/aistudio/musica_13_1568e760.mp4';
export const ROSHI_MUSICA_14_VIDEO_URL = '/assets/aistudio/musica_14_ac365cdd.mp4';

/**
 * Special reward video ("goku no me pegues.mp4") included in the Practice Win shuffle pool
 * with its own exclusive, permanently paired dialogue (`ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE`).
 */
export const ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL =
  '/assets/aistudio/goku_no_me_pegues_c39ac253.mp4';
export const ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE =
  'Los saiyajins conquistan planetas; pero sus esposas conquistan su volunt... espera! que?';

/**
 * Multi-part final Graduation special reward videos (Clase 45 / Fin del Nivel Avanzado y de la Academia).
 */
export const ROSHI_GRADUACION_PART_1_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_1_b703eafe.mp4';
export const ROSHI_GRADUACION_PART_2_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_2_44de46af.mp4';
export const ROSHI_GRADUACION_PART_3_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_3_96163d1f.mp4';
export const ROSHI_GRADUACION_PART_4_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_4_21b4d90c.mp4';
export const ROSHI_GRADUACION_PART_5_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_5_064e1506.mp4';
export const ROSHI_GRADUACION_PART_6_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_6_5f10dc5b.mp4';
export const ROSHI_GRADUACION_PART_7_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_7_383df78b.mp4';
export const ROSHI_GRADUACION_PART_8_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_8_783f7c1c.mp4';
export const ROSHI_GRADUACION_PART_9_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_9_617931bd.mp4';
export const ROSHI_GRADUACION_PART_10_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_10_b1e96e8d.mp4';
export const ROSHI_GRADUACION_PART_11_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_11_119ec8a3.mp4';
export const ROSHI_GRADUACION_PART_12_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_12_77f12f23.mp4';
export const ROSHI_GRADUACION_PART_13_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_13_d71f4197.mp4';
export const ROSHI_GRADUACION_PART_14_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_14_23559dbc.mp4';
export const ROSHI_GRADUACION_PART_15_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_15_93ba3104.mp4';
export const ROSHI_GRADUACION_PART_16_VIDEO_URL =
  '/assets/aistudio/graduacion_parte_16_52c0d894.mp4';

export const ROSHI_GRADUACION_VIDEO_PARTS: readonly string[] = [
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
];

/**
 * Identifier URL for the combined multi-part Graduation reward (Clase 45 / Graduación de la Academia).
 * Automatically resolved into its ordered sequence of parts by `resolveSpecialVideoSequence`.
 * Exclusive to Graduation (never included in PRACTICE_WIN_SPECIAL_VIDEOS).
 */
export const ROSHI_GRADUACION_VIDEO_URL = ROSHI_GRADUACION_PART_1_VIDEO_URL;
export const GRADUATION_COMPLETE_SPECIAL_VIDEO_URL = ROSHI_GRADUACION_VIDEO_URL;

export const ROSHI_GRADUACION_TITLE = 'Graduacion de la Escuela Tortuga';
export const ROSHI_GRADUACION_DIALOGUE =
  'Llegaste a Kame House dando tus primeros pasos como aquel pequeño Goku, y hoy concluyes tu estudio dominando cada secreto del tablero hasta alcanzar el nivel de los saiyajins. Ya no tienes nada más que aprender de este viejo maestro: sal al vasto universo, enfrenta a los guerreros más fuertes y nunca dejes de superar tus propios límites.';

export const MULTI_PART_SPECIAL_VIDEOS: Readonly<Record<string, readonly string[]>> = {
  [ROSHI_MUSICA_11_VIDEO_URL]: ROSHI_MUSICA_11_VIDEO_PARTS,
  [ROSHI_GRADUACION_VIDEO_URL]: ROSHI_GRADUACION_VIDEO_PARTS,
};

/**
 * Resolves a single video reward identifier or explicit array into the ordered sequence of video files
 * to play back-to-back as a single continuous reward.
 */
export function resolveSpecialVideoSequence(
  videoUrl?: string,
  videoUrls?: readonly string[]
): readonly string[] {
  if (videoUrls && videoUrls.length > 0) {
    return videoUrls;
  }
  if (!videoUrl) {
    return [];
  }
  if (MULTI_PART_SPECIAL_VIDEOS[videoUrl]) {
    return MULTI_PART_SPECIAL_VIDEOS[videoUrl];
  }
  if (videoUrl.includes('|')) {
    return videoUrl
      .split('|')
      .map((u) => u.trim())
      .filter(Boolean);
  }
  return [videoUrl];
}

export const ADVANCED_LESSON_SPECIAL_VIDEOS: readonly string[] = [
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
  ROSHI_MUSICA_11_VIDEO_URL,
  ROSHI_MUSICA_12_VIDEO_URL,
  ROSHI_MUSICA_13_VIDEO_URL,
  ROSHI_MUSICA_14_VIDEO_URL,
  ROSHI_GRADUACION_VIDEO_URL,
];

/**
 * Returns the sequential special video reward for an Advanced class in the Academy:
 * - Clase 31 -> musica 1.mp4
 * - Clase 32 -> musica 2.mp4
 * - Clase 33 -> musica 3.mp4
 * - Clase 34 -> musica 4.mp4
 * - Clase 35 -> musica 5.mp4
 * - Clase 36 -> musica 6.mp4
 * - Clase 37 -> musica 7.mp4
 * - Clase 38 -> musica 8.mp4
 * - Clase 39 -> musica 9.mp4
 * - Clase 40 -> musica 10.mp4
 * - Clase 41 -> musica 11 (parte 1 + parte 2 continuos)
 * - Clase 42 -> musica 12.mp4
 * - Clase 43 -> musica 13.mp4
 * - Clase 44 -> musica 14.mp4
 * - Clase 45 -> graduacion (por partes continuas)
 */
export function getAdvancedLessonSpecialVideoUrl(globalLessonNumber: number): string {
  const offset = Math.max(0, globalLessonNumber - 31);
  return (
    ADVANCED_LESSON_SPECIAL_VIDEOS[offset % ADVANCED_LESSON_SPECIAL_VIDEOS.length] ??
    ROSHI_MUSICA_1_VIDEO_URL
  );
}

/**
 * Special reward videos that participate in shuffle mode when the player wins a game in the PRACTICA section.
 */
export const PRACTICE_WIN_SPECIAL_VIDEOS: readonly string[] = [
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
  ROSHI_MUSICA_11_VIDEO_URL,
  ROSHI_MUSICA_12_VIDEO_URL,
  ROSHI_MUSICA_13_VIDEO_URL,
  ROSHI_MUSICA_14_VIDEO_URL,
  ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL,
];

/**
 * First reward video of every day when winning a game in Practice mode ("roshi especial.webm").
 * Always opens the daily Practice Win reward list with its permanently assigned dialogue (`ROSHI_LEVEL_COMPLETE_DIALOGUE`).
 */
export const PRACTICE_WIN_FIRST_DAILY_VIDEO_URL = ROSHI_ESPECIAL_1_VIDEO_URL;

/**
 * Remaining 15 Practice Win reward videos that are shuffled after `ROSHI_ESPECIAL_1_VIDEO_URL` without repeating during the day,
 * and reshuffled into a fresh order on the next calendar day.
 */
export const PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS: readonly string[] =
  PRACTICE_WIN_SPECIAL_VIDEOS.filter((url) => url !== PRACTICE_WIN_FIRST_DAILY_VIDEO_URL);

/**
 * Exclusive video URL reproduced when the student completes Nivel Básico (Clases 1–15).
 */
export const LEVEL_COMPLETE_SPECIAL_VIDEO_URL = ROSHI_ESPECIAL_1_VIDEO_URL;

/**
 * Exclusive video URL reproduced when the student completes Nivel Intermedio (Clases 16–30) in the Academy ("final 1.mp4").
 */
export const INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL =
  '/assets/aistudio/final_1_2c5006f5.mp4';

/**
 * Special reward video reproduced whenever the student ascends to a new title/rank, starting from Aprendiz ("gohan grito.mp4").
 */
export const ROSHI_TITLE_PROMOTION_VIDEO_URL =
  '/assets/aistudio/gohan_grito_2f2eb500.mp4';

export function getTitlePromotionSpecialReward(
  newTitle: string,
  rankLabel?: string
): {
  videoUrl: string;
  congratsTitle: string;
  accomplishmentText: string;
  specialLevelDialogue: string;
} {
  const rankSuffix = rankLabel ? ` (${rankLabel})` : '';
  const heading = `¡Nuevo título obtenido: ${newTitle}!`;
  return {
    videoUrl: ROSHI_TITLE_PROMOTION_VIDEO_URL,
    congratsTitle: heading,
    accomplishmentText: heading,
    specialLevelDialogue: `¡Tu poder en el tablero ha roto sus límites! Has ascendido al título de ${newTitle}${rankSuffix} en la Academia del Maestro Roshi.`,
  };
}

/**
 * Special reward video reproduced every time the student commits two consecutive mistakes,
 * or loses a game in the Practice section (with title ROSHI_PRACTICE_LOSS_TITLE).
 */
export const ROSHI_TWO_MISTAKES_VIDEO_URL = '/assets/aistudio/estupido_de0d2571.mp4';
export const ROSHI_TWO_MISTAKES_TITLE = 'Jugada incorrecta';
export const ROSHI_PRACTICE_LOSS_TITLE = 'Guerrero de Clase Baja';
export const ROSHI_TWO_MISTAKES_DIALOGUE =
  'Eres una verguenza para los saiyajins! un insecto como tu no merece pertenecer a esta academia';

/**
 * Special reward video reproduced when the student uses the "Borrar progreso local" option.
 */
export const ROSHI_RESET_PROGRESS_VIDEO_URL = '/assets/aistudio/rendirse_9bf215da.mp4';
export const ROSHI_RESET_PROGRESS_TITLE = 'Intento de borrado';
export const ROSHI_RESET_PROGRESS_DIALOGUE =
  'Asi que decidiste tomar el camino facil, ante la adversidad decidiste permanecer como un guerrero de clase baja';

/**
 * Number of solved puzzles required in a session to trigger the full-screen Celebration GIF overlay.
 */
export const PUZZLE_CELEBRATION_MILESTONE_COUNT = 4;

export const ROSHI_SPRITE_CATALOG: Record<RoshiAnimationId, RoshiSpriteSpec> = {
  HABLANDO: {
    id: 'HABLANDO',
    name: 'Maestro Roshi · Enseñando',
    badgeLabel: 'Hablando',
    src: '/assets/aistudio/roshi_hablando_4cc2ca18.png',
    cols: 3,
    rows: 3,
    totalFrames: 9,
    fps: 6,
    category: 'CONVERSATION',
    isConversational: true,
    isSurprise: false,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: 'Explicando paso a paso con calma de maestro',
  },
  AMOR_Y_PAZ: {
    id: 'AMOR_Y_PAZ',
    name: 'Maestro Roshi · Amor y Paz en Umigame',
    badgeLabel: '¡Pose Sorpresa!',
    src: '/assets/aistudio/roshi_amor_y_paz_515df3d5.png',
    cols: 4,
    rows: 2,
    totalFrames: 8,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Paz, buena vibra y lectura serena sobre la tortuga marina!',
  },
  EMOCION_BASTON: {
    id: 'EMOCION_BASTON',
    name: 'Maestro Roshi · ¡Euforia del Dojo!',
    badgeLabel: '¡Pose Sorpresa!',
    src: '/assets/aistudio/roshi_emocion_2.1_9fa2daf3.png',
    cols: 4,
    rows: 2,
    totalFrames: 8,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Levantando el bastón con orgullo por tu progreso!',
  },
  GRITO_EMOCION: {
    id: 'GRITO_EMOCION',
    name: 'Maestro Roshi · ¡Grito de Ánimo!',
    badgeLabel: '¡Pose Sorpresa!',
    src: '/assets/aistudio/roshi_grito_emocion_c0335f6c.png',
    cols: 5,
    rows: 2,
    totalFrames: 10,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cropBottomRatio: 0.885,
    flavorNote: '¡Animándote desde la esquina del tatami!',
  },
  PELEA_GRULLA: {
    id: 'PELEA_GRULLA',
    name: 'Maestro Roshi · Danza Marcial Tortuga',
    badgeLabel: '¡Pose Sorpresa!',
    src: '/assets/aistudio/roshi_pelea_d6fd3968.png',
    cols: 5,
    rows: 2,
    totalFrames: 10,
    fps: 8,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cropBottomRatio: 0.885,
    flavorNote: '¡Equilibrio y juego de pies digno de Jackie Chun!',
  },
  FUMANDO: {
    id: 'FUMANDO',
    name: 'Maestro Roshi · Reflexión Profunda',
    badgeLabel: '¡Pose Sorpresa!',
    src: '/assets/aistudio/roshi_fumando_2.0_950325ea.png',
    cols: 4,
    rows: 2,
    totalFrames: 8,
    fps: 5,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: 'Observando el Goban en silencio antes del golpe decisivo...',
  },
  PICARO: {
    id: 'PICARO',
    name: 'Maestro Roshi · Humor Clásico',
    badgeLabel: '¡Gag Clásico!',
    src: '/assets/aistudio/roshi_pervertido_15672ff9.jfif',
    gifUrl: PERVERTED_ROSHI_GIF_URLS[0],
    cols: 3,
    rows: 3,
    totalFrames: 9,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: true,
    cropBottomRatio: 1,
    flavorNote: '¡Traigan a una chica bonita y les enseñaré el secreto de la juventud eterna!',
  },
  KAMEHAMEHA_DESTELLO: {
    id: 'KAMEHAMEHA_DESTELLO',
    name: 'Maestro Roshi · ¡Destello Kamehameha!',
    badgeLabel: '¡Máximo Poder!',
    src: '/assets/aistudio/kameha_2_b750a33b.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Tu lectura táctica brilla con toda la potencia del Kamehameha!',
  },
  KAMEHAMEHA_ORBE: {
    id: 'KAMEHAMEHA_ORBE',
    name: 'Maestro Roshi · ¡Esfera de Ki Supremo!',
    badgeLabel: '¡Energía Total!',
    src: '/assets/aistudio/kameha_3_ed3b191d.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Concentrando un poder descomunal en una sola jugada maestra!',
  },
  KAMEHAMEHA_RAYO_AZUL: {
    id: 'KAMEHAMEHA_RAYO_AZUL',
    name: 'Maestro Roshi · ¡Onda Vital Kamehameha!',
    badgeLabel: '¡Kamehameha!',
    src: '/assets/aistudio/Roshi_kameha_3.5_ba5ad23f.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Desatando la onda vital de la Escuela Tortuga con precisión absoluta!',
  },
  KAMEHAMEHA_MAXIMO_PODER: {
    id: 'KAMEHAMEHA_MAXIMO_PODER',
    name: 'Maestro Roshi · ¡Kamehameha a Máxima Potencia!',
    badgeLabel: '¡Poder Supremo!',
    src: '/assets/aistudio/roshi_kameha_4.1_00bcc6f6.png',
    cols: 4,
    rows: 2,
    totalFrames: 8,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Kamehameha a máxima potencia tras dominar la lectura del tablero!',
  },
  POSE_TORBELLINO_JACKIE: {
    id: 'POSE_TORBELLINO_JACKIE',
    name: 'Maestro Roshi · Torbellino Marcial',
    badgeLabel: '¡Técnica Secreta!',
    src: '/assets/aistudio/roshi_pose_1_9c6176eb.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Giro de viento, esfera de Ki y sonrisa de campeón del Budokai!',
  },
  SALTO_BASTON_ALEGRIA: {
    id: 'SALTO_BASTON_ALEGRIA',
    name: 'Maestro Roshi · ¡Salto de Victoria!',
    badgeLabel: '¡Salto Épico!',
    src: '/assets/aistudio/Roshi_salto_3.0_017eb35d.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Saltando de alegría con el bastón por esa jugada brillante!',
  },
  GRITO_BASTON_VICTORIA: {
    id: 'GRITO_BASTON_VICTORIA',
    name: 'Maestro Roshi · ¡Rugido de la Escuela Tortuga!',
    badgeLabel: '¡Celebración!',
    src: '/assets/aistudio/baston_0d986c95.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Eufórico por tu dominio táctico en el tablero!',
  },
  ESTILO_CALLEJERO_CHOLO: {
    id: 'ESTILO_CALLEJERO_CHOLO',
    name: 'Maestro Roshi · ¡Actitud Legendaria!',
    badgeLabel: '¡Puro Estilo!',
    src: '/assets/aistudio/cholo_e909b8e0.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Respeto total en el barrio del Dojo por esa lectura impecable!',
  },
  PICARO_REVISTA_SORPRESA: {
    id: 'PICARO_REVISTA_SORPRESA',
    name: 'Maestro Roshi · ¡Emoción Inesperada!',
    badgeLabel: '¡Gag Clásico!',
    src: '/assets/aistudio/Roshi_pervertido_1_e76e28a8.png',
    gifUrl: PERVERTED_ROSHI_GIF_URLS[1] ?? PERVERTED_ROSHI_GIF_URLS[0],
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote:
      'No estoy mirando revistas indecentes... ¡estoy haciendo investigación científica sobre el cuerpo humano!',
  },
  POSE_MARCIAL_OSCURA: {
    id: 'POSE_MARCIAL_OSCURA',
    name: 'Maestro Roshi · ¡Guardia Marcial Suprema!',
    badgeLabel: '¡Pose Marcial!',
    src: '/assets/aistudio/roshi_pose_2_450ac339.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Firmeza total en el tatami! Tu técnica impone respeto en cada rincón del tablero.',
  },
  POSE_BANDANA_ROJA: {
    id: 'POSE_BANDANA_ROJA',
    name: 'Maestro Roshi · ¡Estilo Kame House!',
    badgeLabel: '¡Actitud Kame!',
    src: '/assets/aistudio/roshi_pose_3_6dad5b8c.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Con calma isleña y vista afilada se dominan hasta las partidas más complejas!',
  },
  POSE_MAESTRO_SERIO: {
    id: 'POSE_MAESTRO_SERIO',
    name: 'Maestro Roshi · ¡Mirada del Gran Maestro!',
    badgeLabel: '¡Sabiduría Pura!',
    src: '/assets/aistudio/roshi_pose_4_87a6e213.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: 'Cuando el maestro se quita las gafas, cada piedra cuenta una verdad profunda.',
  },
  POSE_COMBATE_NARANJA: {
    id: 'POSE_COMBATE_NARANJA',
    name: 'Maestro Roshi · ¡Espíritu de Combate Tortuga!',
    badgeLabel: '¡Guardia Lista!',
    src: '/assets/aistudio/roshi_pose_5_1da0dfd7.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Músculos templados y mente serena! Así se defiende cada territorio.',
  },
  POSE_KUNG_FU_CLASICO: {
    id: 'POSE_KUNG_FU_CLASICO',
    name: 'Maestro Roshi · ¡Elegancia Marcial!',
    badgeLabel: '¡Arte Clásico!',
    src: '/assets/aistudio/roshi_pose_6_27e40fa5.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡La postura clásica nunca falla cuando tus piedras están bien conectadas!',
  },
  TRANSFORMACION_MAXIMO_PODER: {
    id: 'TRANSFORMACION_MAXIMO_PODER',
    name: 'Maestro Roshi · ¡100% Máximo Poder!',
    badgeLabel: '¡Transformación!',
    src: '/assets/aistudio/roshi_transformacion_1_c3d9b558.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Desatando el 100% del poder muscular de la Escuela Tortuga en esta jugada!',
  },
  TRANSFORMACION_PIXEL_KI: {
    id: 'TRANSFORMACION_PIXEL_KI',
    name: 'Maestro Roshi · ¡Explosión de Ki!',
    badgeLabel: '¡Carga de Poder!',
    src: '/assets/aistudio/roshi_transformacion_2_90a52853.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Tu energía táctica no deja de crecer jugada tras jugada!',
  },
  TRANSFORMACION_AURA_SUPREMA: {
    id: 'TRANSFORMACION_AURA_SUPREMA',
    name: 'Maestro Roshi · ¡Aura de Instinto Maestro!',
    badgeLabel: '¡Aura Suprema!',
    src: '/assets/aistudio/roshi_transformacion_3_5e66719c.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 7,
    category: 'SURPRISE',
    isConversational: false,
    isSurprise: true,
    isMistake: false,
    hasPanelBorder: false,
    cellInsetPx: 0,
    preAlignedCells: true,
    cropBottomRatio: 1,
    flavorNote: '¡Un aura resplandeciente envuelve el tablero cuando lees sin dudar!',
  },
  NEGATIVO_SUSPIRO_PIXEL: {
    id: 'NEGATIVO_SUSPIRO_PIXEL',
    name: 'Maestro Roshi · Suspiro de Paciencia',
    badgeLabel: '¡Error Táctico!',
    src: '/assets/aistudio/negativo_1_08d99bea.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 5,
    category: 'MISTAKE',
    isConversational: false,
    isSurprise: false,
    isMistake: true,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Ay, pequeño saltamontes! Observa bien las libertades antes de jugar...',
  },
  NEGATIVO_FACEPALM: {
    id: 'NEGATIVO_FACEPALM',
    name: 'Maestro Roshi · Lamento del Maestro',
    badgeLabel: '¡Cuidado!',
    src: '/assets/aistudio/negativo_2_37f656c5.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 5,
    category: 'MISTAKE',
    isConversational: false,
    isSurprise: false,
    isMistake: true,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: 'Respira hondo y vuelve a leer la posición con calma...',
  },
  NEGATIVO_BASTON_REGANO: {
    id: 'NEGATIVO_BASTON_REGANO',
    name: 'Maestro Roshi · ¡Atención al Tablero!',
    badgeLabel: '¡Error de Lectura!',
    src: '/assets/aistudio/negativo_4_33896b15.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'MISTAKE',
    isConversational: false,
    isSurprise: false,
    isMistake: true,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Esa jugada descuida tus piedras! Revisa tus conexiones.',
  },
  NEGATIVO_TRAJE_NEGRO: {
    id: 'NEGATIVO_TRAJE_NEGRO',
    name: 'Maestro Roshi · Tensión Marcial',
    badgeLabel: '¡Paso en Falso!',
    src: '/assets/aistudio/negativo_5_d09c71e5.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'MISTAKE',
    isConversational: false,
    isSurprise: false,
    isMistake: true,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Un maestro nunca regala una piedra sin leer la respuesta rival!',
  },
  NEGATIVO_DESCONSUELO: {
    id: 'NEGATIVO_DESCONSUELO',
    name: 'Maestro Roshi · ¡Así No Es!',
    badgeLabel: '¡Inténtalo de Nuevo!',
    src: '/assets/aistudio/negativo_6_28b99a1c.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'MISTAKE',
    isConversational: false,
    isSurprise: false,
    isMistake: true,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Alto ahí! Examina las consecuencias de esa jugada en el Goban.',
  },
  NEGATIVO_MUSCULOSO_FURIA: {
    id: 'NEGATIVO_MUSCULOSO_FURIA',
    name: 'Maestro Roshi · ¡Disciplina Máxima!',
    badgeLabel: '¡Alerta del Maestro!',
    src: '/assets/aistudio/negativo_7_7b85741e.png',
    cols: 5,
    rows: 1,
    totalFrames: 5,
    fps: 6,
    category: 'MISTAKE',
    isConversational: false,
    isSurprise: false,
    isMistake: true,
    hasPanelBorder: false,
    cellInsetPx: 14,
    cropBottomRatio: 1,
    flavorNote: '¡Concentra tu Ki! ¡Tienes la jugada correcta frente a tus ojos!',
  },
};

export const SURPRISE_ANIMATION_IDS: RoshiAnimationId[] = [
  'AMOR_Y_PAZ',
  'EMOCION_BASTON',
  'GRITO_EMOCION',
  'PELEA_GRULLA',
  'FUMANDO',
  'PICARO',
  'KAMEHAMEHA_DESTELLO',
  'KAMEHAMEHA_ORBE',
  'KAMEHAMEHA_RAYO_AZUL',
  'KAMEHAMEHA_MAXIMO_PODER',
  'POSE_TORBELLINO_JACKIE',
  'SALTO_BASTON_ALEGRIA',
  'GRITO_BASTON_VICTORIA',
  'ESTILO_CALLEJERO_CHOLO',
  'PICARO_REVISTA_SORPRESA',
  'POSE_MARCIAL_OSCURA',
  'POSE_BANDANA_ROJA',
  'POSE_MAESTRO_SERIO',
  'POSE_COMBATE_NARANJA',
  'POSE_KUNG_FU_CLASICO',
  'TRANSFORMACION_MAXIMO_PODER',
  'TRANSFORMACION_PIXEL_KI',
  'TRANSFORMACION_AURA_SUPREMA',
];

export const MISTAKE_ANIMATION_IDS: RoshiAnimationId[] = [
  'NEGATIVO_SUSPIRO_PIXEL',
  'NEGATIVO_FACEPALM',
  'NEGATIVO_BASTON_REGANO',
  'NEGATIVO_TRAJE_NEGRO',
  'NEGATIVO_DESCONSUELO',
  'NEGATIVO_MUSCULOSO_FURIA',
];

/**
 * The two perverted Maestro Roshi animations and their exclusive shuffled dialogues & GIFs.
 */
export const PERVERTED_ANIMATION_IDS: readonly RoshiAnimationId[] = [
  'PICARO',
  'PICARO_REVISTA_SORPRESA',
];

export const PERVERTED_ROSHI_DIALOGUES: readonly string[] = [
  '¡Traigan a una chica bonita y les enseñaré el secreto de la juventud eterna!',
  '¡Mi corazón late como el de un jovencito de 18 años!... lástima que mis rodillas tengan 300.',
  '¡Bulma, déjame tocarte un poquito a cambio de la Esfera del Dragón!',
  'No estoy mirando revistas indecentes... ¡estoy haciendo investigación científica sobre el cuerpo humano!',
  '¡Por favor, señorita! ¿No le gustaría darle un pequeño abrazo a este pobre y necesitado anciano?',
  'El secreto de una vida larga no son solo las artes marciales... ¡es mantener siempre la pupila alegre y el corazón joven!',
  '¡Un anciano sabio merece ciertos privilegios de la vida! ¡No me juzguen por apreciar el arte de la naturaleza!',
];

/**
 * Distribution of the 7 perverted dialogues across the 2 perverted animations.
 */
export const PERVERTED_DIALOGUES_BY_ANIMATION: Record<
  'PICARO' | 'PICARO_REVISTA_SORPRESA',
  readonly string[]
> = {
  PICARO: [
    PERVERTED_ROSHI_DIALOGUES[0],
    PERVERTED_ROSHI_DIALOGUES[1],
    PERVERTED_ROSHI_DIALOGUES[2],
    PERVERTED_ROSHI_DIALOGUES[5],
  ],
  PICARO_REVISTA_SORPRESA: [
    PERVERTED_ROSHI_DIALOGUES[3],
    PERVERTED_ROSHI_DIALOGUES[4],
    PERVERTED_ROSHI_DIALOGUES[6],
  ],
};

/**
 * Two random Maestro Roshi phrases reproduced randomly on non-perverted surprise animations
 * without swapping the specific flavorNote of one animation onto another animation.
 */
export const SURPRISE_RANDOM_PHRASES: readonly string[] = [
  'Ven a este viejito... Puede que tenga canas en la barba, ¡pero en la cintura sigo teniendo 20 años!',
  'Ver a estos saiyajins entrenar me hace sentir ganas de irme a dormir una siesta de tres días seguidos.',
];

/**
 * Special Maestro Roshi dialogues when starting or completing an Academy level
 * (Nivel Básico: Clases 1–15, Nivel Intermedio: Clases 16–30, Nivel Avanzado: Clases 31–45).
 */
export const ROSHI_LEVEL_START_DIALOGUE =
  'Si quieren ser mis discípulos y aprender las técnicas secretas de la Escuela Tortuga, la primera lección no es física... ¡es traerme una chica linda y de buen corazón!';

export const ROSHI_LEVEL_COMPLETE_DIALOGUE =
  'Superó por completo mis enseñanzas hace mucho tiempo... Yo ya no tengo nada más que enseñarle como maestro, solo me queda observar hasta dónde es capaz de llegar.';

/**
 * Fixed dialogue permanently paired with `ROSHI_ESPECIAL_1_VIDEO_URL` ("roshi especial.webm").
 * This dialogue never changes.
 */
export const ROSHI_ESPECIAL_1_FIXED_DIALOGUE = ROSHI_LEVEL_COMPLETE_DIALOGUE;

/**
 * Character identifiers for Dragon Ball reward dialogues.
 * Prepared so that edited character PNG portraits can be linked per character in the future.
 */
export type DragonBallCharacterId =
  | 'ROSHI'
  | 'VEGETA'
  | 'GOKU'
  | 'WHIS'
  | 'BILLS'
  | 'PICCOLO'
  | 'GOHAN'
  | 'FREEZER'
  | 'TRUNKS_FUTURO'
  | 'BARDOCK'
  | 'BULMA'
  | 'MILK'
  | 'ANDROIDE_18';

export interface CharacterRewardDialogueEntry {
  characterId: DragonBallCharacterId;
  characterName: string;
  quote: string;
  fullText: string;
  /** Optional edited PNG portrait URL for this character (prepared for future asset integration) */
  characterImageUrl?: string;
}

/**
 * Registry of edited PNG portraits per character.
 * Currently empty while dialogues are shown alone; ready to map characterId -> PNG URL when assets are provided.
 */
export const CHARACTER_PORTRAIT_IMAGE_URLS: Partial<Record<DragonBallCharacterId, string>> = {};

/**
 * Structured list of the 20 Celebration reward dialogues (assigned in shuffle mode after the daily opener "roshi especial.webm").
 */
export const CELEBRATION_REWARD_CHARACTER_DIALOGUES: readonly CharacterRewardDialogueEntry[] = [
  {
    characterId: 'VEGETA',
    characterName: 'Vegeta',
    quote: '¡Hmph! Debo admitir que has demostrado tener una determinación digna de un guerrero saiyajin',
    fullText:
      'Vegeta: «¡Hmph! Debo admitir que has demostrado tener una determinación digna de un guerrero saiyajin»',
  },
  {
    characterId: 'VEGETA',
    characterName: 'Vegeta',
    quote: '¡Ese es el espíritu de un verdadero guerrero!',
    fullText: 'Vegeta: «¡Ese es el espíritu de un verdadero guerrero!»',
  },
  {
    characterId: 'VEGETA',
    characterName: 'Vegeta',
    quote: 'No está mal... Has conseguido algo que pocos serían capaces de lograr',
    fullText: 'Vegeta: «No está mal... Has conseguido algo que pocos serían capaces de lograr»',
  },
  {
    characterId: 'GOKU',
    characterName: 'Goku',
    quote: '¡Ja, ja! ¡Sabía que podías hacerlo! ¡Cada vez eres más fuerte!',
    fullText: 'Goku: «¡Ja, ja! ¡Sabía que podías hacerlo! ¡Cada vez eres más fuerte!»',
  },
  {
    characterId: 'GOKU',
    characterName: 'Goku',
    quote: '¡Nunca dejes de entrenar! ¡Siempre existe alguien a quien superar, incluso a ti mismo!',
    fullText:
      'Goku: «¡Nunca dejes de entrenar! ¡Siempre existe alguien a quien superar, incluso a ti mismo!»',
  },
  {
    characterId: 'WHIS',
    characterName: 'Whis',
    quote: 'Vaya, vaya... Debo reconocer que su progreso ha sido verdaderamente extraordinario',
    fullText:
      'Whis: «Vaya, vaya... Debo reconocer que su progreso ha sido verdaderamente extraordinario»',
  },
  {
    characterId: 'WHIS',
    characterName: 'Whis',
    quote: 'Parece que finalmente está comenzando a comprender la esencia de este arte',
    fullText: 'Whis: «Parece que finalmente está comenzando a comprender la esencia de este arte»',
  },
  {
    characterId: 'WHIS',
    characterName: 'Whis',
    quote: 'Me atrevería a decir que está empezando a convertirse en un estudiante excepcional',
    fullText:
      'Whis: «Me atrevería a decir que está empezando a convertirse en un estudiante excepcional»',
  },
  {
    characterId: 'BILLS',
    characterName: 'Bills',
    quote: 'Hmph... No esperaba que un mortal pudiera llegar tan lejos',
    fullText: 'Bills: «Hmph... No esperaba que un mortal pudiera llegar tan lejos»',
  },
  {
    characterId: 'BILLS',
    characterName: 'Bills',
    quote: 'Interesante. Por primera vez, has conseguido captar mi atención',
    fullText: 'Bills: «Interesante. Por primera vez, has conseguido captar mi atención»',
  },
  {
    characterId: 'BILLS',
    characterName: 'Bills',
    quote: 'Vaya... debo admitir que me has sorprendido',
    fullText: 'Bills: «Vaya... debo admitir que me has sorprendido»',
  },
  {
    characterId: 'BILLS',
    characterName: 'Bills',
    quote: 'Quizá algún día llegues a ser digno de enfrentarte a un verdadero dios',
    fullText: 'Bills: «Quizá algún día llegues a ser digno de enfrentarte a un verdadero dios»',
  },
  {
    characterId: 'PICCOLO',
    characterName: 'Piccolo',
    quote: 'Tu progreso habla por sí mismo. Sigue entrenando',
    fullText: 'Piccolo: «Tu progreso habla por sí mismo. Sigue entrenando»',
  },
  {
    characterId: 'PICCOLO',
    characterName: 'Piccolo',
    quote:
      'Estoy satisfecho con tu progreso. Pero no confundas mi reconocimiento con el final de tu entrenamiento',
    fullText:
      'Piccolo: «Estoy satisfecho con tu progreso. Pero no confundas mi reconocimiento con el final de tu entrenamiento»',
  },
  {
    characterId: 'GOHAN',
    characterName: 'Gohan',
    quote: '¡No subestimes lo que eres capaz de conseguir cuando confías en ti mismo!',
    fullText: 'Gohan: «¡No subestimes lo que eres capaz de conseguir cuando confías en ti mismo!»',
  },
  {
    characterId: 'GOHAN',
    characterName: 'Gohan',
    quote: 'Tu verdadero potencial apenas está comenzando a despertar',
    fullText: 'Gohan: «Tu verdadero potencial apenas está comenzando a despertar»',
  },
  {
    characterId: 'FREEZER',
    characterName: 'Freezer',
    quote: 'Vaya... No esperaba semejante resultado de alguien como tú',
    fullText: 'Freezer: «Vaya... No esperaba semejante resultado de alguien como tú»',
  },
  {
    characterId: 'FREEZER',
    characterName: 'Freezer',
    quote: '¡Magnífico! Has demostrado que incluso los seres inferiores pueden sorprender',
    fullText:
      'Freezer: «¡Magnífico! Has demostrado que incluso los seres inferiores pueden sorprender»',
  },
  {
    characterId: 'FREEZER',
    characterName: 'Freezer',
    quote: 'Parece que finalmente has dejado de ser una completa decepción',
    fullText: 'Freezer: «Parece que finalmente has dejado de ser una completa decepción»',
  },
  {
    characterId: 'TRUNKS_FUTURO',
    characterName: 'Trunks del futuro',
    quote: 'Has demostrado que el destino no está escrito',
    fullText: 'Trunks del futuro: «Has demostrado que el destino no está escrito»',
  },
];

/**
 * Shuffled dialogue pool for the remaining Practice Win / Celebration reward videos (excluding "roshi especial.webm").
 */
export const PRACTICE_WIN_SHUFFLE_DIALOGUES: readonly string[] =
  CELEBRATION_REWARD_CHARACTER_DIALOGUES.map((entry) => entry.fullText);

/**
 * First dialogue of every day when the mistake/loss video reward is triggered.
 */
export const ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE = ROSHI_TWO_MISTAKES_DIALOGUE;

/**
 * Structured list of the 16 Mistake reward dialogues (assigned in shuffle mode after the first mistake reward of the day).
 */
export const MISTAKE_REWARD_CHARACTER_DIALOGUES: readonly CharacterRewardDialogueEntry[] = [
  {
    characterId: 'VEGETA',
    characterName: 'Vegeta',
    quote: '¡Qué vergüenza! ¿Así piensas demostrar tu orgullo?',
    fullText: 'Vegeta: «¡Qué vergüenza! ¿Así piensas demostrar tu orgullo?»',
  },
  {
    characterId: 'VEGETA',
    characterName: 'Vegeta',
    quote: '¡No me hagas reír! ¿De verdad crees que puedes alcanzar la grandeza huyendo de tus derrotas?',
    fullText:
      'Vegeta: «¡No me hagas reír! ¿De verdad crees que puedes alcanzar la grandeza huyendo de tus derrotas?»',
  },
  {
    characterId: 'VEGETA',
    characterName: 'Vegeta',
    quote: '¡¿Qué estás haciendo, insecto?! ¡¿Vas a abandonar justo ahora?!',
    fullText: 'Vegeta: «¡¿Qué estás haciendo, insecto?! ¡¿Vas a abandonar justo ahora?!»',
  },
  {
    characterId: 'FREEZER',
    characterName: 'Freezer',
    quote: '¡Por favor! No me digas que esto era lo mejor que podías ofrecer',
    fullText: 'Freezer: «¡Por favor! No me digas que esto era lo mejor que podías ofrecer»',
  },
  {
    characterId: 'FREEZER',
    characterName: 'Freezer',
    quote: '¡Qué vergüenza! Y yo que esperaba encontrar un rival digno de mi tiempo',
    fullText: 'Freezer: «¡Qué vergüenza! Y yo que esperaba encontrar un rival digno de mi tiempo»',
  },
  {
    characterId: 'FREEZER',
    characterName: 'Freezer',
    quote: 'Qué triste... ni siquiera has conseguido obligarme a tomar esto en serio',
    fullText: 'Freezer: «Qué triste... ni siquiera has conseguido obligarme a tomar esto en serio»',
  },
  {
    characterId: 'PICCOLO',
    characterName: 'Piccolo',
    quote: 'Deja de buscar excusas y vuelve a concentrarte',
    fullText: 'Piccolo: «Deja de buscar excusas y vuelve a concentrarte»',
  },
  {
    characterId: 'GOKU',
    characterName: 'Goku',
    quote: '¡Vamos! ¡No me digas que ya te cansaste!',
    fullText: 'Goku: «¡Vamos! ¡No me digas que ya te cansaste!»',
  },
  {
    characterId: 'BILLS',
    characterName: 'Bills',
    quote: 'Hmph... pensé que tenías más determinación',
    fullText: 'Bills: «Hmph... pensé que tenías más determinación»',
  },
  {
    characterId: 'BILLS',
    characterName: 'Bills',
    quote: 'Vuelve cuando estés preparado para tomarte esto en serio',
    fullText: 'Bills: «Vuelve cuando estés preparado para tomarte esto en serio»',
  },
  {
    characterId: 'BILLS',
    characterName: 'Bills',
    quote: 'Hmph... ¿Eso era todo? Francamente, esperaba algo más interesante',
    fullText: 'Bills: «Hmph... ¿Eso era todo? Francamente, esperaba algo más interesante»',
  },
  {
    characterId: 'BARDOCK',
    characterName: 'Bardock',
    quote: '¡Levántate! ¡Demuestra que tu voluntad es más fuerte que tu miedo!',
    fullText: 'Bardock: «¡Levántate! ¡Demuestra que tu voluntad es más fuerte que tu miedo!»',
  },
  {
    characterId: 'BARDOCK',
    characterName: 'Bardock',
    quote: '¡Si todavía puedes luchar, todavía puedes ganar!',
    fullText: 'Bardock: «¡Si todavía puedes luchar, todavía puedes ganar!»',
  },
  {
    characterId: 'BULMA',
    characterName: 'Bulma',
    quote: '¡Deja de comportarte como un cobarde y utiliza la cabeza!',
    fullText: 'Bulma: «¡Deja de comportarte como un cobarde y utiliza la cabeza!»',
  },
  {
    characterId: 'MILK',
    characterName: 'Milk',
    quote: '¡Goku jamás habría abandonado un entrenamiento por algo así!',
    fullText: 'Milk: «¡Goku jamás habría abandonado un entrenamiento por algo así!»',
  },
  {
    characterId: 'ANDROIDE_18',
    characterName: 'Androide No. 18',
    quote: '¿Ya terminaste? Pensé que aguantarías un poco más',
    fullText: 'Androide No. 18: «¿Ya terminaste? Pensé que aguantarías un poco más»',
  },
];

/**
 * Shuffled dialogue pool for Mistake/Loss rewards after the first mistake reward of the day.
 */
export const MISTAKE_REWARD_SHUFFLE_DIALOGUES: readonly string[] =
  MISTAKE_REWARD_CHARACTER_DIALOGUES.map((entry) => entry.fullText);

/**
 * Resolves character metadata (and optional future PNG portrait URL) for any reward dialogue string.
 */
export function resolveCharacterRewardDialogueMeta(
  dialogueText?: string
): CharacterRewardDialogueEntry | null {
  if (!dialogueText) return null;
  const found =
    CELEBRATION_REWARD_CHARACTER_DIALOGUES.find((d) => d.fullText === dialogueText) ??
    MISTAKE_REWARD_CHARACTER_DIALOGUES.find((d) => d.fullText === dialogueText);
  if (!found) return null;
  const portraitUrl = found.characterImageUrl ?? CHARACTER_PORTRAIT_IMAGE_URLS[found.characterId];
  return portraitUrl ? { ...found, characterImageUrl: portraitUrl } : found;
}

/**
 * Maestro Roshi's shuffled dialogues displayed next to his animation in the Academia (LEARN) tab.
 */
export const ACADEMY_ROSHI_SHUFFLE_DIALOGUES: readonly string[] = [
  'Si quieren ser mis discípulos y aprender las técnicas secretas de la Escuela Tortuga, la primera lección no es física... ¡es traerme una chica linda y de buen corazón!',
  '¿Para esto los mantengo viviendo gratis en mi isla? ¡Si no me traen un té de hierbas y la revista de esta semana, los convertiré en sopa!',
  '¡Hay que moverse bien, estudiar bien, jugar bien, comer bien y descansar bien! ¡Ese es el estilo de la Escuela Tortuga para disfrutar de la vida al máximo!',
  'Recuerden que siempre habrá alguien más fuerte que ustedes en alguna parte del mundo.',
];

export interface AcademyLevelBoundaryInfo {
  levelId: 'BASICO' | 'INTERMEDIO' | 'AVANZADO';
  levelLabel: string;
  isFirstLessonOfLevel: boolean;
  isLastLessonOfLevel: boolean;
  completionVideoUrl: string;
}

export function getAcademyLevelCompleteVideoUrl(
  levelId: 'BASICO' | 'INTERMEDIO' | 'AVANZADO'
): string {
  if (levelId === 'INTERMEDIO') {
    return INTERMEDIATE_LEVEL_COMPLETE_SPECIAL_VIDEO_URL;
  }
  if (levelId === 'AVANZADO') {
    return GRADUATION_COMPLETE_SPECIAL_VIDEO_URL;
  }
  return LEVEL_COMPLETE_SPECIAL_VIDEO_URL;
}

/**
 * Determines which Academy level (Básico, Intermedio, Avanzado) a lesson belongs to,
 * and whether it is the first lesson of that level (Clases 1, 16, 31) or the final
 * lesson that completes that level (Clases 15, 30, 45).
 */
export function getAcademyLevelBoundaryInfo(
  lessonId: string,
  stageNumber: number,
  catalogLessonIds?: readonly string[]
): AcademyLevelBoundaryInfo {
  const levelId: 'BASICO' | 'INTERMEDIO' | 'AVANZADO' =
    stageNumber <= 2 ? 'BASICO' : stageNumber <= 6 ? 'INTERMEDIO' : 'AVANZADO';
  const levelLabel =
    levelId === 'BASICO'
      ? 'Nivel Básico'
      : levelId === 'INTERMEDIO'
      ? 'Nivel Intermedio'
      : 'Nivel Avanzado';
  const completionVideoUrl = getAcademyLevelCompleteVideoUrl(levelId);

  if (catalogLessonIds && catalogLessonIds.length > 0) {
    const idx = catalogLessonIds.indexOf(lessonId);
    if (idx !== -1) {
      return {
        levelId,
        levelLabel,
        isFirstLessonOfLevel: idx === 0 || idx === 15 || idx === 30,
        isLastLessonOfLevel: idx === 14 || idx === 29 || idx === 44,
        completionVideoUrl,
      };
    }
  }

  const firstIds = new Set([
    'lesson-1-tablero-turnos',
    'lesson-7-forma-eficiencia',
    'lesson-11-sente-gote-fuseki-joseki',
  ]);
  const lastIds = new Set([
    'lesson-39-kageyama-piedras-caminan-paso-atras',
    'lesson-42-kageyama-regla-fundamental-tsumego-cerco',
    'lesson-36-ko-indirecto-doble-amenaza-maestria',
  ]);

  return {
    levelId,
    levelLabel,
    isFirstLessonOfLevel: firstIds.has(lessonId),
    isLastLessonOfLevel: lastIds.has(lessonId),
    completionVideoUrl,
  };
}

const LEVEL_START_DIALOGUE_SHOWN_KEY = 'go_academy_level_start_dialogue_shown_v1';
const inMemoryShownLevelStartLessons = new Set<string>();

/**
 * Ensures `ROSHI_LEVEL_START_DIALOGUE` is only shown once when the user opens
 * the first class of a level. If the user exits to explore the app and re-opens
 * that class, it will not repeat the level-start quote.
 */
export function consumeLevelStartDialogueOnce(lessonId: string): boolean {
  if (!lessonId) return false;
  if (inMemoryShownLevelStartLessons.has(lessonId)) {
    return false;
  }
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(LEVEL_START_DIALOGUE_SHOWN_KEY);
      const parsed: string[] = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed) && parsed.includes(lessonId)) {
        inMemoryShownLevelStartLessons.add(lessonId);
        return false;
      }
      const next = Array.isArray(parsed) ? [...parsed, lessonId] : [lessonId];
      window.localStorage.setItem(LEVEL_START_DIALOGUE_SHOWN_KEY, JSON.stringify(next));
    }
  } catch {
    // Ignore storage errors
  }
  inMemoryShownLevelStartLessons.add(lessonId);
  return true;
}

/**
 * High-entropy uniform random number generator in [0, 1).
 * Uses Web Crypto API when available, falling back to Math.random().
 */
export function highEntropyRandom(): number {
  try {
    if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
      const buf = new Uint32Array(1);
      globalThis.crypto.getRandomValues(buf);
      return buf[0] / 0x100000000;
    }
  } catch {
    // Fallback to Math.random
  }
  return Math.random();
}

function fisherYatesShuffle<T>(items: readonly T[], rng: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

/**
 * Shuffles an array using Fisher-Yates and guarantees:
 * 1. The first element never repeats `avoidFirst` (when `items.length > 1`), preventing boundary repeats.
 * 2. When `previousCycleOrder` is provided (when a cycle finishes and reshuffles), generates multiple
 *    independent random permutations and selects the candidate with the lowest positional and sequential
 *    overlap against `previousCycleOrder`, ensuring every new cycle has a genuinely fresh order.
 */
export function createShuffledBag<T>(
  items: readonly T[],
  avoidFirst?: T,
  rng: () => number = highEntropyRandom,
  previousCycleOrder?: readonly T[]
): T[] {
  if (items.length <= 1) return [...items];

  const enforceValidFirst = (arr: T[]): T[] => {
    const forbiddenFirst = new Set<T>();
    if (avoidFirst !== undefined) forbiddenFirst.add(avoidFirst);
    if (previousCycleOrder && previousCycleOrder.length > 0 && items.length >= 3) {
      forbiddenFirst.add(previousCycleOrder[0]);
      forbiddenFirst.add(previousCycleOrder[previousCycleOrder.length - 1]);
    }
    if (forbiddenFirst.has(arr[0])) {
      const validIndices: number[] = [];
      for (let idx = 1; idx < arr.length; idx++) {
        if (!forbiddenFirst.has(arr[idx])) {
          validIndices.push(idx);
        }
      }
      if (validIndices.length > 0) {
        const pickIdx = validIndices[Math.floor(rng() * validIndices.length)];
        const tmp = arr[0];
        arr[0] = arr[pickIdx];
        arr[pickIdx] = tmp;
      } else if (avoidFirst !== undefined && arr[0] === avoidFirst) {
        const fallbackIdx = arr.findIndex((item, idx) => idx > 0 && item !== avoidFirst);
        if (fallbackIdx > 0) {
          const tmp = arr[0];
          arr[0] = arr[fallbackIdx];
          arr[fallbackIdx] = tmp;
        }
      }
    }
    return arr;
  };

  if (!previousCycleOrder || previousCycleOrder.length <= 1) {
    return enforceValidFirst(fisherYatesShuffle(items, rng));
  }

  // Build set of directed bigrams from the previous cycle so we avoid repeating consecutive pairs
  const prevBigrams = new Set<string>();
  for (let i = 0; i < previousCycleOrder.length - 1; i++) {
    prevBigrams.add(`${String(previousCycleOrder[i])}->${String(previousCycleOrder[i + 1])}`);
  }

  let bestCandidate: T[] | null = null;
  let bestPenalty = Number.POSITIVE_INFINITY;
  const candidateTrials = 28;

  for (let attempt = 0; attempt < candidateTrials; attempt++) {
    const candidate = enforceValidFirst(fisherYatesShuffle(items, rng));

    let penalty = 0;
    if (avoidFirst !== undefined && candidate[0] === avoidFirst) {
      penalty += 10000;
    }
    if (candidate[0] === previousCycleOrder[0]) {
      penalty += 2500;
    }
    if (
      previousCycleOrder.length >= 4 &&
      candidate[0] === previousCycleOrder[previousCycleOrder.length - 2]
    ) {
      penalty += 800;
    }

    // Penalize any item landing in the exact same index as the previous cycle
    let samePositionCount = 0;
    const len = Math.min(candidate.length, previousCycleOrder.length);
    for (let i = 0; i < len; i++) {
      if (candidate[i] === previousCycleOrder[i]) {
        samePositionCount++;
      }
    }
    if (samePositionCount === len) {
      penalty += 50000; // Never allow the exact same cycle order
    }
    penalty += samePositionCount * 120;

    // Penalize repeating consecutive pairs (A -> B) from the previous cycle
    for (let i = 0; i < candidate.length - 1; i++) {
      if (prevBigrams.has(`${String(candidate[i])}->${String(candidate[i + 1])}`)) {
        penalty += 45;
      }
    }

    if (penalty < bestPenalty) {
      bestPenalty = penalty;
      bestCandidate = candidate;
      if (penalty === 0) break;
    }
  }

  return bestCandidate ?? enforceValidFirst(fisherYatesShuffle(items, rng));
}

function pickRandomSurprisePhraseSlots(
  totalNonPervertedInCycle: number,
  phraseCount: number,
  rng: () => number
): number[] {
  const indices = Array.from({ length: totalNonPervertedInCycle }, (_, i) => i);
  const shuffled = fisherYatesShuffle(indices, rng);
  return shuffled.slice(0, Math.min(phraseCount, totalNonPervertedInCycle)).sort((a, b) => a - b);
}

export interface RoshiSchedulerState {
  interactionCount: number;
  surpriseBag: RoshiAnimationId[];
  surpriseCycleHistory: RoshiAnimationId[];
  lastSurpriseCycleOrder: RoshiAnimationId[];
  surpriseCycleCount: number;
  lastSurpriseId?: RoshiAnimationId;
  mistakeBag: RoshiAnimationId[];
  mistakeCycleHistory: RoshiAnimationId[];
  lastMistakeCycleOrder: RoshiAnimationId[];
  mistakeCycleCount: number;
  lastMistakeId?: RoshiAnimationId;
  pervertedDialogueBag: string[];
  pervertedDialogueCycleHistory: string[];
  lastPervertedDialogueCycleOrder: string[];
  pervertedDialogueCycleCount: number;
  lastPervertedDialogue?: string;
  pervertedGifBag: string[];
  pervertedGifCycleHistory: string[];
  lastPervertedGifCycleOrder: string[];
  pervertedGifCycleCount: number;
  lastPervertedGifUrl?: string;
  celebrationGifBag: string[];
  celebrationGifCycleHistory: string[];
  lastCelebrationGifCycleOrder: string[];
  celebrationGifCycleCount: number;
  lastCelebrationGifUrl?: string;
  surprisePhraseBag: string[];
  surprisePhraseCycleHistory: string[];
  lastSurprisePhraseCycleOrder: string[];
  surprisePhraseCycleCount: number;
  lastSurprisePhrase?: string;
  academyDialogueBag: string[];
  academyDialogueCycleHistory: string[];
  lastAcademyDialogueCycleOrder: string[];
  academyDialogueCycleCount: number;
  lastAcademyDialogue?: string;
  practiceVideoBag: string[];
  practiceVideoCycleHistory: string[];
  lastPracticeVideoCycleOrder: string[];
  practiceVideoCycleCount: number;
  lastPracticeVideoUrl?: string;
  practiceVideoDateKey: string;
  practiceWinDialogueBag: string[];
  practiceWinDialogueCycleHistory: string[];
  lastPracticeWinDialogueCycleOrder: string[];
  practiceWinDialogueCycleCount: number;
  lastPracticeWinDialogue?: string;
  mistakeRewardDialogueBag: string[];
  mistakeRewardDialogueCycleHistory: string[];
  lastMistakeRewardDialogueCycleOrder: string[];
  mistakeRewardDialogueCycleCount: number;
  lastMistakeRewardDialogue?: string;
  mistakeRewardDialogueDateKey: string;
  currentMistakeRewardDialogue: string;
  consecutiveMistakes: number;
  triggeredTwoMistakesVideo: boolean;
  nonPervertedStepInCycle: number;
  randomSurprisePhraseStepIndices: number[];
  currentAnimationId: RoshiAnimationId;
  currentFlavorNote: string;
  currentGifUrl?: string;
}

const NON_PERVERTED_SURPRISE_COUNT =
  SURPRISE_ANIMATION_IDS.length - PERVERTED_ANIMATION_IDS.length;

/**
 * Returns the local calendar date key (`YYYY-MM-DD`) used to reset and reshuffle Practice Win and Mistake rewards each day.
 */
export function getPracticeDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Builds the daily Practice Win video queue:
 * Always starts with `PRACTICE_WIN_FIRST_DAILY_VIDEO_URL` ("roshi especial.webm"),
 * followed by `PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS` shuffled without repetition and distinct from `previousRemainingOrder`.
 */
export function createDailyPracticeWinVideoBag(
  rng: () => number = highEntropyRandom,
  previousRemainingOrder?: readonly string[]
): string[] {
  const shuffledRemaining = createShuffledBag(
    PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS,
    undefined,
    rng,
    previousRemainingOrder
  );
  return [PRACTICE_WIN_FIRST_DAILY_VIDEO_URL, ...shuffledRemaining];
}

/**
 * Builds the daily Mistake reward dialogue queue:
 * Always starts with `ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE`,
 * followed by `MISTAKE_REWARD_SHUFFLE_DIALOGUES` (16 dialogues) shuffled without repetition and distinct from `previousRemainingOrder`.
 */
export function createDailyMistakeRewardDialogueBag(
  rng: () => number = highEntropyRandom,
  previousRemainingOrder?: readonly string[]
): string[] {
  const shuffledRemaining = createShuffledBag(
    MISTAKE_REWARD_SHUFFLE_DIALOGUES,
    undefined,
    rng,
    previousRemainingOrder
  );
  return [ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE, ...shuffledRemaining];
}

/**
 * Creates a fresh scheduler state.
 */
export function createInitialRoshiScheduler(
  rng: () => number = highEntropyRandom,
  dateKey: string = getPracticeDateKey()
): RoshiSchedulerState {
  return {
    interactionCount: 1,
    surpriseBag: createShuffledBag(SURPRISE_ANIMATION_IDS, undefined, rng),
    surpriseCycleHistory: [],
    lastSurpriseCycleOrder: [],
    surpriseCycleCount: 0,
    lastSurpriseId: undefined,
    mistakeBag: createShuffledBag(MISTAKE_ANIMATION_IDS, undefined, rng),
    mistakeCycleHistory: [],
    lastMistakeCycleOrder: [],
    mistakeCycleCount: 0,
    lastMistakeId: undefined,
    pervertedDialogueBag: createShuffledBag(PERVERTED_ROSHI_DIALOGUES, undefined, rng),
    pervertedDialogueCycleHistory: [],
    lastPervertedDialogueCycleOrder: [],
    pervertedDialogueCycleCount: 0,
    lastPervertedDialogue: undefined,
    pervertedGifBag: createShuffledBag(PERVERTED_ROSHI_GIF_URLS, undefined, rng),
    pervertedGifCycleHistory: [],
    lastPervertedGifCycleOrder: [],
    pervertedGifCycleCount: 0,
    lastPervertedGifUrl: undefined,
    celebrationGifBag: createShuffledBag(CELEBRATION_GIF_URLS, undefined, rng),
    celebrationGifCycleHistory: [],
    lastCelebrationGifCycleOrder: [],
    celebrationGifCycleCount: 0,
    lastCelebrationGifUrl: undefined,
    surprisePhraseBag: createShuffledBag(SURPRISE_RANDOM_PHRASES, undefined, rng),
    surprisePhraseCycleHistory: [],
    lastSurprisePhraseCycleOrder: [],
    surprisePhraseCycleCount: 0,
    lastSurprisePhrase: undefined,
    academyDialogueBag: createShuffledBag(ACADEMY_ROSHI_SHUFFLE_DIALOGUES, undefined, rng),
    academyDialogueCycleHistory: [],
    lastAcademyDialogueCycleOrder: [],
    academyDialogueCycleCount: 0,
    lastAcademyDialogue: undefined,
    practiceVideoBag: createDailyPracticeWinVideoBag(rng),
    practiceVideoCycleHistory: [],
    lastPracticeVideoCycleOrder: [],
    practiceVideoCycleCount: 0,
    lastPracticeVideoUrl: undefined,
    practiceVideoDateKey: dateKey,
    practiceWinDialogueBag: createShuffledBag(PRACTICE_WIN_SHUFFLE_DIALOGUES, undefined, rng),
    practiceWinDialogueCycleHistory: [],
    lastPracticeWinDialogueCycleOrder: [],
    practiceWinDialogueCycleCount: 0,
    lastPracticeWinDialogue: undefined,
    mistakeRewardDialogueBag: createDailyMistakeRewardDialogueBag(rng),
    mistakeRewardDialogueCycleHistory: [],
    lastMistakeRewardDialogueCycleOrder: [],
    mistakeRewardDialogueCycleCount: 0,
    lastMistakeRewardDialogue: undefined,
    mistakeRewardDialogueDateKey: dateKey,
    currentMistakeRewardDialogue: ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE,
    consecutiveMistakes: 0,
    triggeredTwoMistakesVideo: false,
    nonPervertedStepInCycle: 0,
    randomSurprisePhraseStepIndices: pickRandomSurprisePhraseSlots(
      NON_PERVERTED_SURPRISE_COUNT,
      SURPRISE_RANDOM_PHRASES.length,
      rng
    ),
    currentAnimationId: 'HABLANDO',
    currentFlavorNote: ROSHI_SPRITE_CATALOG.HABLANDO.flavorNote,
    currentGifUrl: undefined,
  };
}

export interface NextRoshiInteractionOptions {
  category?: RoshiAnimationCategory;
  forceSurprise?: boolean;
  forceMistake?: boolean;
  rng?: () => number;
  dateKey?: string;
}

/**
 * Advances the scheduler to the next interaction.
 */
export function nextRoshiInteraction(
  prev: RoshiSchedulerState,
  options?: NextRoshiInteractionOptions
): RoshiSchedulerState {
  const rng = options?.rng ?? highEntropyRandom;
  const nextCount = prev.interactionCount + 1;

  const resolvedCategory: RoshiAnimationCategory = options?.forceSurprise
    ? 'SURPRISE'
    : options?.forceMistake
    ? 'MISTAKE'
    : options?.category ?? 'CONVERSATION';

  if (resolvedCategory === 'SURPRISE') {
    let bag = [...prev.surpriseBag];
    let cycleHistory = [...(prev.surpriseCycleHistory ?? [])];
    let lastCycleOrder = [...(prev.lastSurpriseCycleOrder ?? [])];
    let cycleCount = prev.surpriseCycleCount ?? 0;
    let nonPervertedStepInCycle = prev.nonPervertedStepInCycle ?? 0;
    let randomSurprisePhraseStepIndices = [
      ...(prev.randomSurprisePhraseStepIndices ??
        pickRandomSurprisePhraseSlots(
          NON_PERVERTED_SURPRISE_COUNT,
          SURPRISE_RANDOM_PHRASES.length,
          rng
        )),
    ];

    if (bag.length === 0) {
      if (cycleHistory.length > 0) {
        lastCycleOrder = cycleHistory;
      }
      bag = createShuffledBag(SURPRISE_ANIMATION_IDS, prev.lastSurpriseId, rng, lastCycleOrder);
      cycleHistory = [];
      cycleCount += 1;
      nonPervertedStepInCycle = 0;
      randomSurprisePhraseStepIndices = pickRandomSurprisePhraseSlots(
        NON_PERVERTED_SURPRISE_COUNT,
        SURPRISE_RANDOM_PHRASES.length,
        rng
      );
    }

    const chosen = bag.shift()!;
    cycleHistory.push(chosen);

    const isPerverted = (PERVERTED_ANIMATION_IDS as readonly string[]).includes(chosen);

    let pervertedDialogueBag = [...(prev.pervertedDialogueBag ?? [])];
    let pervertedDialogueCycleHistory = [...(prev.pervertedDialogueCycleHistory ?? [])];
    let lastPervertedDialogueCycleOrder = [...(prev.lastPervertedDialogueCycleOrder ?? [])];
    let pervertedDialogueCycleCount = prev.pervertedDialogueCycleCount ?? 0;
    let lastPervertedDialogue = prev.lastPervertedDialogue;

    let pervertedGifBag = [...(prev.pervertedGifBag ?? [])];
    let pervertedGifCycleHistory = [...(prev.pervertedGifCycleHistory ?? [])];
    let lastPervertedGifCycleOrder = [...(prev.lastPervertedGifCycleOrder ?? [])];
    let pervertedGifCycleCount = prev.pervertedGifCycleCount ?? 0;
    let lastPervertedGifUrl = prev.lastPervertedGifUrl;

    let surprisePhraseBag = [...(prev.surprisePhraseBag ?? [])];
    let surprisePhraseCycleHistory = [...(prev.surprisePhraseCycleHistory ?? [])];
    let lastSurprisePhraseCycleOrder = [...(prev.lastSurprisePhraseCycleOrder ?? [])];
    let surprisePhraseCycleCount = prev.surprisePhraseCycleCount ?? 0;
    let lastSurprisePhrase = prev.lastSurprisePhrase;

    let chosenFlavorNote: string;
    let chosenGifUrl: string | undefined = undefined;

    if (isPerverted) {
      if (pervertedDialogueBag.length === 0) {
        if (pervertedDialogueCycleHistory.length > 0) {
          lastPervertedDialogueCycleOrder = pervertedDialogueCycleHistory;
        }
        pervertedDialogueBag = createShuffledBag(
          PERVERTED_ROSHI_DIALOGUES,
          lastPervertedDialogue,
          rng,
          lastPervertedDialogueCycleOrder
        );
        pervertedDialogueCycleHistory = [];
        pervertedDialogueCycleCount += 1;
      }
      chosenFlavorNote = pervertedDialogueBag.shift()!;
      pervertedDialogueCycleHistory.push(chosenFlavorNote);
      lastPervertedDialogue = chosenFlavorNote;

      if (pervertedGifBag.length === 0) {
        if (pervertedGifCycleHistory.length > 0) {
          lastPervertedGifCycleOrder = pervertedGifCycleHistory;
        }
        pervertedGifBag = createShuffledBag(
          PERVERTED_ROSHI_GIF_URLS,
          lastPervertedGifUrl,
          rng,
          lastPervertedGifCycleOrder
        );
        pervertedGifCycleHistory = [];
        pervertedGifCycleCount += 1;
      }
      chosenGifUrl = pervertedGifBag.shift()!;
      pervertedGifCycleHistory.push(chosenGifUrl);
      lastPervertedGifUrl = chosenGifUrl;
    } else {
      const currentNonPervertedIdx = nonPervertedStepInCycle;
      nonPervertedStepInCycle += 1;

      if (randomSurprisePhraseStepIndices.includes(currentNonPervertedIdx)) {
        if (surprisePhraseBag.length === 0) {
          if (surprisePhraseCycleHistory.length > 0) {
            lastSurprisePhraseCycleOrder = surprisePhraseCycleHistory;
          }
          surprisePhraseBag = createShuffledBag(
            SURPRISE_RANDOM_PHRASES,
            lastSurprisePhrase,
            rng,
            lastSurprisePhraseCycleOrder
          );
          surprisePhraseCycleHistory = [];
          surprisePhraseCycleCount += 1;
        }
        chosenFlavorNote = surprisePhraseBag.shift()!;
        surprisePhraseCycleHistory.push(chosenFlavorNote);
        lastSurprisePhrase = chosenFlavorNote;
      } else {
        // Assign the exact corresponding phrase that belongs to this animation
        chosenFlavorNote = ROSHI_SPRITE_CATALOG[chosen].flavorNote;
      }
    }

    return {
      ...prev,
      interactionCount: nextCount,
      surpriseBag: bag,
      surpriseCycleHistory: cycleHistory,
      lastSurpriseCycleOrder: lastCycleOrder,
      surpriseCycleCount: cycleCount,
      lastSurpriseId: chosen,
      pervertedDialogueBag,
      pervertedDialogueCycleHistory,
      lastPervertedDialogueCycleOrder,
      pervertedDialogueCycleCount,
      lastPervertedDialogue,
      pervertedGifBag,
      pervertedGifCycleHistory,
      lastPervertedGifCycleOrder,
      pervertedGifCycleCount,
      lastPervertedGifUrl,
      surprisePhraseBag,
      surprisePhraseCycleHistory,
      lastSurprisePhraseCycleOrder,
      surprisePhraseCycleCount,
      lastSurprisePhrase,
      consecutiveMistakes: 0,
      triggeredTwoMistakesVideo: false,
      nonPervertedStepInCycle,
      randomSurprisePhraseStepIndices,
      currentAnimationId: chosen,
      currentFlavorNote: chosenFlavorNote,
      currentGifUrl: chosenGifUrl,
    };
  }

  if (resolvedCategory === 'MISTAKE') {
    let bag = [...prev.mistakeBag];
    let cycleHistory = [...(prev.mistakeCycleHistory ?? [])];
    let lastCycleOrder = [...(prev.lastMistakeCycleOrder ?? [])];
    let cycleCount = prev.mistakeCycleCount ?? 0;

    if (bag.length === 0) {
      if (cycleHistory.length > 0) {
        lastCycleOrder = cycleHistory;
      }
      bag = createShuffledBag(MISTAKE_ANIMATION_IDS, prev.lastMistakeId, rng, lastCycleOrder);
      cycleHistory = [];
      cycleCount += 1;
    }

    const chosen = bag.shift()!;
    cycleHistory.push(chosen);

    const nextConsecutiveMistakes = (prev.consecutiveMistakes ?? 0) + 1;
    const triggeredTwoMistakesVideo = nextConsecutiveMistakes >= 2;
    const consecutiveMistakes = triggeredTwoMistakesVideo ? 0 : nextConsecutiveMistakes;

    let baseMistakeState: RoshiSchedulerState = {
      ...prev,
      interactionCount: nextCount,
      mistakeBag: bag,
      mistakeCycleHistory: cycleHistory,
      lastMistakeCycleOrder: lastCycleOrder,
      mistakeCycleCount: cycleCount,
      lastMistakeId: chosen,
      consecutiveMistakes,
      triggeredTwoMistakesVideo,
      currentAnimationId: chosen,
      currentFlavorNote: ROSHI_SPRITE_CATALOG[chosen].flavorNote,
      currentGifUrl: undefined,
    };

    if (triggeredTwoMistakesVideo) {
      const mistakeDialogueRes = nextMistakeRewardDialogue(
        baseMistakeState,
        rng,
        options?.dateKey ?? getPracticeDateKey()
      );
      baseMistakeState = mistakeDialogueRes.nextState;
    }

    return baseMistakeState;
  }

  return {
    ...prev,
    interactionCount: nextCount,
    consecutiveMistakes: prev.consecutiveMistakes ?? 0,
    triggeredTwoMistakesVideo: false,
    currentAnimationId: 'HABLANDO',
    currentFlavorNote: ROSHI_SPRITE_CATALOG.HABLANDO.flavorNote,
    currentGifUrl: undefined,
  };
}

/**
 * Pulls the next Mistake/Loss reward dialogue according to the daily Mistake rules:
 * 1. Every day (`dateKey`, YYYY-MM-DD), the first Mistake reward of the day always plays
 *    `ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE`.
 * 2. Subsequent Mistake rewards during the same day play the 16 character dialogues
 *    (`MISTAKE_REWARD_SHUFFLE_DIALOGUES`) in shuffle mode without repeating during the day.
 * 3. On the next calendar day (`dateKey !== prev.mistakeRewardDialogueDateKey`), the queue resets
 *    and reshuffles the 16 character dialogues into a fresh order, starting the day again with
 *    `ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE`.
 */
export function nextMistakeRewardDialogue(
  prev: RoshiSchedulerState,
  rng: () => number = highEntropyRandom,
  dateKey: string = getPracticeDateKey()
): { nextState: RoshiSchedulerState; dialogue: string } {
  const prevDateKey = prev.mistakeRewardDialogueDateKey ?? dateKey;
  const isNewDay = prevDateKey !== dateKey;

  let bag = [...(prev.mistakeRewardDialogueBag ?? [])];
  let cycleHistory = [...(prev.mistakeRewardDialogueCycleHistory ?? [])];
  let lastCycleOrder = [...(prev.lastMistakeRewardDialogueCycleOrder ?? [])];
  let cycleCount = prev.mistakeRewardDialogueCycleCount ?? 0;

  if (isNewDay || bag.length === 0) {
    const previousSource = cycleHistory.length > 0 ? cycleHistory : lastCycleOrder;
    const prevRemainingOrder = previousSource.filter(
      (d) => d !== ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE
    );
    if (cycleHistory.length > 0) {
      lastCycleOrder = cycleHistory;
    }
    bag = createDailyMistakeRewardDialogueBag(rng, prevRemainingOrder);
    cycleHistory = [];
    cycleCount += 1;
  }

  const chosenDialogue = bag.shift() ?? ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE;
  cycleHistory.push(chosenDialogue);

  const nextState: RoshiSchedulerState = {
    ...prev,
    mistakeRewardDialogueBag: bag,
    mistakeRewardDialogueCycleHistory: cycleHistory,
    lastMistakeRewardDialogueCycleOrder: lastCycleOrder,
    mistakeRewardDialogueCycleCount: cycleCount,
    lastMistakeRewardDialogue: chosenDialogue,
    mistakeRewardDialogueDateKey: dateKey,
    currentMistakeRewardDialogue: chosenDialogue,
  };

  return { nextState, dialogue: chosenDialogue };
}

/**
 * Pulls the next celebration GIF in shuffle mode and reshuffles into a new distinct cycle order when the bag is exhausted.
 */
export function nextCelebrationGif(
  prev: RoshiSchedulerState,
  rng: () => number = highEntropyRandom
): { nextState: RoshiSchedulerState; gifUrl: string } {
  let bag = [...(prev.celebrationGifBag ?? [])];
  let cycleHistory = [...(prev.celebrationGifCycleHistory ?? [])];
  let lastCycleOrder = [...(prev.lastCelebrationGifCycleOrder ?? [])];
  let cycleCount = prev.celebrationGifCycleCount ?? 0;

  if (bag.length === 0) {
    if (cycleHistory.length > 0) {
      lastCycleOrder = cycleHistory;
    }
    bag = createShuffledBag(
      CELEBRATION_GIF_URLS,
      prev.lastCelebrationGifUrl,
      rng,
      lastCycleOrder
    );
    cycleHistory = [];
    cycleCount += 1;
  }

  const chosenGif = bag.shift() ?? CELEBRATION_GIF_URLS[0];
  cycleHistory.push(chosenGif);

  const nextState: RoshiSchedulerState = {
    ...prev,
    celebrationGifBag: bag,
    celebrationGifCycleHistory: cycleHistory,
    lastCelebrationGifCycleOrder: lastCycleOrder,
    celebrationGifCycleCount: cycleCount,
    lastCelebrationGifUrl: chosenGif,
  };

  return { nextState, gifUrl: chosenGif };
}

/**
 * Pulls the next Academy welcome dialogue in shuffle mode and reshuffles into a new distinct cycle order when the bag is exhausted.
 */
export function nextAcademyRoshiDialogue(
  prev: RoshiSchedulerState,
  rng: () => number = highEntropyRandom
): { nextState: RoshiSchedulerState; dialogue: string } {
  let bag = [...(prev.academyDialogueBag ?? [])];
  let cycleHistory = [...(prev.academyDialogueCycleHistory ?? [])];
  let lastCycleOrder = [...(prev.lastAcademyDialogueCycleOrder ?? [])];
  let cycleCount = prev.academyDialogueCycleCount ?? 0;

  if (bag.length === 0) {
    if (cycleHistory.length > 0) {
      lastCycleOrder = cycleHistory;
    }
    bag = createShuffledBag(
      ACADEMY_ROSHI_SHUFFLE_DIALOGUES,
      prev.lastAcademyDialogue,
      rng,
      lastCycleOrder
    );
    cycleHistory = [];
    cycleCount += 1;
  }

  const chosenDialogue = bag.shift() ?? ACADEMY_ROSHI_SHUFFLE_DIALOGUES[0];
  cycleHistory.push(chosenDialogue);

  const nextState: RoshiSchedulerState = {
    ...prev,
    academyDialogueBag: bag,
    academyDialogueCycleHistory: cycleHistory,
    lastAcademyDialogueCycleOrder: lastCycleOrder,
    academyDialogueCycleCount: cycleCount,
    lastAcademyDialogue: chosenDialogue,
  };

  return { nextState, dialogue: chosenDialogue };
}

/**
 * Pulls the next Practice win special video and its paired dialogue according to the daily Practice Win rules:
 * 1. Every day (`dateKey`, YYYY-MM-DD) always starts with `ROSHI_ESPECIAL_1_VIDEO_URL` ("roshi especial.webm")
 *    and its permanently assigned dialogue (`ROSHI_ESPECIAL_1_FIXED_DIALOGUE`).
 * 2. After that first reward, the remaining 15 videos (`PRACTICE_WIN_REMAINING_SPECIAL_VIDEOS`) are shuffled
 *    and played without repeating during the day.
 * 3. On the next calendar day (`dateKey !== prev.practiceVideoDateKey`), the queue resets and reshuffles
 *    the remaining 15 videos into a new order, again starting with `ROSHI_ESPECIAL_1_VIDEO_URL`.
 * 4. For any video other than `ROSHI_ESPECIAL_1_VIDEO_URL`, its dialogue is pulled in shuffle mode from
 *    `PRACTICE_WIN_SHUFFLE_DIALOGUES`.
 */
export function nextPracticeWinSpecialVideo(
  prev: RoshiSchedulerState,
  rng: () => number = highEntropyRandom,
  dateKey: string = getPracticeDateKey()
): { nextState: RoshiSchedulerState; videoUrl: string; dialogue: string } {
  const prevDateKey = prev.practiceVideoDateKey ?? dateKey;
  const isNewDay = prevDateKey !== dateKey;

  let bag = [...(prev.practiceVideoBag ?? [])];
  let cycleHistory = [...(prev.practiceVideoCycleHistory ?? [])];
  let lastCycleOrder = [...(prev.lastPracticeVideoCycleOrder ?? [])];
  let cycleCount = prev.practiceVideoCycleCount ?? 0;

  let dialogueBag = [...(prev.practiceWinDialogueBag ?? [])];
  let dialogueCycleHistory = [...(prev.practiceWinDialogueCycleHistory ?? [])];
  let lastDialogueCycleOrder = [...(prev.lastPracticeWinDialogueCycleOrder ?? [])];
  let dialogueCycleCount = prev.practiceWinDialogueCycleCount ?? 0;
  let lastDialogue = prev.lastPracticeWinDialogue;

  if (isNewDay || bag.length === 0) {
    const previousSource = cycleHistory.length > 0 ? cycleHistory : lastCycleOrder;
    const prevRemainingOrder = previousSource.filter(
      (v) => v !== PRACTICE_WIN_FIRST_DAILY_VIDEO_URL
    );
    if (cycleHistory.length > 0) {
      lastCycleOrder = cycleHistory;
    }
    bag = createDailyPracticeWinVideoBag(rng, prevRemainingOrder);
    cycleHistory = [];
    cycleCount += 1;

    if (isNewDay) {
      if (dialogueCycleHistory.length > 0) {
        lastDialogueCycleOrder = dialogueCycleHistory;
      }
      dialogueBag = createShuffledBag(
        PRACTICE_WIN_SHUFFLE_DIALOGUES,
        lastDialogue,
        rng,
        lastDialogueCycleOrder
      );
      dialogueCycleHistory = [];
      dialogueCycleCount += 1;
    }
  }

  const chosenVideo = bag.shift() ?? PRACTICE_WIN_FIRST_DAILY_VIDEO_URL;
  cycleHistory.push(chosenVideo);

  let chosenDialogue: string;
  if (chosenVideo === PRACTICE_WIN_FIRST_DAILY_VIDEO_URL) {
    chosenDialogue = ROSHI_ESPECIAL_1_FIXED_DIALOGUE;
  } else if (chosenVideo === ROSHI_GOKU_NO_ME_PEGUES_VIDEO_URL) {
    chosenDialogue = ROSHI_GOKU_NO_ME_PEGUES_DIALOGUE;
  } else {
    if (dialogueBag.length === 0) {
      if (dialogueCycleHistory.length > 0) {
        lastDialogueCycleOrder = dialogueCycleHistory;
      }
      dialogueBag = createShuffledBag(
        PRACTICE_WIN_SHUFFLE_DIALOGUES,
        lastDialogue,
        rng,
        lastDialogueCycleOrder
      );
      dialogueCycleHistory = [];
      dialogueCycleCount += 1;
    }
    chosenDialogue = dialogueBag.shift() ?? ROSHI_ESPECIAL_1_FIXED_DIALOGUE;
    dialogueCycleHistory.push(chosenDialogue);
    lastDialogue = chosenDialogue;
  }

  const nextState: RoshiSchedulerState = {
    ...prev,
    practiceVideoBag: bag,
    practiceVideoCycleHistory: cycleHistory,
    lastPracticeVideoCycleOrder: lastCycleOrder,
    practiceVideoCycleCount: cycleCount,
    lastPracticeVideoUrl: chosenVideo,
    practiceVideoDateKey: dateKey,
    practiceWinDialogueBag: dialogueBag,
    practiceWinDialogueCycleHistory: dialogueCycleHistory,
    lastPracticeWinDialogueCycleOrder: lastDialogueCycleOrder,
    practiceWinDialogueCycleCount: dialogueCycleCount,
    lastPracticeWinDialogue: lastDialogue,
  };

  return { nextState, videoUrl: chosenVideo, dialogue: chosenDialogue };
}

const SCHEDULER_STORAGE_KEY = 'go_academy_roshi_scheduler_v20';

function loadPersistedSchedulerState(): RoshiSchedulerState {
  const fresh = createInitialRoshiScheduler();
  if (typeof window === 'undefined') {
    return fresh;
  }
  try {
    const raw =
      (window.localStorage && window.localStorage.getItem(SCHEDULER_STORAGE_KEY)) ||
      (window.sessionStorage && window.sessionStorage.getItem(SCHEDULER_STORAGE_KEY));
    if (!raw) return fresh;
    const parsed = JSON.parse(raw) as Partial<RoshiSchedulerState>;
    const validSurpriseSet = new Set<string>(SURPRISE_ANIMATION_IDS);
    const validMistakeSet = new Set<string>(MISTAKE_ANIMATION_IDS);
    const validPervertedDialogues = new Set<string>(PERVERTED_ROSHI_DIALOGUES);
    const validPervertedGifs = new Set<string>(PERVERTED_ROSHI_GIF_URLS);
    const validCelebrationGifs = new Set<string>(CELEBRATION_GIF_URLS);
    const validSurprisePhrases = new Set<string>(SURPRISE_RANDOM_PHRASES);
    const validAcademyDialogues = new Set<string>(ACADEMY_ROSHI_SHUFFLE_DIALOGUES);
    const validPracticeVideos = new Set<string>(PRACTICE_WIN_SPECIAL_VIDEOS);
    const validPracticeWinDialogues = new Set<string>(PRACTICE_WIN_SHUFFLE_DIALOGUES);
    const validMistakeRewardDialogues = new Set<string>([
      ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE,
      ...MISTAKE_REWARD_SHUFFLE_DIALOGUES,
    ]);

    const surpriseBag = Array.isArray(parsed.surpriseBag)
      ? parsed.surpriseBag.filter((id): id is RoshiAnimationId => validSurpriseSet.has(id))
      : fresh.surpriseBag;
    const mistakeBag = Array.isArray(parsed.mistakeBag)
      ? parsed.mistakeBag.filter((id): id is RoshiAnimationId => validMistakeSet.has(id))
      : fresh.mistakeBag;

    const surpriseCycleHistory = Array.isArray(parsed.surpriseCycleHistory)
      ? parsed.surpriseCycleHistory.filter((id): id is RoshiAnimationId => validSurpriseSet.has(id))
      : [];
    const lastSurpriseCycleOrder = Array.isArray(parsed.lastSurpriseCycleOrder)
      ? parsed.lastSurpriseCycleOrder.filter((id): id is RoshiAnimationId => validSurpriseSet.has(id))
      : [];

    const mistakeCycleHistory = Array.isArray(parsed.mistakeCycleHistory)
      ? parsed.mistakeCycleHistory.filter((id): id is RoshiAnimationId => validMistakeSet.has(id))
      : [];
    const lastMistakeCycleOrder = Array.isArray(parsed.lastMistakeCycleOrder)
      ? parsed.lastMistakeCycleOrder.filter((id): id is RoshiAnimationId => validMistakeSet.has(id))
      : [];

    const pervertedDialogueBag = Array.isArray(parsed.pervertedDialogueBag)
      ? parsed.pervertedDialogueBag.filter((d): d is string => validPervertedDialogues.has(d))
      : fresh.pervertedDialogueBag;
    const pervertedDialogueCycleHistory = Array.isArray(parsed.pervertedDialogueCycleHistory)
      ? parsed.pervertedDialogueCycleHistory.filter((d): d is string =>
          validPervertedDialogues.has(d)
        )
      : [];
    const lastPervertedDialogueCycleOrder = Array.isArray(parsed.lastPervertedDialogueCycleOrder)
      ? parsed.lastPervertedDialogueCycleOrder.filter((d): d is string =>
          validPervertedDialogues.has(d)
        )
      : [];

    const pervertedGifBag = Array.isArray(parsed.pervertedGifBag)
      ? parsed.pervertedGifBag.filter((u): u is string => validPervertedGifs.has(u))
      : fresh.pervertedGifBag;
    const pervertedGifCycleHistory = Array.isArray(parsed.pervertedGifCycleHistory)
      ? parsed.pervertedGifCycleHistory.filter((u): u is string => validPervertedGifs.has(u))
      : [];
    const lastPervertedGifCycleOrder = Array.isArray(parsed.lastPervertedGifCycleOrder)
      ? parsed.lastPervertedGifCycleOrder.filter((u): u is string => validPervertedGifs.has(u))
      : [];

    const celebrationGifBag = Array.isArray(parsed.celebrationGifBag)
      ? parsed.celebrationGifBag.filter((u): u is string => validCelebrationGifs.has(u))
      : fresh.celebrationGifBag;
    const celebrationGifCycleHistory = Array.isArray(parsed.celebrationGifCycleHistory)
      ? parsed.celebrationGifCycleHistory.filter((u): u is string => validCelebrationGifs.has(u))
      : [];
    const lastCelebrationGifCycleOrder = Array.isArray(parsed.lastCelebrationGifCycleOrder)
      ? parsed.lastCelebrationGifCycleOrder.filter((u): u is string => validCelebrationGifs.has(u))
      : [];

    const surprisePhraseBag = Array.isArray(parsed.surprisePhraseBag)
      ? parsed.surprisePhraseBag.filter((d): d is string => validSurprisePhrases.has(d))
      : fresh.surprisePhraseBag;
    const surprisePhraseCycleHistory = Array.isArray(parsed.surprisePhraseCycleHistory)
      ? parsed.surprisePhraseCycleHistory.filter((d): d is string => validSurprisePhrases.has(d))
      : [];
    const lastSurprisePhraseCycleOrder = Array.isArray(parsed.lastSurprisePhraseCycleOrder)
      ? parsed.lastSurprisePhraseCycleOrder.filter((d): d is string => validSurprisePhrases.has(d))
      : [];

    const academyDialogueBag = Array.isArray(parsed.academyDialogueBag)
      ? parsed.academyDialogueBag.filter((d): d is string => validAcademyDialogues.has(d))
      : fresh.academyDialogueBag;
    const academyDialogueCycleHistory = Array.isArray(parsed.academyDialogueCycleHistory)
      ? parsed.academyDialogueCycleHistory.filter((d): d is string => validAcademyDialogues.has(d))
      : [];
    const lastAcademyDialogueCycleOrder = Array.isArray(parsed.lastAcademyDialogueCycleOrder)
      ? parsed.lastAcademyDialogueCycleOrder.filter((d): d is string => validAcademyDialogues.has(d))
      : [];

    const practiceVideoBag = Array.isArray(parsed.practiceVideoBag)
      ? parsed.practiceVideoBag.filter((v): v is string => validPracticeVideos.has(v))
      : fresh.practiceVideoBag;
    const practiceVideoCycleHistory = Array.isArray(parsed.practiceVideoCycleHistory)
      ? parsed.practiceVideoCycleHistory.filter((v): v is string => validPracticeVideos.has(v))
      : [];
    const lastPracticeVideoCycleOrder = Array.isArray(parsed.lastPracticeVideoCycleOrder)
      ? parsed.lastPracticeVideoCycleOrder.filter((v): v is string => validPracticeVideos.has(v))
      : [];

    const practiceWinDialogueBag = Array.isArray(parsed.practiceWinDialogueBag)
      ? parsed.practiceWinDialogueBag.filter((d): d is string => validPracticeWinDialogues.has(d))
      : fresh.practiceWinDialogueBag;
    const practiceWinDialogueCycleHistory = Array.isArray(parsed.practiceWinDialogueCycleHistory)
      ? parsed.practiceWinDialogueCycleHistory.filter((d): d is string =>
          validPracticeWinDialogues.has(d)
        )
      : [];
    const lastPracticeWinDialogueCycleOrder = Array.isArray(
      parsed.lastPracticeWinDialogueCycleOrder
    )
      ? parsed.lastPracticeWinDialogueCycleOrder.filter((d): d is string =>
          validPracticeWinDialogues.has(d)
        )
      : [];

    const mistakeRewardDialogueBag = Array.isArray(parsed.mistakeRewardDialogueBag)
      ? parsed.mistakeRewardDialogueBag.filter((d): d is string =>
          validMistakeRewardDialogues.has(d)
        )
      : fresh.mistakeRewardDialogueBag;
    const mistakeRewardDialogueCycleHistory = Array.isArray(
      parsed.mistakeRewardDialogueCycleHistory
    )
      ? parsed.mistakeRewardDialogueCycleHistory.filter((d): d is string =>
          validMistakeRewardDialogues.has(d)
        )
      : [];
    const lastMistakeRewardDialogueCycleOrder = Array.isArray(
      parsed.lastMistakeRewardDialogueCycleOrder
    )
      ? parsed.lastMistakeRewardDialogueCycleOrder.filter((d): d is string =>
          validMistakeRewardDialogues.has(d)
        )
      : [];

    const currentAnimationId =
      parsed.currentAnimationId && parsed.currentAnimationId in ROSHI_SPRITE_CATALOG
        ? parsed.currentAnimationId
        : 'HABLANDO';

    return {
      interactionCount:
        typeof parsed.interactionCount === 'number' ? parsed.interactionCount : fresh.interactionCount,
      surpriseBag,
      surpriseCycleHistory,
      lastSurpriseCycleOrder,
      surpriseCycleCount:
        typeof parsed.surpriseCycleCount === 'number' ? parsed.surpriseCycleCount : 0,
      lastSurpriseId:
        parsed.lastSurpriseId && validSurpriseSet.has(parsed.lastSurpriseId)
          ? parsed.lastSurpriseId
          : undefined,
      mistakeBag,
      mistakeCycleHistory,
      lastMistakeCycleOrder,
      mistakeCycleCount:
        typeof parsed.mistakeCycleCount === 'number' ? parsed.mistakeCycleCount : 0,
      lastMistakeId:
        parsed.lastMistakeId && validMistakeSet.has(parsed.lastMistakeId)
          ? parsed.lastMistakeId
          : undefined,
      pervertedDialogueBag,
      pervertedDialogueCycleHistory,
      lastPervertedDialogueCycleOrder,
      pervertedDialogueCycleCount:
        typeof parsed.pervertedDialogueCycleCount === 'number'
          ? parsed.pervertedDialogueCycleCount
          : 0,
      lastPervertedDialogue:
        typeof parsed.lastPervertedDialogue === 'string' &&
        validPervertedDialogues.has(parsed.lastPervertedDialogue)
          ? parsed.lastPervertedDialogue
          : undefined,
      pervertedGifBag,
      pervertedGifCycleHistory,
      lastPervertedGifCycleOrder,
      pervertedGifCycleCount:
        typeof parsed.pervertedGifCycleCount === 'number' ? parsed.pervertedGifCycleCount : 0,
      lastPervertedGifUrl:
        typeof parsed.lastPervertedGifUrl === 'string' &&
        validPervertedGifs.has(parsed.lastPervertedGifUrl)
          ? parsed.lastPervertedGifUrl
          : undefined,
      celebrationGifBag,
      celebrationGifCycleHistory,
      lastCelebrationGifCycleOrder,
      celebrationGifCycleCount:
        typeof parsed.celebrationGifCycleCount === 'number' ? parsed.celebrationGifCycleCount : 0,
      lastCelebrationGifUrl:
        typeof parsed.lastCelebrationGifUrl === 'string' &&
        validCelebrationGifs.has(parsed.lastCelebrationGifUrl)
          ? parsed.lastCelebrationGifUrl
          : undefined,
      surprisePhraseBag,
      surprisePhraseCycleHistory,
      lastSurprisePhraseCycleOrder,
      surprisePhraseCycleCount:
        typeof parsed.surprisePhraseCycleCount === 'number' ? parsed.surprisePhraseCycleCount : 0,
      lastSurprisePhrase:
        typeof parsed.lastSurprisePhrase === 'string' &&
        validSurprisePhrases.has(parsed.lastSurprisePhrase)
          ? parsed.lastSurprisePhrase
          : undefined,
      academyDialogueBag,
      academyDialogueCycleHistory,
      lastAcademyDialogueCycleOrder,
      academyDialogueCycleCount:
        typeof parsed.academyDialogueCycleCount === 'number' ? parsed.academyDialogueCycleCount : 0,
      lastAcademyDialogue:
        typeof parsed.lastAcademyDialogue === 'string' &&
        validAcademyDialogues.has(parsed.lastAcademyDialogue)
          ? parsed.lastAcademyDialogue
          : undefined,
      practiceVideoBag,
      practiceVideoCycleHistory,
      lastPracticeVideoCycleOrder,
      practiceVideoCycleCount:
        typeof parsed.practiceVideoCycleCount === 'number' ? parsed.practiceVideoCycleCount : 0,
      lastPracticeVideoUrl:
        typeof parsed.lastPracticeVideoUrl === 'string' &&
        validPracticeVideos.has(parsed.lastPracticeVideoUrl)
          ? parsed.lastPracticeVideoUrl
          : undefined,
      practiceVideoDateKey:
        typeof parsed.practiceVideoDateKey === 'string' && parsed.practiceVideoDateKey.length > 0
          ? parsed.practiceVideoDateKey
          : fresh.practiceVideoDateKey,
      practiceWinDialogueBag,
      practiceWinDialogueCycleHistory,
      lastPracticeWinDialogueCycleOrder,
      practiceWinDialogueCycleCount:
        typeof parsed.practiceWinDialogueCycleCount === 'number'
          ? parsed.practiceWinDialogueCycleCount
          : 0,
      lastPracticeWinDialogue:
        typeof parsed.lastPracticeWinDialogue === 'string' &&
        validPracticeWinDialogues.has(parsed.lastPracticeWinDialogue)
          ? parsed.lastPracticeWinDialogue
          : undefined,
      mistakeRewardDialogueBag,
      mistakeRewardDialogueCycleHistory,
      lastMistakeRewardDialogueCycleOrder,
      mistakeRewardDialogueCycleCount:
        typeof parsed.mistakeRewardDialogueCycleCount === 'number'
          ? parsed.mistakeRewardDialogueCycleCount
          : 0,
      lastMistakeRewardDialogue:
        typeof parsed.lastMistakeRewardDialogue === 'string' &&
        validMistakeRewardDialogues.has(parsed.lastMistakeRewardDialogue)
          ? parsed.lastMistakeRewardDialogue
          : undefined,
      mistakeRewardDialogueDateKey:
        typeof parsed.mistakeRewardDialogueDateKey === 'string' &&
        parsed.mistakeRewardDialogueDateKey.length > 0
          ? parsed.mistakeRewardDialogueDateKey
          : fresh.mistakeRewardDialogueDateKey,
      currentMistakeRewardDialogue:
        typeof parsed.currentMistakeRewardDialogue === 'string' &&
        validMistakeRewardDialogues.has(parsed.currentMistakeRewardDialogue)
          ? parsed.currentMistakeRewardDialogue
          : fresh.currentMistakeRewardDialogue,
      consecutiveMistakes:
        typeof parsed.consecutiveMistakes === 'number' ? parsed.consecutiveMistakes : 0,
      triggeredTwoMistakesVideo: false,
      nonPervertedStepInCycle:
        typeof parsed.nonPervertedStepInCycle === 'number' ? parsed.nonPervertedStepInCycle : 0,
      randomSurprisePhraseStepIndices: Array.isArray(parsed.randomSurprisePhraseStepIndices)
        ? parsed.randomSurprisePhraseStepIndices
        : fresh.randomSurprisePhraseStepIndices,
      currentAnimationId,
      currentFlavorNote:
        typeof parsed.currentFlavorNote === 'string' && parsed.currentFlavorNote.length > 0
          ? parsed.currentFlavorNote
          : ROSHI_SPRITE_CATALOG[currentAnimationId].flavorNote,
      currentGifUrl:
        typeof parsed.currentGifUrl === 'string' && validPervertedGifs.has(parsed.currentGifUrl)
          ? parsed.currentGifUrl
          : ROSHI_SPRITE_CATALOG[currentAnimationId].gifUrl,
    };
  } catch {
    return fresh;
  }
}

function savePersistedSchedulerState(state: RoshiSchedulerState): void {
  if (typeof window === 'undefined') return;
  const serialized = JSON.stringify(state);
  try {
    if (window.sessionStorage) {
      window.sessionStorage.setItem(SCHEDULER_STORAGE_KEY, serialized);
    }
  } catch {
    // Ignore storage quota errors
  }
  try {
    if (window.localStorage) {
      window.localStorage.setItem(SCHEDULER_STORAGE_KEY, serialized);
    }
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Global singleton store so that as the student moves between lessons, steps,
 * puzzles, and board interactions, the shuffled surprise, mistake, perverted GIF,
 * and celebration GIF bags persist seamlessly across the whole session.
 */
let globalSchedulerState: RoshiSchedulerState = loadPersistedSchedulerState();

export function advanceGlobalRoshiInteraction(
  options?: NextRoshiInteractionOptions
): RoshiSpriteSpec {
  globalSchedulerState = nextRoshiInteraction(globalSchedulerState, options);
  savePersistedSchedulerState(globalSchedulerState);
  const baseSpec = ROSHI_SPRITE_CATALOG[globalSchedulerState.currentAnimationId];
  return {
    ...baseSpec,
    flavorNote: globalSchedulerState.currentFlavorNote || baseSpec.flavorNote,
    gifUrl: globalSchedulerState.currentGifUrl ?? baseSpec.gifUrl,
  };
}

export function didGlobalTriggerTwoMistakesVideo(): boolean {
  return Boolean(globalSchedulerState.triggeredTwoMistakesVideo);
}

export function getGlobalCurrentMistakeRewardDialogue(): string {
  return (
    globalSchedulerState.currentMistakeRewardDialogue || ROSHI_TWO_MISTAKES_FIRST_DAILY_DIALOGUE
  );
}

export function advanceGlobalMistakeRewardDialogue(dateKey?: string): string {
  const { nextState, dialogue } = nextMistakeRewardDialogue(
    globalSchedulerState,
    highEntropyRandom,
    dateKey
  );
  globalSchedulerState = nextState;
  savePersistedSchedulerState(globalSchedulerState);
  return dialogue;
}

export function clearGlobalTwoMistakesVideoTrigger(): void {
  if (!globalSchedulerState.triggeredTwoMistakesVideo) return;
  globalSchedulerState = {
    ...globalSchedulerState,
    triggeredTwoMistakesVideo: false,
  };
  savePersistedSchedulerState(globalSchedulerState);
}

export function resetGlobalConsecutiveMistakes(): void {
  if (
    globalSchedulerState.consecutiveMistakes === 0 &&
    !globalSchedulerState.triggeredTwoMistakesVideo
  ) {
    return;
  }
  globalSchedulerState = {
    ...globalSchedulerState,
    consecutiveMistakes: 0,
    triggeredTwoMistakesVideo: false,
  };
  savePersistedSchedulerState(globalSchedulerState);
}

export function getGlobalConsecutiveMistakes(): number {
  return globalSchedulerState.consecutiveMistakes ?? 0;
}

export function getCurrentGlobalRoshiSpec(): RoshiSpriteSpec {
  const baseSpec = ROSHI_SPRITE_CATALOG[globalSchedulerState.currentAnimationId];
  return {
    ...baseSpec,
    flavorNote: globalSchedulerState.currentFlavorNote || baseSpec.flavorNote,
    gifUrl: globalSchedulerState.currentGifUrl ?? baseSpec.gifUrl,
  };
}

export function advanceGlobalCelebrationGif(): string {
  const { nextState, gifUrl } = nextCelebrationGif(globalSchedulerState);
  globalSchedulerState = nextState;
  savePersistedSchedulerState(globalSchedulerState);
  return gifUrl;
}

export function advanceGlobalPracticeWinReward(
  dateKey?: string
): { videoUrl: string; dialogue: string } {
  const { nextState, videoUrl, dialogue } = nextPracticeWinSpecialVideo(
    globalSchedulerState,
    highEntropyRandom,
    dateKey
  );
  globalSchedulerState = nextState;
  savePersistedSchedulerState(globalSchedulerState);
  return { videoUrl, dialogue };
}

export function advanceGlobalPracticeWinVideo(dateKey?: string): string {
  return advanceGlobalPracticeWinReward(dateKey).videoUrl;
}

/**
 * Returns the exact next Practice Win reward video URL in the daily shuffle queue without consuming it,
 * allowing the app to pre-buffer it into RAM while the player is playing a game on the board.
 */
export function peekNextGlobalPracticeWinVideo(
  dateKey: string = getPracticeDateKey()
): string {
  const prevDateKey = globalSchedulerState.practiceVideoDateKey ?? dateKey;
  const isNewDay = prevDateKey !== dateKey;
  const bag = globalSchedulerState.practiceVideoBag ?? [];
  if (isNewDay || bag.length === 0) {
    return PRACTICE_WIN_FIRST_DAILY_VIDEO_URL;
  }
  return bag[0] ?? PRACTICE_WIN_FIRST_DAILY_VIDEO_URL;
}

export function advanceGlobalAcademyRoshiDialogue(): string {
  const { nextState, dialogue } = nextAcademyRoshiDialogue(globalSchedulerState);
  globalSchedulerState = nextState;
  savePersistedSchedulerState(globalSchedulerState);
  return dialogue;
}

export function getGlobalRoshiInteractionCount(): number {
  return globalSchedulerState.interactionCount;
}

/**
 * Pure helper to strip repeated "Maestro Roshi" / "Roshi" / filler "Enseñanza" mentions
 * from message titles so the card displays a clean, meaningful context subtitle.
 */
export function cleanRoshiTitleText(rawTitle: string): string {
  if (!rawTitle) return 'Consejo del Dojo';
  const cleaned = rawTitle
    .replace(
      /^[¡!]*\s*(?:Saludo|Enseñanza|Reflexión|Indicación|Síntesis|Consejo|Felicitaciones|Mensaje)\s+d(?:el|e)\s+(?:Maestro\s+)?Roshi[!¡]*\s*(?:[·:—-]\s*)?/i,
      ''
    )
    .replace(/^(?:Maestro\s+Roshi|Roshi)\s*(?:[·:—-]\s*)?/i, '')
    .replace(
      /\s*(?:[·:—-]\s*)?(?:(?:Saludo|Enseñanza|Reflexión|Indicación|Síntesis|Consejo|Felicitaciones|Mensaje)\s+)?(?:d(?:el|e)\s+)?(?:Maestro\s+Roshi|Roshi)[!¡]*$/i,
      ''
    )
    .replace(/\s*(?:[·:—-]\s*)?Enseñanza[!¡]*$/i, '')
    .replace(/^Enseñanza\s*(?:[·:—-]\s*)?/i, '')
    .trim();
  return cleaned.length > 0 ? cleaned : 'Consejo del Dojo';
}

/**
 * Pure helper to compute progressive text slice for typewriter animation.
 */
export function getProgressiveTextSlice(fullText: string, visibleChars: number): string {
  if (!fullText) return '';
  if (visibleChars <= 0) return '';
  if (visibleChars >= fullText.length) return fullText;
  return fullText.slice(0, visibleChars);
}

/**
 * Pure helper to compute integer completion percentage (0..100) for the typewriter speech bar.
 */
export function getTypewriterProgressPct(fullText: string, visibleChars: number): number {
  if (!fullText || fullText.length === 0) return 100;
  if (visibleChars <= 0) return 0;
  if (visibleChars >= fullText.length) return 100;
  return Math.min(100, Math.max(0, Math.round((visibleChars / fullText.length) * 100)));
}

/**
 * Pure helper to determine whether the Maestro Roshi Spotlight Overlay should open automatically
 * when an interaction trigger occurs.
 */
export function shouldAutoOpenSpotlightForTrigger(
  previousTrigger: string | null,
  nextTrigger: string,
  autoOpenEnabled: boolean = true
): boolean {
  if (!autoOpenEnabled) return false;
  if (!nextTrigger) return false;
  return previousTrigger !== nextTrigger;
}
