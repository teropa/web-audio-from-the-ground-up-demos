import { Component, ElementRef } from '@angular/core';
import { AudioService } from '../common/audio.service';
import { SinewaveWithGainPlayer } from './SinewaveWithGainPlayer.service';

@Component({
  selector: 'snd-audible-range-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `
})
export class AudibleRangeTesterAppComponent {
  analyser: AnalyserNode;

  constructor(public player: SinewaveWithGainPlayer, audio: AudioService) {
    this.analyser = audio.getAnalyser();
    this.player.analyseWith(this.analyser);
  }

}