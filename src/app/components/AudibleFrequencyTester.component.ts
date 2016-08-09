import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AudioService } from '../audio.service';

@Component({
  selector: 'snd-audible-frequency-tester',
  template: `
    <button md-raised-button (click)="startStop()">{{ getStartStopLabel() }}</button>
    <label>
      <input type="range" [(ngModel)]="frequency" (ngModelChange)="onFrequencyChange()" min="5" max="25000" step="1">
      {{ frequency }} Hz
    </label>
  `,
  styles: [`
    :host {
      display: block;
    }
    input[type=range] {
      width: calc(100% - 200px);
    }
  `],
  directives: [MD_BUTTON_DIRECTIVES]
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