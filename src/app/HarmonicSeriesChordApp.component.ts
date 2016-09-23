import { Component } from '@angular/core';
import { HarmonicSeriesComponent } from './components/HarmonicSeries.component'; 
import { AudioService } from './audio.service.ts';

@Component({
  selector: 'snd-harmonic-series-chord-app',
  template: `
    <snd-harmonic-series [chord]=true></snd-harmonic-series>
  `,
  directives: [
    HarmonicSeriesComponent
  ],
  providers: [AudioService]
})
export class HarmonicSeriesChordAppComponent {
}