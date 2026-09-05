
export type ViewState = 'splash' | 'platform_selection' | 'settings' | 'game_selection' | 'apple_game' | 'crash_game' | 'info';

export type SelectedGame = 'apple' | 'crash';

export type Platform = 'linebet_v1' | 'linebet_v2';

export type Language = 'en' | 'ar';

export enum GameState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  PREDICTED = 'PREDICTED'
}

export interface PredictionResult {
  path: number[];
  confidence: number;
  analysis: string;
  id: string;
  timestamp: number;
  gridData?: boolean[][];
}

export interface AccessKey {
  key: string;
  expiresAt: number;
}
