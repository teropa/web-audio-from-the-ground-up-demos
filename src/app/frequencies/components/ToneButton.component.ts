import { Component, Input } from '@angular/core';
import * as numeral from 'numeral';
import { AudioService } from '../../common/audio.service';

@Component({
  selector: 'snd-tone-button',
  template: `
    <button class="tone-button" md-raised-button (click)="playTone()">
      {{ note.note }}
      <div class="freq">({{ getFrequency() }}Hz)</div>
    </button>
  `,
  styles: [`
    button.tone-button {
      min-width: 0;
      padding: 0 3px;
    }
    .freq {
      margin-top: -20px;
      font-size: 0.5rem;
    }
  `]
})
export class ToneButtonComponent {
  @Input() note: {note: string, frequency: number}

  constructor(private audio: AudioService) {
  }

  playTone() {
    this.audio.playSineWave(this.note.frequency, 1);
  }

  getFrequency() {
    return numeral(this.note.frequency).format('0.0')
  }

}