import { Component } from '@angular/core';

@Component({
  selector: 'snd-harmonic-series-chord-with-missing-fundamental-app',
  template: `
    <snd-harmonic-series [chord]=true [missingFundamental]=true></snd-harmonic-series>
  `
})
export class HarmonicSeriesChordWithMissingFundamentalAppComponent {
}