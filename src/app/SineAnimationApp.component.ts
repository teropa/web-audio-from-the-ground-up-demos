import { Component, ElementRef } from '@angular/core';
import { SineAnimationComponent } from './components/SineAnimation.component';
import { AudioService } from './audio.service';

@Component({
  selector: 'snd-sine-animation-app',
  template: `
    <snd-sine-animation [size]=size [frequency]=frequency>
    </snd-sine-animation>
  `,
  directives: [SineAnimationComponent],
  providers: [AudioService]
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