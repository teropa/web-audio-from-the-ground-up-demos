import { Component } from '@angular/core';
import { List, Range } from 'immutable';

@Component({
  selector: 'snd-amplitude-curve-discontinuity-app',
  template: `
    <snd-xy-curve
      [height]="100"
      [values]="valuesLeft">
    </snd-xy-curve>
    <snd-xy-curve
      [height]="33"
      [values]="valuesRight">
    </snd-xy-curve>
  `,
  styles: [`
    :host { display: flex; align-items: center; }
    snd-xy-curve { flex: 1 }
  `]
})
export class AmplitudeCurveDiscontinuityAppComponent {
  valuesLeft = Range(0, 10, 0.1)
    .map(x => ({x, y: Math.sin(x)}));
  valuesRight = Range(10, 20, 0.1)
    .map(x => ({x, y: Math.sin(x)}));
}