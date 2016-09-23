import { Component, EventEmitter, Input, HostBinding, OnInit, OnDestroy, Output } from '@angular/core';
import { List } from 'immutable';
import { UnitCircleComponent } from './UnitCircle.component';
import { CurveComponent } from './Curve.component';
import { AudioService } from '../audio.service';

@Component({
  selector: 'snd-sine-animation',
  template: `
    <snd-curve
      [height]="size"
      [values]="collectedSines"
      [maxValueCount]="maxCurveValueCount"
      [drawAxis]=true
      [style.marginTop.px]="getNumbersHeight()"
      [style.right.px]="size">
    </snd-curve>
    <snd-unit-circle
      [size]=size
      [sizeMultiplier]=amplitude
      [numbersHeight]=getNumbersHeight()
      [angle]=angle
      [connectHorizontal]=true
      [includeNumbers]=includeNumbers
      [includeDegNumbers]=false
      [style.width.px]="size">
    </snd-unit-circle>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
    snd-curve {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
    snd-unit-circle {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  `],
  directives: [UnitCircleComponent, CurveComponent]
})
export class SineAnimationComponent implements OnInit, OnDestroy {
  @Input()
  size: number;

  @Input()
  frequency: number;

  @Input()
  amplitude = 1;

  @Input()
  phaseOffset = 0;

  @Input()
  includeNumbers = true;

  @Output()
  curveChange = new EventEmitter<List<number>>();

  angle: number = 0;
  collectedSines: List<number> = <List<number>>List.of();
  maxCurveValueCount = 250;
  numbersHeight = 20;

  running = false;

  constructor(private audio: AudioService) {
  }

  ngOnInit() {
    this.running = true;
    this.angle += this.phaseOffset;
    this.runNext();
  }

  ngOnDestroy() {
    this.running = false;
  }

  @HostBinding('style.height.px')
  get fullHeight() {
    return this.size + this.getNumbersHeight();
  }

  getNumbersHeight() {
    return this.includeNumbers ? this.numbersHeight : 0;
  }
  
  private runNext(lastTime = this.getCurrentTime()) {
    const step = Math.PI / 100;
    if (this.running) {
      let t = lastTime + step;
      while (t < this.getCurrentTime()) {
        this.emitStep(step);
        t += step;
      }
      requestAnimationFrame(() => this.runNext(t - step)); 
    }
  }

  private emitStep(elapsedTime: number) {
    const radiansPerSecond = this.frequency * 2 * Math.PI;
    const radianIncrement = radiansPerSecond * elapsedTime;
    this.angle += radianIncrement;
    if (this.angle >= Math.PI * 2) {
      this.angle -= Math.PI * 2;
    }
    if (this.collectedSines.size >= this.maxCurveValueCount) {
      this.collectedSines = this.collectedSines
        .shift()
        .push(Math.sin(this.angle) * this.amplitude);
    } else {
      this.collectedSines = this.collectedSines.push(Math.sin(this.angle) * this.amplitude);
    }
    this.curveChange.next(this.collectedSines);
  }

  private getCurrentTime() {
    return Date.now() / 1000;
  }

}