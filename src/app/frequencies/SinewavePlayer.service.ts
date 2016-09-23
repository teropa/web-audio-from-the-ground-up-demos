import { Injectable } from '@angular/core';
import { SoundPlayer } from '../common/SoundPlayer';
import { AudioService } from '../common/audio.service';

@Injectable()
export class SinewavePlayer implements SoundPlayer {
  controlValueUnit = 'Hz';
  controlValueMin = 5;
  controlValueMax = 22050;
  controlValueStep = 1;

  private osc: OscillatorNode;
  private analyser: AnalyserNode;
  private frequency = 440;

  constructor(private audio: AudioService) {    
  }

  start() {
    this.osc = this.audio.getConnectedSinewaveOscillator(this.frequency);
    if (this.analyser) {
      this.osc.connect(this.analyser);
    }
  }

  stop() {
    if (this.osc) {
      this.osc.stop();
      this.osc.disconnect();
      this.osc = null;
    }
  }

  analyseWith(analyser: AnalyserNode) {
    this.analyser = analyser;
    if (this.osc) {
      this.osc.connect(analyser);
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