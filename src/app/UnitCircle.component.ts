import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
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
    <div>sin({{ getAngleDeg() }}) = {{ getAngleSin() }}</div>
  `
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

  ngAfterViewInit() {
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#fff';
    this.draw();
  }

  ngOnChanges() {
    this.draw();
  }

  private draw() {
    this.context.clearRect(0, 0, this.size, this.size);

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

  get centerX() {
    return Math.floor(this.size / 2);
  }

  get centerY() {
    return Math.floor(this.size / 2);
  }

  get radius() {
    return Math.min(this.size / 2, this.size / 2) - 1;
  }

  get canvasLeft() {
    return this.canvas.getBoundingClientRect().left;
  }

  get canvasTop() {
    return this.canvas.getBoundingClientRect().top;
  }

  getAngleDeg() {
    return Math.round(this.angle * 180 / Math.PI);
  }

  getAngleSin() {
    return numeral(Math.sin(this.angle)).format('#.00')
  }

}