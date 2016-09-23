import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'snd-amplitude-controlled-sine-animation-app',
  template: `
    <snd-amplitude-controlled-sine-animation [size]=size>
    </snd-amplitude-controlled-sine-animation>
  `
})
export class AmplitudeControlledSineAnimationAppComponent {
  size: number;

  constructor(elRef: ElementRef) {
    const el: HTMLElement = elRef.nativeElement;
    this.size = parseInt(el.getAttribute('size'), 10);
  }

}