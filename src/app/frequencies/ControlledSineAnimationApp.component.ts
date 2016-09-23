import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'snd-controlled-sine-animation-app',
  template: `
    <snd-freq-controlled-sine-animation [size]=size>
    </snd-freq-controlled-sine-animation>
  `
})
export class ControlledSineAnimationAppComponent {
  size: number;

  constructor(elRef: ElementRef) {
    const el: HTMLElement = elRef.nativeElement;
    this.size = parseInt(el.getAttribute('size'), 10);
  }

}