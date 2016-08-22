import { Component, OnInit } from '@angular/core'
import { AudioService } from './audio.service';
import { SamplePlayer } from './SamplePlayer.service';
import { ControlledPlayerComponent } from './components/ControlledPlayer.component';

const sample = require('../samples/alphabet.mp3');

@Component({
  selector: 'snd-chipmunk-stretcher-app',
  template: `
    <snd-controlled-player [player]="player">
    </snd-controlled-player>
  `,
  providers: [AudioService, SamplePlayer],
  directives: [ControlledPlayerComponent]
})
export class ChipmunkStretcherAppComponent implements OnInit {

  constructor(public player: SamplePlayer, private audio: AudioService) {
  }

  ngOnInit() {
    this.audio.getBuffer(sample)
      .then(buf => {
        this.player.init(buf)
      });
  }
}