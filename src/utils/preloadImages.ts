import { PLATFORMS } from './platforms';

// Local bundled assets
import eagleLogo from '../assets/eagle-logo.png';
import logoApple from '../assets/logo-apple.png';
import logoCrash from '../assets/logo-crash.png';
import condInstall from '../assets/cond-install.png';
import condPromo from '../assets/cond-promo.png';
import condDeposit from '../assets/cond-deposit.png';
import condTelegram from '../assets/cond-telegram.png';
import condVerify from '../assets/cond-verify.png';
import neonInstall from '../assets/neon-install.png';
import neonPromo from '../assets/neon-promo.png';
import neonDeposit from '../assets/neon-deposit.png';
import neonTelegram from '../assets/neon-telegram.png';
import neonVerify from '../assets/neon-verify.png';

import cellTile from '../assets/cell-tile.png';
import appleGood from '../assets/apple-good.png';
import appleBad from '../assets/apple-bad.png';

export const REMOTE_IMAGES: string[] = [cellTile, appleGood, appleBad];

export const ALL_IMAGES: string[] = [
  eagleLogo,
  logoApple,
  logoCrash,
  condInstall,
  condPromo,
  condDeposit,
  condTelegram,
  condVerify,
  neonInstall,
  neonPromo,
  neonDeposit,
  neonTelegram,
  neonVerify,
  ...REMOTE_IMAGES,
  ...Object.values(PLATFORMS)
    .map((p) => p.img)
    .filter(Boolean),
];

// Keep strong references so the browser never evicts the decoded images.
const cache: HTMLImageElement[] = [];

const loadOne = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    cache.push(img);
    if (img.complete) {
      resolve();
      return;
    }
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });

let started: Promise<void> | null = null;

export const preloadAllImages = (): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve();
  if (!started) {
    started = Promise.all(ALL_IMAGES.map(loadOne)).then(() => undefined);
  }
  return started;
};

export const getCachedImages = () => cache;
