import { Component, Input, HostBinding, OnInit, OnDestroy } from '@angular/core';
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
      [style.marginTop.px]="numbersHeight"
      [style.right.px]="size">
    </snd-curve>
    <snd-unit-circle
      [size]=size
      [sizeMultiplier]=amplitude
      [numbersHeight]=numbersHeight
      [angle]=angle
      [connectHorizontal]=true
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

  angle: number = 0;
  collectedSines: List<number> = <List<number>>List.of();
  maxCurveValueCount = 250;
  numbersHeight = 20;

  running = false;

  constructor(private audio: AudioService) {
  }

  ngOnInit() {
    this.running = true;
    this.runNext();
  }

  ngOnDestroy() {
    this.running = false;
  }

  @HostBinding('style.height.px')
  get fullHeight() {
    return this.size + this.numbersHeight;
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
  }

  private getCurrentTime() {
    return Date.now() / 1000;
  }

}