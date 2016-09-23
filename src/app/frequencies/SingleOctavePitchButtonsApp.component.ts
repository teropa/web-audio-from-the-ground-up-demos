import { Component } from '@angular/core';
import { List } from 'immutable';


@Component({
  selector: 'snd-single-octave-pitch-buttons-app',
  template: `
    <snd-pitch-frequency-scale [notes]=notes [noteScale]=1>
    </snd-pitch-frequency-scale>
  `,
})
export class SingleOctavePitchButtonsAppComponent {
  notes = List.of(
    {note: 'C',  frequency: 440 * Math.pow(2, -9/12)},
    {note: 'C#', frequency: 440 * Math.pow(2, -8/12)},
    {note: 'D',  frequency: 440 * Math.pow(2, -7/12)},
    {note: 'D#', frequency: 440 * Math.pow(2, -6/12)},
    {note: 'E',  frequency: 440 * Math.pow(2, -5/12)},
    {note: 'F',  frequency: 440 * Math.pow(2, -4/12)},
    {note: 'F#', frequency: 440 * Math.pow(2, -3/12)},
    {note: 'G',  frequency: 440 * Math.pow(2, -2/12)},
    {note: 'G#', frequency: 440 * Math.pow(2, -1/12)},
    {note: 'A',  frequency: 440 },
    {note: 'A#',  frequency: 440 * Math.pow(2, 1/12)},
    {note: 'B',  frequency: 440 * Math.pow(2, 2/12)},
    {note: 'C\'',  frequency: 440 * Math.pow(2, 3/12)}
  )
}