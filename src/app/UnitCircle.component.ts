import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'snd-unit-circle',
  template: `
    <canvas #cnvs
      [width]="width"
      [height]="height"
      [style.width.px]="width"
      [style.height.px]="height"
      (mousemove)="onMousemove($event)">
    </canvas>
    <div>sin({{ getAngleDeg() }}) = {{ getAngleSin() }}</div>
  `
})
export class UnitCircleComponent implements AfterViewInit {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private angle: number = 0;
  
  @ViewChild('cnvs')
  set canvasRef(ref: ElementRef) {
    this.canvas = ref.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  ngAfterViewInit() {
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#fff';
    this.draw();
  }

  onMousemove(event: MouseEvent) {
    const canvasLeft = this.canvas.getBoundingClientRect().left;
    const canvasTop = this.canvas.getBoundingClientRect().top;
    const eventX = event.clientX - canvasLeft;
    const eventY = event.clientY - canvasTop;
    const deltaX = eventX - this.centerX;
    const deltaY = eventY - this.centerY;
    this.angle = -Math.atan2(deltaY, deltaX);
    if (this.angle < 0) {
      this.angle = Math.PI * 2 + this.angle;
    } 
    this.draw();
  }

  private draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    const lineEndX = this.centerX + this.radius * Math.cos(-this.angle);
    const lineEndY = this.centerY + this.radius * Math.sin(-this.angle);

    this.drawCircle();
    this.drawLine(lineEndX, lineEndY);
    this.drawAngleMarker();

    this.context.save();
    this.context.setLineDash([2, 2]);
    this.drawAxisMarker();
    this.drawSinMarker(lineEndX, lineEndY);
    this.context.restore();
  }

  private drawCircle() {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    this.context.stroke();
  }

  private drawLine(lineEndX: number, lineEndY: number) {
    this.context.moveTo(this.centerX, this.centerY);
    this.context.lineTo(lineEndX, lineEndY);
    this.context.stroke();
  }
  
  private drawAngleMarker() {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, this.radius / 10, 0, Math.PI * 2 - this.angle, true);
    this.context.stroke();
  }

  private drawSinMarker(lineEndX: number, lineEndY: number) {
    this.context.beginPath();
    this.context.moveTo(lineEndX, lineEndY);
    this.context.lineTo(lineEndX, this.centerY);
    this.context.stroke();
  }

  private drawAxisMarker() {
    this.context.beginPath();
    this.context.moveTo(this.centerX - this.radius, this.centerY);
    this.context.lineTo(this.centerX + this.radius, this.centerY);
    this.context.stroke();
  }

  get width() {
    return 200;
  }

  get height() {
    return 200;
  }
  
  get centerX() {
    return Math.floor(this.width / 2);
  }

  get centerY() {
    return Math.floor(this.height / 2);
  }

  get radius() {
    return Math.min(this.width / 2, this.height / 2) - 1;
  }

  getAngleDeg() {
    return Math.round(this.angle * 180 / Math.PI);
  }

  getAngleSin() {
    return Math.sin(this.angle)
  }

}