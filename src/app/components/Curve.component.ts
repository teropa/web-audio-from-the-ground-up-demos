import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges
} from '@angular/core';
import { List } from 'immutable';

@Component({
  selector: 'snd-curve',
  template: `
    <canvas #cnvs
      [width]="width"
      [height]="height"
      [style.width.px]="width"
      [style.height.px]="height">
    </canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurveComponent implements AfterViewInit, OnChanges {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  @Input() width: number;
  @Input() height: number;
  @Input() values: List<number>;
  @Input() maxValueCount: number;
  @Input() rangeMin = -1;
  @Input() rangeMax = 1;

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
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.setLineDash([2, 2]);
    this.drawAxisMarker();
    this.context.restore();
    this.drawCurve();
  }

  private drawCurve() {
    const step = this.width / this.maxValueCount;
    const firstStep = (this.maxValueCount - this.values.size) * step;
    const extent = Math.abs(this.rangeMax - this.rangeMin);

    this.context.beginPath();
    this.context.moveTo(firstStep, this.height / 2);
    this.values.forEach((value, idx) => {
      const x = firstStep + idx * step;
      const valueExtent = value - this.rangeMin;
      const valueRel = valueExtent / extent;
      const y = this.height - 1 - valueRel * (this.height - 2);
      this.context.lineTo(x, y);
    });
    this.context.stroke();
  }

  private drawAxisMarker() {
    this.context.beginPath();
    this.context.moveTo(0, this.getCenterY());
    this.context.lineTo(this.width, this.getCenterY());
    this.context.stroke();
  }

  private getCenterY() {
    return this.height / 2;
  }
  

}