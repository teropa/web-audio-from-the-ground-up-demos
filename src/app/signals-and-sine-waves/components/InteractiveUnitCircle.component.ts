import { Component, Input, ViewChild } from '@angular/core';
import { UnitCircleComponent } from '../../common/components/UnitCircle.component';

@Component({
  selector: 'snd-interactive-unit-circle',
  template: `
    <snd-unit-circle #crc
      [size]=size
      [angle]=angle
      (mousemove)="onMousemove($event)"
      (touchmove)="onTouchmove($event)">
    </snd-unit-circle>
  `
})
export class InteractiveUnitCircleComponent {
  @Input() size: number;
  @ViewChild('crc') unitCircle: UnitCircleComponent;
  angle: number = Math.PI / 4;

  onMousemove(event: MouseEvent) {
    this.onMove(event.clientX, event.clientY);
  }

  onTouchmove(event: TouchEvent) {
    this.onMove(event.touches[0].clientX, event.touches[0].clientY);
    event.preventDefault();
  }

  private onMove(clientX: number, clientY: number) {
    const eventX = clientX - this.unitCircle.getCanvasLeft();
    const eventY = clientY - this.unitCircle.getCanvasTop();
    const deltaX = eventX - this.size / 2;
    const deltaY = eventY - this.size / 2;
    this.angle = -Math.atan2(deltaY, deltaX);
    if (this.angle < 0) {
      this.angle = Math.PI * 2 + this.angle;
    } 
  }
  
}