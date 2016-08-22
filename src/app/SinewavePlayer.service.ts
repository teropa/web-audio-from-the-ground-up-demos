import { Injectable } from '@angular/core';
import { SoundPlayer } from './SoundPlayer';
import { AudioService } from './audio.service';

@Injectable()
export class SinewavePlayer implements SoundPlayer {
  controlValueUnit = 'Hz';
  controlValueMin = 5;
  controlValueMax = 25000;
  controlValueStep = 1;

  private osc: OscillatorNode;
  private frequency = 440;

  constructor(private audio: AudioService) {    
  }

  start() {
    this.osc = this.audio.getConnectedSinewaveOscillator(this.frequency);
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
    return this.frequency;
  }

  set controlValue(c) {
    this.frequency = c;
    if (this.osc) {
      this.osc.frequency.value = c;
    }
  }

}