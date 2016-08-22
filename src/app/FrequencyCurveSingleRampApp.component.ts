import { Component } from '@angular/core';
import { List } from 'immutable';
import { XYCurveComponent } from './components/XYCurve.component'; 
import { AudioService } from './audio.service.ts';

@Component({
  selector: 'snd-frequency-curve-single-ramp-app',
  template: `
    <snd-xy-curve
      [height]="100"
      [values]="values">
    </snd-xy-curve>
  `,
  styles: [`
    :host { display: block; }
    snd-xy-curve { display: block; }
  `],
  directives: [
    XYCurveComponent
  ]
})
export class FrequencyCurveSingleRampApp {
  values = List.of(
    {x: 0, y: 440},
    {x: 1, y: 440 * Math.pow(2, 1/12)},
    {x: 3, y: 440 * Math.pow(2, 1/12)}
  );
}