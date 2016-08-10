import { Component, Input } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { AudioService } from '../audio.service';

@Component({
  selector: 'snd-tone-button',
  template: `
    <button md-raised-button (click)="playTone()">
      {{ note.note }}
      <div class="freq">({{ note.frequency }}Hz)</div>
    </button>
  `,
  styles: [`
    .freq {
      margin-top: -20px;
      font-size: 0.6rem;
    }
  `],
  directives: [ MD_BUTTON_DIRECTIVES ]
})
export class ToneButtonComponent {
  @Input() note: {note: string, frequency: number}

  constructor(private audio: AudioService) {
  }

  playTone() {
    this.audio.playSineWave(this.note.frequency, 1);
  }

}