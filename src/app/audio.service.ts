import { Injectable, Inject } from '@angular/core';


// Augmenting TypeScript's obsolete Web Audio types
interface FixedAudioContext extends AudioContext {
  decodeAudioData: (a: ArrayBuffer) => Promise<AudioBuffer>
}


@Injectable()
export class AudioService {

  constructor(@Inject('audioCtx') private audioCtx: FixedAudioContext) {
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

  getBuffer(url: string) {
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => this.audioCtx.decodeAudioData(buf))
      .catch(e => console.error(e));
  }

  getBufferSource(buf: AudioBuffer) {
    const source = this.audioCtx.createBufferSource();
    source.buffer = buf;
    source.connect(this.audioCtx.destination);
    source.start();
    return source;
  }

}