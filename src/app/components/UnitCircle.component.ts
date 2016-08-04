import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges
} from '@angular/core';
import * as numeral from 'numeral';

@Component({
  selector: 'snd-unit-circle',
  template: `
    <canvas #cnvs
      [width]="size"
      [height]="size"
      [style.width.px]="size"
      [style.height.px]="size">
    </canvas>
    <div>sin({{ getAngleRad() }}rad) = sin({{ getAngleDeg() }}°) = {{ getAngleSin() }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitCircleComponent implements AfterViewInit, OnChanges {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  @Input() size: number;
  @Input() angle: number = 0;
  
  @ViewChild('cnvs')
  set canvasRef(ref: ElementRef) {
    this.canvas = ref.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  getCanvasLeft() {
    return this.canvas && this.canvas.getBoundingClientRect().left;
  }

  getCanvasTop() {
    return this.canvas && this.canvas.getBoundingClientRect().top;
  }

  ngAfterViewInit() {
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#000';
    this.draw();
  }

  ngOnChanges() {
    this.draw();
  }

  private draw() {
    this.context.clearRect(0, 0, this.size, this.size);

    const center = Math.floor(this.size / 2);
    const radius = this.size / 2 - 1;

    const lineEndX = center + radius * Math.cos(-this.angle);
    const lineEndY = center + radius * Math.sin(-this.angle);

    this.drawCircle(center, radius);
    this.drawLine(center, lineEndX, lineEndY);
    this.drawAngleMarker(center, radius);

    this.context.save();
    this.context.setLineDash([2, 2]);
    this.drawAxisMarker(center, radius);
    this.drawSinMarker(center, lineEndX, lineEndY);
    this.context.restore();
  }

  private drawCircle(center: number, radius: number) {
    this.context.beginPath();
    this.context.arc(center, center, radius, 0, Math.PI * 2);
    this.context.stroke();
  }

  private drawLine(center: number, lineEndX: number, lineEndY: number) {
    this.context.moveTo(center, center);
    this.context.lineTo(lineEndX, lineEndY);
    this.context.stroke();
  }
  
  private drawAngleMarker(center: number, radius: number) {
    this.context.beginPath();
    this.context.arc(center, center, radius / 10, 0, Math.PI * 2 - this.angle, true);
    this.context.stroke();
  }

  private drawSinMarker(center: number, lineEndX: number, lineEndY: number) {
    this.context.beginPath();
    this.context.moveTo(lineEndX, lineEndY);
    this.context.lineTo(lineEndX, center);
    this.context.stroke();
  }

  private drawAxisMarker(center: number, radius: number) {
    this.context.beginPath();
    this.context.moveTo(center - radius, center);
    this.context.lineTo(center + radius, center);
    this.context.stroke();
  }

  private getAngleDeg() {
    return Math.round(this.angle * 180 / Math.PI);
  }

  private getAngleRad() {
    return numeral(this.angle).format('#.0')
  }
  private getAngleSin() {
    return numeral(Math.sin(this.angle)).format('#.00')
  }


}