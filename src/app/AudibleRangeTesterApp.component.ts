import { Component, ElementRef } from '@angular/core';
import { ControlledPlayerComponent } from './components/ControlledPlayer.component';
import { AudioService } from './audio.service';
import { SinewaveWithGainPlayer } from './SineWaveWithGainPlayer.service';

@Component({
  selector: 'snd-audible-range-tester-app',
  template: `
    <snd-controlled-player [player]=player>
    </snd-controlled-player>
  `,
  directives: [ControlledPlayerComponent],
  providers: [AudioService, SinewaveWithGainPlayer]
})
export class AudibleRangeTesterAppComponent {

  constructor(public player: SinewaveWithGainPlayer) {
  }

}