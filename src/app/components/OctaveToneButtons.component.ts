import { Component, ChangeDetectionStrategy } from '@angular/core';
import { List, Range } from 'immutable';
import { ToneButtonComponent } from './ToneButton.component';
import { CurveComponent } from './Curve.component';

@Component({
  selector: 'snd-octave-tone-buttons',
  template: `
    <div class="tone-buttons">
      <snd-tone-button
        *ngFor="let note of notes"
        [note]=note>
      </snd-tone-button>
    </div>
    <snd-curve
      [height]="200"
      [values]="curveValues"
      [maxValueCount]="curveValues.size"
      [rangeMin]="440 / 2 / 2 / 2"
      [rangeMax]="440 * 2 * 2 * 2 * 2 * 2"
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
  directives: [ToneButtonComponent, CurveComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OctaveToneButtonsComponent {
  notes = List.of(
    {note: 'A1', frequency: 440 / 2 / 2 / 2},
    {note: 'A2', frequency: 440 / 2 / 2},
    {note: 'A3', frequency: 440  / 2},
    {note: 'A4', frequency: 440},
    {note: 'A5', frequency: 440 * 2},
    {note: 'A6', frequency: 440 * 2 * 2},
    {note: 'A7', frequency: 440 * 2 * 2 * 2},
    {note: 'A8', frequency: 440 * 2 * 2 * 2 * 2},
    {note: 'A9', frequency: 440 * 2 * 2 * 2 * 2 * 2}
  )
  curveValues = this.interpolateCurveValues();
 
  private interpolateCurveValues() {
    const minFreq = this.notes.first().frequency;
    return Range(0, (this.notes.size - 1) * 12)
      .map(step => minFreq * Math.pow(2, step/12));
  }
}