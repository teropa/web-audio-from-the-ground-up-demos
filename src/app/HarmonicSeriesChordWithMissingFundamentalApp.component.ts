import { Component } from '@angular/core';
import { HarmonicSeriesComponent } from './components/HarmonicSeries.component'; 
import { AudioService } from './audio.service.ts';

@Component({
  selector: 'snd-harmonic-series-chord-with-missing-fundamental-app',
  template: `
    <snd-harmonic-series [chord]=true [missingFundamental]=true></snd-harmonic-series>
  `,
  directives: [
    HarmonicSeriesComponent
  ],
  providers: [AudioService]
})
export class HarmonicSeriesChordWithMissingFundamentalAppComponent {
}