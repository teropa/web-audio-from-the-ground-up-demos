import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  HostListener
} from '@angular/core';
import { Seq } from 'immutable';

@Component({
  selector: 'snd-xy-curve',
  template: `
    <canvas #cnvs
      [height]="height"
      [style.height.px]="height">
    </canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XYCurveComponent implements AfterViewInit, OnChanges {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  @Input() height: number;
  @Input() values: Seq<number, {x: number, y: number}>;
  width: number = 0;

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
    this.onResize();
  }

  ngOnChanges() {
    this.draw();
  }

  @HostListener('window:resize')
  onResize() {
    this.width = this.elRef.nativeElement.offsetWidth;
    this.canvas.width = this.width;
    this.canvas.style.width = `${this.width}px`;
    this.draw();
  }

  private draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawCurve();
  }

  private drawCurve() {
    if (!this.width || !this.values) {
      return;
    }
    const step = this.width / (this.values.size - 1);
    const firstStep = 0;
    
    const xSort = this.values.sortBy(v => v.x);
    const ySort = this.values.sortBy(v => v.y);

    const minX = xSort.first().x;
    const minY = ySort.first().y;

    const xRange = xSort.last().x - minX;
    const yRange = ySort.last().y - minY;

    this.context.beginPath();
    this.values.forEach((value, idx) => {
      const x = ((value.x - minX) / xRange) * this.width;
      const y = this.height - ((value.y - minY) / yRange) * this.height;
      if (idx === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
    });
    this.context.stroke();
  }


}