import { Component } from '@angular/core';
import { OctaveToneButtonsComponent } from './components/OctaveToneButtons.component'; 
import { AudioService } from './audio.service.ts';

import '../../public/css/styles.css';

@Component({
  selector: 'snd-octave-pitch-buttons-app',
  template: `
    <snd-octave-tone-buttons>
    </snd-octave-tone-buttons>
  `,
  styleUrls: ['./app.component.css'],
  directives: [
    OctaveToneButtonsComponent
  ],
  providers: [AudioService]
})
export class OctavePitchButtonsAppComponent {

}