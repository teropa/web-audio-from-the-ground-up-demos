import { Component, Input } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'snd-tone-button',
  template: `
    <button (click)="playTone()">
      {{ note.note }} ({{ note.frequency }}Hz)
    </button>
  `
})
export class ToneButtonComponent {
  @Input() note: {note: string, frequency: number}

  constructor(private audio: AudioService) {
  }

  playTone() {
    this.audio.playSineWave(this.note.frequency, 1);
  }

}