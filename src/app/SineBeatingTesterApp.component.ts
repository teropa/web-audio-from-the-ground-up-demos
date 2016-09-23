import { Component, ElementRef } from '@angular/core';
import { SineAdditionComponent } from './components/SineAddition.component';
import { AudioService } from './audio.service';

@Component({
  selector: 'snd-sine-beating-tester-app',
  template: `
    <snd-sine-addition [curveSize]=curveSize
                       [frequency1]=frequency1
                       [amplitude1]=amplitude1
                       [frequency2]=frequency2
                       [amplitude2]=amplitude2
                       [oppositePhase]=oppositePhase>
    </snd-sine-addition>
  `,
  directives: [SineAdditionComponent],
  providers: [AudioService]
})
export class SineBeatingTesterAppComponent {
  curveSize: number;
  frequency1 = 1;
  frequency2 = 1.1;
  amplitude1 = 0.5;
  amplitude2 = 0.5;
  oppositePhase = false;

  constructor(elRef: ElementRef) {
    const el: HTMLElement = elRef.nativeElement;
    this.curveSize = parseInt(el.getAttribute('size'), 10) / 3;
  }

}