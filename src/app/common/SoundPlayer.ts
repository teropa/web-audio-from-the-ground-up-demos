export interface SoundPlayer {
  start(): void;
  stop(): void;
  analyseWith(analyser: AnalyserNode): void;

  playing: boolean;

  controlValueUnit: string;
  controlValue: number;
  controlValueMin: number;
  controlValueMax: number;
  controlValueStep: number;
}