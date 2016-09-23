import { Component, ElementRef } from '@angular/core';
import { AudioService } from '../common/audio.service';
import { SinewaveWithGainPlayer } from './SinewaveWithGainPlayer.service';

@Component({
  selector: 'snd-amplitude-overdrive-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `,
  providers: [ SinewaveWithGainPlayer ] // Own provider to not mess with other apps using same service
})
export class AmplitudeOverdriveTesterAppComponent {
  analyser: AnalyserNode;

  constructor(public player: SinewaveWithGainPlayer, audio: AudioService) {
    player.controlValueMax = 5;
    this.analyser = audio.getAnalyser(2048);
    player.compressWith(audio.getHardLimiter());
    player.analyseWith(this.analyser);
  }

}