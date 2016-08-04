import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { List } from 'immutable';
import { UnitCircleComponent } from './UnitCircle.component';
import { CurveComponent } from './Curve.component';
import { AudioService } from '../audio.service';

@Component({
  selector: 'snd-sine-animation',
  template: `
    <snd-curve
      [width]="size * 4"
      [height]="size"
      [values]="collectedSines"
      [maxValueCount]="maxCurveValueCount"
      [style.marginTop.px]="numbersHeight">
    </snd-curve>
    <snd-unit-circle
      [size]=size
      [numbersHeight]=numbersHeight
      [angle]=angle
      [connectHorizontal]=true
      [includeDegNumbers]=false>
    </snd-unit-circle>
  `,
  styles: [`
    :host {
      display: flex;
    }
  `],
  directives: [UnitCircleComponent, CurveComponent]
})
export class SineAnimationComponent implements OnInit, OnDestroy {
  @Input() size: number;
  @Input() frequency: number;
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

  private runNext(lastTime = this.audio.getCurrentTime()) {
    const step = Math.PI / 100;
    if (this.running) {
      let t = lastTime + step;
      while (t < this.audio.getCurrentTime()) {
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
        .push(Math.sin(this.angle));
    } else {
      this.collectedSines = this.collectedSines.push(Math.sin(this.angle));
    }
  }

}