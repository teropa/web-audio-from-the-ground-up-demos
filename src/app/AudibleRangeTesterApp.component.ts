import { Component, ElementRef } from '@angular/core';
import { ControlledPlayerComponent } from './components/ControlledPlayer.component';
import { OscilloscopeComponent } from './components/Oscilloscope.component';
import { AudioService } from './audio.service';
import { SinewaveWithGainPlayer } from './SineWaveWithGainPlayer.service';

@Component({
  selector: 'snd-audible-range-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `,
  directives: [ControlledPlayerComponent, OscilloscopeComponent],
  providers: [AudioService, SinewaveWithGainPlayer]
})
export class AudibleRangeTesterAppComponent {
  analyser: AnalyserNode;

  constructor(public player: SinewaveWithGainPlayer, audio: AudioService) {
    this.analyser = audio.getAnalyser();
    this.player.analyseWith(this.analyser);
  }

}