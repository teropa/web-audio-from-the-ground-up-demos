import { Component } from '@angular/core';
import { List } from 'immutable';

@Component({
  selector: 'snd-octave-pitch-buttons-app',
  template: `
    <snd-pitch-frequency-scale [notes]=notes [noteScale]=12>
    </snd-pitch-frequency-scale>
  `
})
export class OctavePitchButtonsAppComponent {
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
}