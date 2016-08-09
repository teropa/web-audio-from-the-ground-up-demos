export interface SoundPlayer {
  start(): void
  stop(): void

  playing: boolean;

  controlValueUnit: string;
  controlValue: number;
  controlValueMin: number;
  controlValueMax: number;
  controlValueStep: number;
}