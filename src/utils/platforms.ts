import { Platform } from '../types';

export interface PlatformConfig {
  id: Platform;
  name: string;
  promo: string;
  downloadUrl: string;
  img: string;
  tagline: string;
  accuracy: string;
  latency: string;
}

export const PLATFORMS: Record<Platform, PlatformConfig> = {
  linebet_v2: {
    id: 'linebet_v2',
    name: 'Winwin',
    promo: 'A77N',
    downloadUrl: 'https://refpa49781.com/L?tag=d_3726128m_68383c_&site=3726128&ad=68383',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDBd0TpCQWUvWfxuU9DfJRgEs604mfmOEr0EHZOY0b9w&s=10',
    tagline: 'استقرار ممتاز · تغطية إقليمية',
    accuracy: '٩٦٪',
    latency: '18ms',
  },
  onexbet: {
    id: 'onexbet',
    name: '1xBet',
    promo: 'A77N',
    downloadUrl: 'https://refpa49781.com/L?tag=d_3726128m_68383c_&site=3726128&ad=68383',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD4Yd9OqZQ2rZ8dQ1qzT7dJZ7ZzJ5rQmQ&s=10',
    tagline: 'أكبر سيولة · تغطية عالمية',
    accuracy: '٩٧٪',
    latency: '16ms',
  },
  linebet_v1: {
    id: 'linebet_v1',
    name: 'Greenbet',
    promo: 'A77A',
    downloadUrl: 'https://refpa79184.com/L?tag=d_5936276m_132250c_&site=5936276&ad=132250',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEj5eP5tNE8iMZoLHE9i4q-JYLMiLmHaIMKatrmBePA&s=10',
    tagline: 'دقة عالية · تغطية عالمية',
    accuracy: '٩٨٪',
    latency: '14ms',
  },
};

export const getPlatform = (p: Platform): PlatformConfig =>
  PLATFORMS[p] ?? PLATFORMS.linebet_v2;
