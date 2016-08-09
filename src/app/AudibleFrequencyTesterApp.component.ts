import { Component, ElementRef } from '@angular/core';
import { ControlledPlayerComponent } from './components/ControlledPlayer.component';
import { AudioService } from './audio.service';
import { SinewavePlayer } from './SineWavePlayer.service';

@Component({
  selector: 'snd-audible-frequency-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
  `,
  directives: [ControlledPlayerComponent],
  providers: [AudioService, SinewavePlayer]
})
export class AudibleFrequencyTesterAppComponent {

  constructor(public player: SinewavePlayer) {
  }

}