import { Component, Input } from '@angular/core';
import { List } from 'immutable';

import { AudioService } from '../../common/audio.service';

interface Partial {
  frequency: number;
  note: string;
  interval?: number[];
  intervalLabel?: string;
  intervalLink?: string;
}

const CHORD_AMPLITUDES = [1, 0.1, 0.2, 0.5];
const CHORD_AMPLITUDES_WITH_MISSING_FUNDAMENTAL = [0, 0.1, 0.2, 0.5];

@Component({
  selector: 'snd-harmonic-series',
  template: `
    <div class="container">
      <div>
        <div *ngFor="let partial of series; let idx = index">
          <div class="partial">
            <button class="play-frequency" (click)="playPartial(partial)">
              {{ partial.frequency }}Hz ({{ partial.note }})
            </button>
            <span *ngIf="isInChord(idx)"
                  class="chord-connector"></span>
            <span *ngIf="isInChord(idx)"
                  class="chord-corner-connector"
                  [class.hasNext]="isInChord(idx + 1)"
                  [class.hasPrevious]="isInChord(idx - 1)"></span>
          </div>
          <div *ngIf="partial.interval"
              class="interval"
              [class.hasChordIntervalConnector]="isInChord(idx) && isInChord(idx + 1)"
              [style.height.px]="getIntervalHeight(partial)">
            <div class="interval-label">
              <div class="interval-label-connector"></div>
              <div class="interval-label-label">
                {{ getIntervalSignifier(partial) }} - 
                <a [href]="partial.intervalLink">{{ partial.intervalLabel }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="chord" class="play-chord" [style.marginTop.px]="getPlayChordPxFromTop()">
        <div class="play-chord-connector"></div>
        <button (click)="playChord()">Chord</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
    }
    .partial {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .play-frequency {
      flex-grow: 0;
      height: 36px;
      width: 100px;
    }
    .chord-connector {
      flex-grow: 0;
      width: 150px;
      height: 1px;
      border-bottom: 1px solid #ED146F;
    }
    .chord-corner-connector {
      flex-grow: 0;
      width: 1px;
      border-left: 1px solid #ED146F;
    }
    .chord-corner-connector.hasNext {
      height: 18px;
      align-self: flex-end;
    }
    .chord-corner-connector.hasPrevious {
      height: 19px;
      align-self: flex-start;
    }
    .chord-corner-connector.hasNext.hasPrevious {
      height: 36px;
    }
    .interval {
      width: 199px;
      margin-left: 50px;
      border-left: 1px solid #ED146F;
      box-sizing: content-box;
      
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .interval.hasChordIntervalConnector {
      border-right: 1px solid #ED146F;
    }
    .interval-label {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .interval-label-connector {
      flex-grow: 0;
      width: 2em;
      height: 1px;
      border-top: 1px solid #ED146F;
    }
    .interval-label-label {
      flex: 1;
      padding-left: .5em;
    }

    .play-chord {
      height: 36px;
      margin-left: -1px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .play-chord-connector {
      flex-grow: 0;
      width: 2em;
      height: 1px;
      border-top: 1px solid #ED146F;
    }
    .play-chord button {
      flex-grow: 0;
      height: 36px;
      width: 100px;
    }
  `]
})
export class HarmonicSeriesComponent {
  @Input() chord = false;
  @Input() missingFundamental = false;

  baseFrequency = 440;
  series = List.of<Partial>(
    {frequency: this.baseFrequency,                             note: 'A4',  interval: [2, 1], intervalLabel: 'octave', intervalLink: 'https://en.wikipedia.org/wiki/Octave'},
    {frequency: this.baseFrequency * 2,                         note: 'A5',  interval: [3, 2], intervalLabel: 'perfect fifth', intervalLink: 'https://en.wikipedia.org/wiki/Perfect_fifth'},
    {frequency: this.baseFrequency * 2 * 3/2,                   note: 'E6',  interval: [4, 3], intervalLabel: 'perfect fourth', intervalLink: 'https://en.wikipedia.org/wiki/Perfect_fourth'},
    {frequency: this.baseFrequency * 2 * 3/2 * 4/3,             note: 'A6',  interval: [5, 4], intervalLabel: 'major third', intervalLink: 'https://en.wikipedia.org/wiki/Major_third'},
    {frequency: this.baseFrequency * 2 * 3/2 * 4/3 * 5/4,       note: 'C#7', interval: [6, 5], intervalLabel: 'minor third', intervalLink: 'https://en.wikipedia.org/wiki/Minor_third'},
    {frequency: this.baseFrequency * 2 * 3/2 * 4/3 * 5/4 * 6/5, note: 'E7'}
  );
  sumOfIntervals = this.series
    .map(p => p.interval || [0, 1])
    .reduce((s, i) => s + i[0] / i[1], 0);

  constructor(private audio: AudioService) { }
  
  isInChord(idx: number) {
    return idx >= 0 && idx <= this.getChordAmplitudes().length - 1 && this.getChordAmplitudes()[idx] > 0;
  }

  playPartial(partial: Partial) {
    this.audio.playSineWave(partial.frequency, 1);
  }

  playChord() {
    this.getChordAmplitudes().forEach((amp, i) => {
      const partial = this.series.get(i);
      const gain = this.audio.getConnectedGain(amp);
      const osc = this.audio.getSinewaveOscillator(partial.frequency);
      osc.connect(gain);
      osc.stop(this.audio.getCurrentTime() + 1);
    });
  }

  getChordAmplitudes() {
    if (this.chord) {
      if (this.missingFundamental) {
        return CHORD_AMPLITUDES_WITH_MISSING_FUNDAMENTAL;
      } else {
        return CHORD_AMPLITUDES;
      }
    }
    return [];
  }

  getIntervalHeight(partial: Partial) {
    const fractional = partial.interval[0] / partial.interval[1] / this.sumOfIntervals;
    return fractional * 500;
  }

  getIntervalSignifier(partial: Partial) {
    return `${partial.interval[0]}/${partial.interval[1]}`;
  }

  getPlayChordPxFromTop() {
    const fromTop = 0.5 * CHORD_AMPLITUDES
      .map((amp, i) => this.series.get(i))
      .map(partial => this.getIntervalHeight(partial) + 18)
      .reduce((sum, h) => sum + h, 0);
    if (this.missingFundamental) {
      return fromTop + this.getIntervalHeight(this.series.first()) / 2;
    } else {
      return fromTop;
    }
  }
}