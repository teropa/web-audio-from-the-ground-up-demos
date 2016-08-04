import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  HostListener
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
  @Input() height: number;
  @Input() values: List<number>;
  @Input() maxValueCount: number;
  @Input() rangeMin = -1;
  @Input() rangeMax = 1;
  width: number;

  constructor(private elRef: ElementRef) {
  }

  @ViewChild('cnvs')
  set canvasRef(ref: ElementRef) {
    this.canvas = ref.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  ngAfterViewInit() {
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#000';
    this.width = this.elRef.nativeElement.offsetWidth;
    this.draw();
  }

  ngOnChanges() {
    this.draw();
  }

  @HostListener('window:resize')
  onResize() {
    this.width = this.elRef.nativeElement.offsetWidth;
  }

  private draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawAxisMarker();
    this.drawCurve();
  }

  private drawCurve() {
    const step = this.width / this.maxValueCount;
    const firstStep = (this.maxValueCount - this.values.size) * step;
    const extent = Math.abs(this.rangeMax - this.rangeMin);

    this.context.beginPath();
    this.values.forEach((value, idx) => {
      const x = firstStep + idx * step;
      const valueExtent = value - this.rangeMin;
      const valueRel = valueExtent / extent;
      const y = this.height - 1 - valueRel * (this.height - 2);
      if (idx === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
    });
    this.context.stroke();
  }

  private drawAxisMarker() {
    this.context.save();
    this.context.setLineDash([2, 2]);
    this.context.strokeStyle = '#888';
    this.context.beginPath();
    this.context.moveTo(0, this.getCenterY());
    this.context.lineTo(this.width, this.getCenterY());
    this.context.stroke();
    this.context.restore();
  }


  private getCenterY() {
    return this.height / 2;
  }
  

}