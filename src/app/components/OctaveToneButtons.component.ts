import { Component } from '@angular/core';
import { List } from 'immutable';
import { ToneButtonComponent } from './ToneButton.component';
import { CurveComponent } from './Curve.component';

@Component({
  selector: 'snd-octave-tone-buttons',
  template: `
    <snd-tone-button
      *ngFor="let note of notes"
      [note]=note>
    </snd-tone-button>
    <snd-curve
      [width]="800"
      [height]="200"
      [values]="getCurveValues()"
      [maxValueCount]="getCurveValues().size"
      [rangeMin]="440 / 2 / 2 / 2"
      [rangeMax]="440 * 2 * 2 * 2 * 2 * 2">
    </snd-curve>
  `,
  directives: [ToneButtonComponent, CurveComponent]
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

  getCurveValues() {
    return this.notes.map(n => n.frequency);
  }
}