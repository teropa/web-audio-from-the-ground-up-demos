import { Component, Input } from '@angular/core';
import { SineAnimationComponent } from './SineAnimation.component';

@Component({
  selector: 'snd-freq-controlled-sine-animation',
  template: `
    <label class="freq-control">
      <input type="range" [(ngModel)]="frequency" min="0" max="4" step="0.1">
      {{ frequency }} Hz
    </label>
    <snd-sine-animation [size]=size [frequency]=frequency>
    </snd-sine-animation>
  `,
  styles: [`
    .freq-control {
      float: right;
    }
    snd-sine-animation {
      margin-top: 40px;
    }
  `],
  directives: [SineAnimationComponent]
})
export class FreqControlledSineAnimationComponent {
  @Input() size: number;
  frequency: number = 1;
}