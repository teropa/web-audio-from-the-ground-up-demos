import { Component, Input } from '@angular/core';
import { List } from 'immutable';
import { CurveComponent } from './Curve.component';
import { SineAnimationComponent } from './SineAnimation.component';

@Component({
  selector: 'snd-sine-addition',
  template: `
    <snd-sine-animation [size]=curveSize
                        [frequency]=frequency1
                        [amplitude]=amplitude1
                        [includeNumbers]=false
                        (curveChange)="onFirstCurveChange($event)">
    </snd-sine-animation>
    <snd-sine-animation [size]=curveSize
                        [frequency]=frequency2
                        [amplitude]=amplitude2
                        [phaseOffset]=getPhaseOffset2()
                        [includeNumbers]=false
                        (curveChange)="onSecondCurveChange($event)">
    </snd-sine-animation>
    <snd-curve
      [height]="curveSize"
      [values]="combinedCurve"
      [maxValueCount]="250"
      [drawAxis]=true
      [style.marginTop.px]="20"
      [style.marginRight.px]="curveSize">
    </snd-curve>
  `,
  styles: [`
    :host, snd-curve {
      display: block;
    }
  `],
  directives: [SineAnimationComponent, CurveComponent]
})
export class SineAdditionComponent {
  @Input() curveSize: number;
  @Input() frequency1: number;
  @Input() frequency2: number;
  @Input() amplitude1: number;
  @Input() amplitude2: number;
  @Input() oppositePhase: boolean;

  firstCurve: List<number> = <List<number>>List();
  secondCurve: List<number> = <List<number>>List();
  combinedCurve: List<number> = <List<number>>List();

  getPhaseOffset2() {
    if (this.oppositePhase) {
      return Math.PI;
    } else {
      return 0;
    }
  }
  onFirstCurveChange(newCurve: List<number>) {
    this.firstCurve = newCurve;
    this.calculateCombinedCurve();
  }

  onSecondCurveChange(newCurve: List<number>) {
    this.secondCurve = newCurve;
    this.calculateCombinedCurve();
  }

  calculateCombinedCurve() {
    this.combinedCurve = <List<number>>this.firstCurve
      .map((val, idx) => val + this.secondCurve.get(idx, 0));
  }

}