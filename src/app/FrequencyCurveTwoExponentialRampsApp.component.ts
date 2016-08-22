import { Component } from '@angular/core';
import { List, Range } from 'immutable';
import { XYCurveComponent } from './components/XYCurve.component'; 
import { AudioService } from './audio.service.ts';

@Component({
  selector: 'snd-frequency-curve-two-exponential-ramps-app',
  template: `
    <snd-xy-curve
      [height]="200"
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
export class FrequencyCurveTwoExponentialRampsApp {
  values = List.of(
    {x: 0, y: 440},
    {x: 1, y: 440}
  ).concat(this.getExponentialRamp(440, 440 * 2, 1, 2))
   .concat([{x: 3, y: 440 * 2}])
   .concat(this.getExponentialRamp(440 * 2, 440 * 2 * 2, 3, 4))
   .concat([{x: 5, y: 440 * 2 * 2}]);

  private getExponentialRamp(f1: number, f2: number, x1: number, x2: number) {
    return Range(x1, x2 + (x2 - x1) / 100, (x2 - x1) / 100)
      .map(x => {
        const y = f1 * Math.pow(f2 / f1, (x - x1) / (x2 - x1));
        return {x, y};
      });
  }

}