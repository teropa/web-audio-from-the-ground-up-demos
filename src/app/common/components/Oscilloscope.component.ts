import { Component, Input, OnInit, OnDestroy, ViewChild, HostListener, ElementRef } from '@angular/core';

const MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

@Component({
  selector: 'snd-oscilloscope',
  template: `
    <canvas #cnvs
      [width]="width"
      [height]="height"
      [style.width.px]="width"
      [style.height.px]="height">
    </canvas>
  `,
  styles: [`
    :host { display: block; }
  `] 
})
export class OscilloscopeComponent implements OnInit, OnDestroy {
  @Input() analyser: AnalyserNode;
  @Input() height: number;
  width: number;
  private data: Uint8Array;
  private active: boolean;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(private elRef: ElementRef) { }

  @ViewChild('cnvs')
  set canvasRef(ref: ElementRef) {
    this.canvas = ref.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  ngOnInit() {
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
    this.active = true;
    this.onResize();
    this.draw();
  }

  ngOnDestroy() {
    this.active = false;
  }

  @HostListener('window:resize')
  onResize() {
    this.width = this.elRef.nativeElement.offsetWidth;
  }

  private draw() {
    if (!this.active) {
      return;
    }

	  let quarterHeight = this.height / 4;
	  let scaling = this.height / 256;

	  this.analyser.getByteTimeDomainData(this.data);
	  
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.width, this.height);

	  this.context.beginPath();
	  this.context.strokeStyle = '#ED146F';
	  this.context.moveTo(0, quarterHeight * 2);
	  this.context.lineTo(this.width, quarterHeight * 2);
	  this.context.stroke();

	  this.context.strokeStyle = 'black';
	  this.context.beginPath();

	  let zeroCross = this.findFirstPositiveZeroCrossing(this.data, this.width);

    let xMultiplier = this.width / this.data.length;

	  this.context.moveTo(0, (256 - this.data[zeroCross]) * scaling);
	  for (let i = zeroCross, j = 0 ; (j < this.width) && (i < this.data.length) ; i++, j += 2)
  		this.context.lineTo(j, (256 - this.data[i]) * scaling);
  	this.context.stroke();
    
    requestAnimationFrame(() => this.draw());
  }


  private findFirstPositiveZeroCrossing(buf: Uint8Array, buflen: number) {
    let i = 0;
    let lastZero = -1;
    let t: number;

    // advance until we're zero or negative
    while (i < buflen && (buf[i] > 128)) {
      i++;
    }

    if (i >= buflen) {
      return 0;
    }

    // advance until we're above MINVAL, keeping track of last zero.
    while (i < buflen && ((t = buf[i]) < MINVAL)) {
      if (t >= 128) {
        if (lastZero === -1) {
          lastZero = i;
        }
      } else {
        lastZero = -1;
      }
      i++;
    }

    // we may have jumped over MINVAL in one sample.
    if (lastZero === -1) {
      lastZero = i;
    }

    if (i === buflen) { // We didn't find any positive zero crossings
      return 0;
    }

    // The first sample might be a zero.  If so, return it.
    if (lastZero === 0) {
      return 0;
    }

    return lastZero;
  }
}