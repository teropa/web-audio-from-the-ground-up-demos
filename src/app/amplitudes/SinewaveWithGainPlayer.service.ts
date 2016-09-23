import { Injectable } from '@angular/core';
import { SoundPlayer } from '../common/SoundPlayer';
import { AudioService } from '../common/audio.service';

@Injectable()
export class SinewaveWithGainPlayer implements SoundPlayer {
  controlValueUnit = '';
  controlValueMin = 0;
  controlValueMax = 1;
  controlValueStep = 0.01;

  private osc: OscillatorNode;
  private gain: GainNode;
  private compressor: AudioNode;
  private analyser: AnalyserNode;
  private gainValue = 1;

  constructor(private audio: AudioService) {    
  }

  start() {
    this.osc = this.audio.getSinewaveOscillator(440);
    this.gain = this.audio.getGain(this.gainValue);
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
    return this.gainValue;
  }

  set controlValue(c) {
    this.gainValue = c;
    if (this.gain) {
      this.gain.gain.value = c;
    }
  }

}