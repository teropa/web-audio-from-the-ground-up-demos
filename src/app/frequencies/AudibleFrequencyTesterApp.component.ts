import { Component, ElementRef } from '@angular/core';
import { AudioService } from '../common/audio.service';
import { SinewavePlayer } from './SinewavePlayer.service';

@Component({
  selector: 'snd-audible-frequency-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
    <snd-oscilloscope [analyser]="analyser" [height]=300>
    </snd-oscilloscope>
  `
})
export class AudibleFrequencyTesterAppComponent {
  analyser: AnalyserNode;

  constructor(public player: SinewavePlayer, audio: AudioService) {  
    this.analyser = audio.getAnalyser(2048);
    player.analyseWith(this.analyser);
  }

}