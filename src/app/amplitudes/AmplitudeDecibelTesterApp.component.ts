import { Component, ElementRef } from '@angular/core';
import { AudioService } from '../common/audio.service';
import { SinewaveWithDecibelControlPlayer } from './SinewaveWithDecibelControlPlayer.service';

@Component({
  selector: 'snd-amplitude-decibel-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `
})
export class AmplitudeDecibelTesterAppComponent {
  analyser: AnalyserNode;

  constructor(public player: SinewaveWithDecibelControlPlayer, audio: AudioService) {
    this.analyser = audio.getAnalyser(2048);
    player.compressWith(audio.getHardLimiter());
    player.analyseWith(this.analyser);
  }

}