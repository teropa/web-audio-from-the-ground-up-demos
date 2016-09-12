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
    oscillator.start();
    return oscillator;
  }

  getConnectedSinewaveOscillator(frequency: number) {
    const oscillator = this.getSinewaveOscillator(frequency);
    oscillator.connect(this.audioCtx.destination);
    return oscillator;
  }

  getGain(gain: number) {
    const node = this.audioCtx.createGain();
    node.gain.value = gain;
    return node;    
  }

  getConnectedGain(gain: number) {
    const node = this.getGain(gain);
    node.connect(this.audioCtx.destination);
    return node;
  }

  getAnalyser(fftSize = 2048) {
    const node = this.audioCtx.createAnalyser();
    node.fftSize = fftSize;
    return node;
  }

  getHardLimiter() {
    const limiter = this.audioCtx.createScriptProcessor(4096, 1, 1);
    limiter.onaudioprocess = (evt) => {
      for (let ch = 0 ; ch < evt.outputBuffer.numberOfChannels ; ch++) {
        let inputData = evt.inputBuffer.getChannelData(ch);
        let outputData = evt.outputBuffer.getChannelData(ch);
        for (let sample = 0 ; sample < inputData.length ; sample++) {
          outputData[sample] = Math.min(1, Math.max(-1, inputData[sample]));
        }
      }
    }
    return limiter;
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

  toMaster(node: AudioNode) {
    node.connect(this.audioCtx.destination);
  }

}