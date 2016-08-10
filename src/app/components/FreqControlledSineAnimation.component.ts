import { Component, Input } from '@angular/core';
import { SineAnimationComponent } from './SineAnimation.component';

@Component({
  selector: 'snd-freq-controlled-sine-animation',
  template: `
    <label class="freq-control">
      <input type="range" [(ngModel)]="frequency" min="0" max="4" step="0.1">
      <span class="lbl">{{ frequency }} Hz</span>
    </label>
    <snd-sine-animation [size]=size [frequency]=frequency>
    </snd-sine-animation>
  `,
  styles: [`
    .freq-control {
      text-align: right;
    }
    .lbl {
      display: inline-block;
      min-width: 75px;
    }
  `],
  directives: [SineAnimationComponent]
})
export class FreqControlledSineAnimationComponent {
  @Input() size: number;
  frequency: number = 1;
}