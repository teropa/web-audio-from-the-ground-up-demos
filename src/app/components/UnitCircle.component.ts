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
    <div class="numbers" [style.height.px]="numbersHeight">
      <span *ngIf="includeDegNumbers">sin({{ getAngleDeg() }}°) =</span>
      sin({{ getAngleRad() }}rad) ≈
      <span class="sin">{{ getAngleSin() }}</span>
    </div>
    <canvas #cnvs
      [width]="size"
      [height]="size"
      [style.width.px]="size"
      [style.height.px]="size">
    </canvas>
  `,
  styles: [`
    .numbers {
      text-align: center;
      font-size: 0.7em;
      font-style: italic;
    }
    .sin {
      color: #ED146F;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitCircleComponent implements AfterViewInit, OnChanges {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  @Input() size: number;
  @Input() sizeMultiplier: number = 1;
  @Input() numbersHeight = 20;
  @Input() angle: number = 0;
  @Input() connectHorizontal = false;
  @Input() includeDegNumbers = true;

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
    if (this.sizeMultiplier > 0) {
      const centerX = Math.floor(this.size * this.sizeMultiplier / 2);
      const centerY = Math.floor(this.size / 2);
      const radius = this.size * this.sizeMultiplier / 2 - 1;

      const lineEndX = centerX + radius * Math.cos(-this.angle);
      const lineEndY = centerY + radius * Math.sin(-this.angle);

      this.drawCircle(centerX, centerY, radius);
      this.drawLine(centerX, centerY, lineEndX, lineEndY);
      this.drawAngleMarker(centerX, centerY, radius);
      this.drawAxisMarkers(centerX, centerY, radius);
      this.drawSinMarker(centerY, lineEndX, lineEndY);
    }
  }

  private drawCircle(centerX: number, centerY: number, radius: number) {
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.context.stroke();
  }

  private drawLine(centerX: number, centerY: number, lineEndX: number, lineEndY: number) {
    this.context.moveTo(centerX, centerY);
    this.context.lineTo(lineEndX, lineEndY);
    this.context.stroke();
  }
  
  private drawAngleMarker(centerX: number, centerY: number, radius: number) {
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius / 10, 0, Math.PI * 2 - this.angle, true);
    this.context.stroke();
  }

  private drawSinMarker(centerY: number, lineEndX: number, lineEndY: number) {
    this.context.save();
    this.context.strokeStyle = '#ED146F';
    this.context.beginPath();
    this.context.moveTo(lineEndX, lineEndY);
    if (this.connectHorizontal) {
      this.context.setLineDash([1, 4]);
      this.context.lineTo(0, lineEndY);
    } else {
      this.context.lineTo(lineEndX, centerY);
    }
    this.context.stroke();
    this.context.restore();
  }

  private drawAxisMarkers(centerX: number, centerY: number, radius: number) {
    this.context.beginPath();
    this.context.moveTo(centerX, centerY);
    this.context.lineTo(centerX + radius, centerY);
    this.context.stroke();
    
    this.context.save();
    this.context.setLineDash([2, 2]);
    this.context.strokeStyle = '#888';
    this.context.beginPath();
    this.context.moveTo(centerX, centerY);
    this.context.lineTo(centerX - radius, centerY);
    this.context.stroke();
    this.context.restore();
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