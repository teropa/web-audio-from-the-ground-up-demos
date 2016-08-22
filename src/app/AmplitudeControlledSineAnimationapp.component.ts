import { Component, ElementRef } from '@angular/core';
import { AmplitudeControlledSineAnimationComponent } from './components/AmplitudeControlledSineAnimation.component';
import { AudioService } from './audio.service';

@Component({
  selector: 'snd-amplitude-controlled-sine-animation-app',
  template: `
    <snd-amplitude-controlled-sine-animation [size]=size>
    </snd-amplitude-controlled-sine-animation>
  `,
  directives: [AmplitudeControlledSineAnimationComponent],
  providers: [AudioService]
})
export class AmplitudeControlledSineAnimationAppComponent {
  size: number;

  constructor(elRef: ElementRef) {
    const el: HTMLElement = elRef.nativeElement;
    this.size = parseInt(el.getAttribute('size'), 10);
  }

}