import { Component } from '@angular/core';
import { List } from 'immutable';

@Component({
  selector: 'snd-frequency-curve-two-joined-ramps-app',
  template: `
    <snd-xy-curve
      [height]="100"
      [values]="values">
    </snd-xy-curve>
  `,
  styles: [`
    :host { display: block; }
    snd-xy-curve { display: block; }
  `]
})
export class FrequencyCurveTwoJoinedRampsAppComponent {
  values = List.of(
    {x: 0, y: 440},
    {x: 1, y: 440},
    {x: 2, y: 440 * Math.pow(2, 1/12)},
    {x: 4, y: 440 * Math.pow(2, 2/12)},
    {x: 5, y: 440 * Math.pow(2, 2/12)}
  );
}