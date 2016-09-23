import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { List, Range } from 'immutable';

@Component({
  selector: 'snd-pitch-frequency-scale',
  template: `
    <div class="tone-buttons">
      <snd-tone-button
        *ngFor="let note of notes"
        [note]=note>
      </snd-tone-button>
    </div>
    <snd-curve
      [height]="175"
      [values]="interpolateCurveValues()"
      [maxValueCount]="interpolateCurveValues().size"
      [rangeMin]="notes.first().frequency"
      [rangeMax]="notes.last().frequency"
      [drawAxis]=false>
    </snd-curve>
  `,
  styles: [`
    :host { display: block; }
    snd-curve {
      display: block;
    }
    .tone-buttons {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PitchFrequencyScaleComponent {
  @Input() notes: List<{frequency: number, note: string}>;
  @Input() noteScale: number;

  private interpolateCurveValues() {
    const minFreq = this.notes.first().frequency;
    return Range(0, (this.notes.size - 1) * this.noteScale)
      .map(step => minFreq * Math.pow(2, step/12));
  }
}