import { Component, OnInit } from '@angular/core'
import { AudioService } from '../common/audio.service';
import { SamplePlayer } from './SamplePlayer.service';

const sample = require('../../samples/alphabet.mp3');

@Component({
  selector: 'snd-chipmunk-stretcher-app',
  template: `
    <snd-controlled-player [player]="player">
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `
})
export class ChipmunkStretcherAppComponent implements OnInit {
  analyser: AnalyserNode;

  constructor(public player: SamplePlayer, private audio: AudioService) {
    this.analyser = this.audio.getAnalyser();
    this.player.analyseWith(this.analyser);
  }

  ngOnInit() {
    this.audio.getBuffer(sample)
      .then(buf => {
        this.player.init(buf)
      });
  }
}