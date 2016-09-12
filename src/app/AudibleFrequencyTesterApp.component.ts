import { Component, ElementRef } from '@angular/core';
import { ControlledPlayerComponent } from './components/ControlledPlayer.component';
import { OscilloscopeComponent } from './components/Oscilloscope.component';
import { AudioService } from './audio.service';
import { SinewavePlayer } from './SineWavePlayer.service';

@Component({
  selector: 'snd-audible-frequency-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `,
  directives: [ControlledPlayerComponent, OscilloscopeComponent],
  providers: [AudioService, SinewavePlayer]
})
export class AudibleFrequencyTesterAppComponent {
  analyser: AnalyserNode;

  constructor(public player: SinewavePlayer, audio: AudioService) {  
    this.analyser = audio.getAnalyser(2048);
    player.analyseWith(this.analyser);
  }

}