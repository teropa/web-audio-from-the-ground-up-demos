import { Component, ElementRef } from '@angular/core';
import { FreqControlledSineAnimationComponent } from './components/FreqControlledSineAnimation.component';
import { AudioService } from './audio.service';

@Component({
  selector: 'snd-controlled-sine-animation-app',
  template: `
    <snd-freq-controlled-sine-animation [size]=size>
    </snd-freq-controlled-sine-animation>
  `,
  directives: [FreqControlledSineAnimationComponent],
  providers: [AudioService]
})
export class ControlledSineAnimationAppComponent {
  size: number;

  constructor(elRef: ElementRef) {
    const el: HTMLElement = elRef.nativeElement;
    this.size = parseInt(el.getAttribute('size'), 10);
  }

}