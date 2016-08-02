import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UnitCircleComponent } from './UnitCircle.component';

@Component({
  selector: 'snd-animated-unit-circle',
  template: `
    <snd-unit-circle
      [size]=size
      [angle]=angle>
    </snd-unit-circle>
  `,
  directives: [UnitCircleComponent]
})
export class AnimatedUnitCircleComponent implements OnInit, OnDestroy {
  @Input() size: number;
  angle: number = 0;
  running = false;

  ngOnInit() {
    this.running = true;
    this.runNext();
  }

  ngOnDestroy() {
    this.running = false;
  }

  private runNext() {
    if (this.running) {
      this.angle += 0.1;
      if (this.angle >= Math.PI * 2) {
        this.angle = 0;
      }
      requestAnimationFrame(() => this.runNext()); 
    }
  }

}