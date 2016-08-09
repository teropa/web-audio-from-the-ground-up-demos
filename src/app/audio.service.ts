import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AudioService {

  constructor(@Inject('audioCtx') private audioCtx: AudioContext) {
  }

  getCurrentTime() {
    return this.audioCtx.currentTime;
  }

  playSineWave(frequency: number, duration: number) {
    const oscillator = this.audioCtx.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.connect(this.audioCtx.destination);
    oscillator.start(this.getCurrentTime());
    oscillator.stop(this.getCurrentTime() + duration);
  }

  getSinewaveOscillator(frequency: number) {
    const oscillator = this.audioCtx.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.connect(this.audioCtx.destination);
    oscillator.start();
    return oscillator;
  }

}