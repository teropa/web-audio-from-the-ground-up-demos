import { Component } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'snd-audible-frequency-tester',
  template: `
    <button (click)="startStop()">{{ getStartStopLabel() }}</button>
    <input type="range" [(ngModel)]="frequency" (ngModelChange)="onFrequencyChange()" min="15" max="25000" step="1">
  `
})
export class AudibleFrequencyTesterComponent {
  frequency = 440;
  osc: OscillatorNode;

  constructor(private audio: AudioService) {
  }

  startStop() {
    if (this.osc) {
      this.osc.stop();
      this.osc = null;
    } else {
      this.osc = this.audio.getSinewaveOscillator(this.frequency);
    }
  }

  getStartStopLabel() {
    return this.osc ? 'Stop' : 'Play';
  }

  onFrequencyChange() {
    console.log('chg', this.frequency);
    if (this.osc) {
      this.osc.frequency.value = this.frequency;
    }
  }

}