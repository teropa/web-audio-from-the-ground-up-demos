import { Injectable } from '@angular/core';
import { SoundPlayer } from '../common/SoundPlayer';
import { AudioService } from '../common/audio.service';

@Injectable()
export class SinewaveWithDecibelControlPlayer implements SoundPlayer {
  controlValueUnit = 'dBFS';
  controlValueMin = -30;
  controlValueMax = 0;
  controlValueStep = 3;

  private osc: OscillatorNode;
  private gain: GainNode;
  private compressor: AudioNode;
  private analyser: AnalyserNode;
  private decibelValue = 0;

  constructor(private audio: AudioService) {    
  }

  start() {
    this.osc = this.audio.getSinewaveOscillator(440);
    this.gain = this.audio.getGain(this.getGain(this.decibelValue));
    this.osc.connect(this.gain);
    if (this.compressor) {
      this.gain.connect(this.compressor);
      this.audio.toMaster(this.compressor);
      if (this.analyser) {
        this.compressor.connect(this.analyser);
      }
    } else {
      this.audio.toMaster(this.gain);
      if (this.analyser) {
        this.gain.connect(this.analyser);
      }
    }
  }

  stop() {
    if (this.osc) {
      this.osc.stop();
      this.gain.disconnect();
      this.osc = null;
      this.gain = null;
    }
  }

  analyseWith(analyser: AnalyserNode) {
    this.analyser = analyser;
    if (this.gain) {
      this.gain.connect(this.analyser);
    }
  }

  compressWith(compressor: AudioNode) {
    this.compressor = compressor;
  }

  get playing() {
    return !!this.osc;
  }

  get controlValue() {
    return this.decibelValue;
  }

  set controlValue(c) {
    this.decibelValue = c;
    if (this.gain) {
      this.gain.gain.value =this.getGain(c);
    }
  }

  private getGain(decibels: number) {
    return Math.pow(10, decibels / 20);
  }

}