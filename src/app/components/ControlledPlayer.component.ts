import { Component, Input } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { SoundPlayer } from '../SoundPlayer';

@Component({
  selector: 'snd-controlled-player',
  template: `
    <button md-raised-button (click)="startStop()">{{ getStartStopLabel() }}</button>
    <label>
      <input type="range"
             [(ngModel)]="player.controlValue"
             [min]="player.controlValueMin"
             [max]="player.controlValueMax"
             [step]="player.controlValueStep">
      {{ player.controlValue }}{{ player.controlValueUnit }}
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
export class ControlledPlayerComponent {
  @Input() player: SoundPlayer;

  startStop() {
    if (this.player.playing) {
      this.player.stop();
    } else {
      this.player.start();
    }
  }

  getStartStopLabel() {
    return this.player.playing ? 'Stop' : 'Play';
  }

}