import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'snd-sine-animation-app',
  template: `
    <snd-sine-animation [size]=size [frequency]=frequency>
    </snd-sine-animation>
  `
})
export class SineAnimationAppComponent {
  size: number;
  frequency: number;

  constructor(elRef: ElementRef) {
    const el: HTMLElement = elRef.nativeElement;
    this.size = parseInt(el.getAttribute('size'), 10);
    this.frequency = parseFloat(el.getAttribute('frequency'));
  }

}