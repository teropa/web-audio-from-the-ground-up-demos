import { Component, ElementRef } from '@angular/core';
import { ControlledPlayerComponent } from './components/ControlledPlayer.component';
import { OscilloscopeComponent } from './components/Oscilloscope.component';
import { AudioService } from './audio.service';
import { SinewaveWithDecibelControlPlayer } from './SineWaveWithDecibelControlPlayer.service';

@Component({
  selector: 'snd-amplitude-decibel-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `,
  directives: [ControlledPlayerComponent, OscilloscopeComponent],
  providers: [AudioService, SinewaveWithDecibelControlPlayer]
})
export class AmplitudeDecibelTesterAppComponent {
  analyser: AnalyserNode;

  constructor(public player: SinewaveWithDecibelControlPlayer, audio: AudioService) {
    this.analyser = audio.getAnalyser(2048);
    player.compressWith(audio.getHardLimiter());
    player.analyseWith(this.analyser);
  }

}