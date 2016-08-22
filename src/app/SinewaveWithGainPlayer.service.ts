import { Injectable } from '@angular/core';
import { SoundPlayer } from './SoundPlayer';
import { AudioService } from './audio.service';

@Injectable()
export class SinewaveWithGainPlayer implements SoundPlayer {
  controlValueUnit = '';
  controlValueMin = 0;
  controlValueMax = 1;
  controlValueStep = 0.01;

  private osc: OscillatorNode;
  private gain: GainNode;
  private gainValue = 1;

  constructor(private audio: AudioService) {    
  }

  start() {
    this.osc = this.audio.getSinewaveOscillator(440);
    this.gain = this.audio.getConnectedGain(this.gainValue);
    this.osc.connect(this.gain);
  }

  stop() {
    if (this.osc) {
      this.osc.stop();
      this.osc = null;
    }
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