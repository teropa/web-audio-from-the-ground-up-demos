import { Component, Input, ViewChild } from '@angular/core';
import { UnitCircleComponent } from './UnitCircle.component';

@Component({
  selector: 'snd-interactive-unit-circle',
  template: `
    <snd-unit-circle #crc
      [size]=size
      [angle]=angle
      (mousemove)="onMousemove($event)">
    </snd-unit-circle>
  `,
  directives: [UnitCircleComponent]
})
export class InteractiveUnitCircleComponent {
  @Input() size: number;
  @ViewChild('crc') unitCircle: UnitCircleComponent;
  angle: number = 0;

  onMousemove(event: MouseEvent) {
    const eventX = event.clientX - this.unitCircle.getCanvasLeft();
    const eventY = event.clientY - this.unitCircle.getCanvasTop();
    const deltaX = eventX - this.size / 2;
    const deltaY = eventY - this.size / 2;
    this.angle = -Math.atan2(deltaY, deltaX);
    if (this.angle < 0) {
      this.angle = Math.PI * 2 + this.angle;
    } 
  }

}