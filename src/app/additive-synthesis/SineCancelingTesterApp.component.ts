import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'snd-sine-canceling-tester-app',
  template: `
    <snd-sine-addition [curveSize]=curveSize
                       [frequency1]=frequency1
                       [amplitude1]=amplitude1
                       [frequency2]=frequency2
                       [amplitude2]=amplitude2
                       [oppositePhase]=oppositePhase>
    </snd-sine-addition>
  `
})
export class SineCancelingTesterAppComponent {
  curveSize: number;
  frequency1 = 1;
  frequency2 = 1;
  amplitude1 = 1;
  amplitude2 = 1;
  oppositePhase = true;

  constructor(elRef: ElementRef) {
    const el: HTMLElement = elRef.nativeElement;
    this.curveSize = parseInt(el.getAttribute('size'), 10) / 3;
  }

}