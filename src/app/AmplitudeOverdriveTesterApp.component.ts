import { Component, ElementRef } from '@angular/core';
import { ControlledPlayerComponent } from './components/ControlledPlayer.component';
import { OscilloscopeComponent } from './components/Oscilloscope.component';
import { AudioService } from './audio.service';
import { SinewaveWithGainPlayer } from './SineWaveWithGainPlayer.service';

@Component({
  selector: 'snd-amplitude-overdrive-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `,
  directives: [ControlledPlayerComponent, OscilloscopeComponent],
  providers: [AudioService, SinewaveWithGainPlayer]
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