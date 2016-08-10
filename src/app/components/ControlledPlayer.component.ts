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
      <span class="lbl">{{ player.controlValue }}{{ player.controlValueUnit }}</span>
    </label>
  `,
  styles: [`
    :host {
      display: flex;
    }
    button {
      flex: 1;
    }
    label {
      flex: 4;
      text-align: right;
    }
    input {
      width: calc(100% - 130px);
    }
    .lbl {
      display: inline-block;
      min-width: 75px;
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